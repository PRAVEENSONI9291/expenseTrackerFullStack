const express= require('express');
const cors= require('cors');
const bp= require('body-parser');
const Sequelize= require('sequelize');


const sequelize= require('./util/database');
const user= require('./models/user');




const app= express();

app.use(cors());
app.use(bp.json());


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

