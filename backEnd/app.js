const express= require('express');
const cors= require('cors');
const bp= require('body-parser');
const Sequelize= require('sequelize');
const bcrypt= require('bcrypt');

const sequelize= require('./util/database');
const user= require('./models/user');




const app= express();

app.use(bp.json());
app.use(cors());



app.post('/signup', async (req,res)=>{

    const {name,email, password}= req.body;

    
    

    try {
    let resp= await user.findOne({where:{email:email}});
    if(resp)
    {
        console.log("user exists");
    
        
        res.send(false)
    }
    else{

        bcrypt.hash(password, 10, async(err,hash)=>{
            console.log(err);


        await user.create({name, email, password:hash});
        res.status(201).json({message:'successfully created new user'})
            
            
        })

    }
    

        // if(user.findOne({where:{email:req.body.email}})!=null)
        // {
        //     console.log('user already exists');
        // }
        // else{
        // await user.create(req.body);


        // }
   
        
    } catch (error) {
        console.log("error in app.js");
        res.status(500).json(error)
        
    }

});


app.use('/login', async (req,res)=>{
    console.log(req.body);
    

    try {

        let isUserAvailable= await user.findOne({where:{email:req.body.email}});

        
        

        if (isUserAvailable) {

            bcrypt.compare(req.body.password, isUserAvailable.password, (err, result)=>{

                if(err)
                {
                    console.log("error");
                    res.status(500).send("something went wrong");
                                    
                }
                if(result){
                res.status(200).json("user login successful");

                }
                else {
                    res.status(401).json("User not authorized");
                }

            } )
             
        } else {
            res.status(404).json("User not found");
        }

        
    } 
    catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    

})

sequelize.sync()

.then(()=>{
    app.listen(3000);
    console.log('kistening');
    

})
.catch(()=>{
    console.log("error in 30");
})

