const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database')

const categoriesController = require('./categories/categoriesController.js')
const articlesController = require('./articles/articlesController.js')

const Article = require('./articles/Articles')
const Category = require('./categories/Category')

//DATABASE
connection.authenticate().then(()=>console.log('Sucess')).catch((error)=>console.log(error))
//VIEW ENGINE
app.set('view engine','ejs')
//BODY PARSER - FORMS
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//STATIC FILES
app.use(express.static('public'))


//ROUTES
app.use("/",articlesController)
app.use("/",categoriesController)



app.listen(3000,()=>{
    console.log("server running on port 3000")
})