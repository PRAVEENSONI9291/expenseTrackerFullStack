const express= require('express');
const cors= require('cors');
const bp= require('body-parser');


const sequelize= require('./util/database');



const app= express();

app.use(cors());
app.use(bp.json());


app.post('/signup', async (req,res)=>{

  console.log(req.body);
    res.send("posted successsfully")

})

sequelize.sync()

.then(()=>{
    app.listen(3000);

})
.catch(()=>{
    console.log("error in 30");
})

