const express = require('express');
const router = express.Router();
const Category = require('../categories/Category')
const Article = require('./Articles')
const slugify = require('slugify');
const parse = require('nodemon/lib/cli/parse');
const adminAuth = require('../middlewares/adminAuth')


// POST ARTICLE VIEW
router.get('/admin/articles/new', adminAuth,(req,res)=>{
    Category.findAll().then((category)=>{
        res.render('admin/articles/new', {
            categories: category
        })
    })
    
})
// INDEX ARTICLES VIEW
router.get('/admin/articles',adminAuth,(req,res)=>{
    Article.findAll({
        include: [{model: Category}]
    }).then((articles)=>{
        res.render('./admin/articles/index',{
            articles: articles          
        })

    })
})
// POST ARTICLE ROUTE
router.post('/admin/articles/save',adminAuth, (req,res)=>{
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
// DELETE ARTICLE ROUTE
router.post('/admin/articles/delete',adminAuth,(req,res)=>{
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
// UPDATE ARTICLE VIEW
router.get('/admin/articles/:slug',adminAuth,(req,res)=>{
    let slug = req.params.slug
    Article.findOne({
        where:{
            slug: slug            
        },
        include: [{model: Category}]
    }).then(article=>{
        if(article){
            Category.findAll().then(categories=>{
                res.render('./admin/articles/edit',{article: article, categories: categories})
        })
        }else{
            res.redirect('/admin/articles')
        }
    })
})

// UPDATE ARTICLE ROUTE
router.post('/admin/articles/update',(req,res)=>{
    let title = req.body.title;
    let category = req.body.category;
    let body = req.body.body;
    let id = req.body.id;

    Article.update({
        title:title,
        slug: slugify(title),
        categoryId:category,
        body: body
        },
        {
        where:{
            id:id
            }
        }).then(res.redirect('/admin/articles'))
   
})

// PAGINATION
router.get('/articles/page/:num',(req,res)=>{
    let page = req.params.num;
    let offset = 0
    
    if(isNaN(page) || page == 1 || page ==0){
        offset = 0;
    }else{
        offset = (parseInt(page)-1) * 4;
    }

    Article.findAndCountAll({
        order:[['id', 'DESC']],
        limit:4,
        offset: offset
    }).then(articles=>{

        let next;
        if(offset +4 >= articles.count){
            next = false;
        }else{
            next = true;
        }

        let result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        Category.findAll().then(categories=>{
            res.render('admin/articles/page',{
                result: result,
                categories: categories
            })
        })

        
    })

})

module.exports = router;