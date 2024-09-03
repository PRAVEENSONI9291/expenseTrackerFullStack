const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

const sequelize = require('./util/database');
const user = require('./models/user');
const expense = require('./models/expense');





const app = express();

app.use(bp.json());
app.use(cors());



app.post('/signup', async (req, res) => {

    const { name, email, password } = req.body;




    try {
        let resp = await user.findOne({ where: { email: email } });
        if (resp) {
            console.log("user exists");


            res.send(false)
        }
        else {

            bcrypt.hash(password, 10, async (err, hash) => {
                console.log(err);


                await user.create({ name, email, password: hash });
                res.status(201).json({ message: 'successfully created new user' })


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
        console.log("error in app.js", error);
        res.status(500).json(error)

    }

});


app.use('/login', async (req, res) => {
    // console.log(req.body);


    try {

        function jwtCreateToken(userId){
           return  jwt.sign({id:userId}, 'helloworld');
        }

        let isUserAvailable = await user.findOne({ where: { email: req.body.email } });
        // console.log(isUserAvailable.id);
        




        if (isUserAvailable) {

            bcrypt.compare(req.body.password, isUserAvailable.password, (err, result) => {

                if (err) {
                    console.log("error");
                    res.status(500).send("something went wrong");

                }
                if (result) {
                    const token = jwtCreateToken(isUserAvailable.id);
                    res.status(200).json({message:"login successfull", token:token});

                }
                else {
                    res.status(401).json("User not authorized");
                }

            })

        } else {
            res.status(404).json("User not found");
        }


    }
    catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ error: "Internal server error" });
    }


})




app.delete('/expense', async (req, res) => {




    try {
        let ele = req.query.id.split('-');
        let idToDelete = ele[1];
        console.log(idToDelete);
        // let resp = await expense.findOne({ where: { id: idToDelete } });
        // console.log(resp);


        await expense.destroy({where:{id:idToDelete}});
        res.status(201).json({ message: "expense deleted" });
    } catch (error) {
        res.status(500).json("something is very wrong while deleting");

    }




})


app.get('/expense', async (req, res) => {

    let token = jwt.verify(req.headers.authorization, 'helloworld');
    // console.log('tojen is:', token);
    req.user= token.id;
    // console.log(req.body);
    // console.log(req.user);
    
    
    

    try {
        let expenses = await expense.findAll({where:{userId:token.id}});

        res.status(200).json(expenses);
        

    } catch (error) {
        res.status(500).json("something wrong", error)


    }
});

app.post('/expense', async (req, res) => {
    // console.log('user is',req.body);
    let token = jwt.verify(req.body.token, 'helloworld');

    if (token)
    {
        // console.log(token);
        let {expenseAmount, description, category}= req.body;

        let userId= token.id;
        
        try {
            await expense.create({expenseAmount:expenseAmount, description:description, category:category, userId:userId});
            res.status(200).json({ message: "expense posted successfully" });
    
        } catch (error) {
            res.status(500).json("something wrong", error);
    
        }
    }



    

  



});


user.hasMany(expense);
expense.belongsTo(user);


sequelize.sync()

    .then(() => {
        app.listen(3000);
        console.log('kistening');


    })
    .catch(() => {
        console.log("error in 30");
    })

