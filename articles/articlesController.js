const express = require('express');
const router = express.Router();

router.get('/admin/articles/new', (req,res)=>{
    res.render('admin/articles/new')
})

router.get('/', (req,res)=>{
    res.render('index')
})


module.exports = router;