const express = require('express');
const router = express.Router();
const User = require('./User')

// USERS LIST
router.get('/admin/user',(req,res)=>{
   res.send('listagem de users') 
})
// CREATE USER VIEW
router.get('/admin/user/create',(req,res)=>{
    res.render('admin/users/create')

})
// CREATE USER ROUTE
router.post('/user/create',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    res.json({email,password})
})
module.exports = router