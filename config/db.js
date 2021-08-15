const { Sequelize } = require('sequelize');
/*const sequelize = new Sequelize('shopping', 'root', 'root', {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql'
});*/

const sequelize = new Sequelize('shopping', 'root', '1234', {
    host: 'shopping_mysql',
    port: 3306,
    dialect: 'mysql'
});


module.exports = sequelize

