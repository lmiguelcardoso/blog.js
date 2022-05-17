const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },body: {
        type: Sequelize.TEXT,
        allowNull:false
    }

})
Article.belongsTo(Category);// RElACIONAMENTO 1:P:1 UM ART PERTENCE A UMA CAT
Category.hasMany(Article);// RELACIONAMENTO 1:P:N UMA CAT PERTENCE N ART



module.exports = Article;