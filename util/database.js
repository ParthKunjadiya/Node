const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', 'Parth@123', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;