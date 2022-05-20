const Sequelize = require('sequelize');
const connection = require('../database/database');
const Article = require('../articles/Articles')

const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }

})



Article.belongsTo(Category);
Category.hasMany(Article);


module.exports = Category;