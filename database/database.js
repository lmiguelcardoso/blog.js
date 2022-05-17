const Sequelize = require('sequelize');
const connection = new Sequelize('blogcrud','root','milol2013',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection