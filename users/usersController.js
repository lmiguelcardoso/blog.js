const express = require('express');
const router = express.Router();
const User = require('./User')

router.get('/admin/user',(req,res)=>{
    
})

router.get('/admin/user/create',(req,res)=>{
    res.render('admin/users/create')

})

router.post('/user/create',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    res.json({email,password})
})
module.exports = router