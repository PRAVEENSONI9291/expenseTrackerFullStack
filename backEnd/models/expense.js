const Sequelize= require('sequelize');

const sequelize= require('../util/database');

const expense= sequelize.define('expense',
    {
       
        id:{
            type:Sequelize.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement: true

        },
        expenseAmount:{
            type:Sequelize.INTEGER,
            allowNull: false
            
        },
        description:{
            type:Sequelize.STRING,
            allowNull: false

        },
        category:{
            type:Sequelize.STRING,
            allowNull: false

        }
    }
);

module.exports= expense;