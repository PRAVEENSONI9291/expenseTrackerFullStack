const express= require('express');
const cors= require('cors');
const bp= require('body-parser');
const Sequelize= require('sequelize');


const sequelize= require('./util/database');
const user= require('./models/user');




const app= express();

app.use(bp.json());
app.use(cors());



app.post('/signup', async (req,res)=>{

    
    

    try {
    let resp= await user.findOne({where:{email:req.body.email}});
    if(resp)
    {
        console.log("user exists");
    
        
        res.send(false)
    }
    else{
        await user.create(req.body);

    }
    

        // if(user.findOne({where:{email:req.body.email}})!=null)
        // {
        //     console.log('user already exists');
        // }
        // else{
        // await user.create(req.body);


        // }
   

    res.send("posted successsfully")
        
    } catch (error) {
        console.log("error in app.js");
        
    }

});


app.use('/login', async (req,res)=>{
    console.log(req.body);
    

    try {

        let isUserAvailable= await user.findOne({where:{email:req.body.email}});

        
        

        if (isUserAvailable) {
            if (isUserAvailable.password === req.body.password) {
                res.status(200).json("user login successful");
            } else {
                res.status(401).json("User not authorized");
            }
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

