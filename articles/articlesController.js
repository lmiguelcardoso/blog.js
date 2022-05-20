const express = require('express');
const router = express.Router();
const Category = require('../categories/Category')
const Article = require('./Articles')
const slugify = require('slugify')

router.get('/admin/articles/new', (req,res)=>{
    Category.findAll().then((category)=>{
        res.render('admin/articles/new', {
            categories: category
        })
    })
    
})

router.get('/admin/articles', (req,res)=>{
    Article.findAll({
        include: [{model: Category}]
    }).then((articles)=>{
        res.render('./admin/articles/index',{
            articles: articles
            
        })

    })
})

router.post('/admin/articles/save',(req,res)=>{
    let title = req.body.title
    let category = req.body.category;
    let body = req.body.body
    
    if(title && body){
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: category
        }).then(res.redirect('/admin/articles'))
    }else{
        res.redirect('/admin/articles/')
    }
})

router.post('/admin/articles/delete',(req,res)=>{
    let id = req.body.id;
    if(id){
        if(!isNaN(id)){
        res.redirect('/admin/articles')
        }

        Article.destroy({
            where:{
                id: id
            }
        }).then(res.redirect('/admin/articles'))

    }else{
        res.redirect('/admin/articles')
    }
})


module.exports = router;