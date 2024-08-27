const Sequelize = require('sequelize');

const sequelize= new Sequelize('expensetrackerfs', 'root', 'Helloworld1*',{
    dialect:'mysql',
    host: 'localhost'
});

module.exports=sequelize;