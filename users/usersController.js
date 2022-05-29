const express = require('express');
const router = express.Router();
const User = require('./User')
const bcrypt = require('bcryptjs');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const adminAuth = require('../middlewares/adminAuth')




// USERS LIST
router.get('/admin/users',adminAuth,(req,res)=>{
    User.findAll().then(users=>{
        res.render('./admin/users/index',{
            users: users
        })
    })
   
})
// CREATE USER VIEW
router.get('/admin/users/create',adminAuth,(req,res)=>{
    res.render('admin/users/create')

})
// CREATE USER ROUTE
router.post('/user/create',adminAuth,(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where:{email:email}}).then(user=>{
        if(user == undefined){
            let salt = bcrypt.genSaltSync(10)
            let hash = bcryptjs.hashSync(password, salt)
        
            User.create({
                email: email,
                password: hash
            }).then(()=>{
                res.redirect('/')
            }).catch(()=> res.redirect('/'))
        }else{
            res.redirect('/admin/user/create')
        }
    })
   
})
// EDIT USER EMAIL
router.get('/admin/user/:id',adminAuth,(req,res)=>{
    let id = req.params.id;

    User.findByPk(id).then(user=>{
        if(user != undefined){
            res.render('./admin/users/edit',{user: user})
        }else{
            res.redirect('/admin/users')
        }
    })
})
// EDIT USER ROUTE
router.post('/user/edit',adminAuth,(req,res)=>{
    let email = req.body.email;
    let id = req.body.id;

    User.update({
        email:email
    },
    {
        where:{id:id}
    }).then(res.redirect('/admin/users'))


})
//LOGIN VIEW
router.get('/login',(req,res)=>{
    res.render('./admin/users/login')
})

//LOGIN ROUTE 
router.post('/authenticate',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where:{email:email}}).then(user=>{
        if(user != undefined){
            let correct = bcrypt.compareSync(password,user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles')
            }else{
                res.redirect('/login')
            }
        }else{
            res.redirect('/login')
        }
    })
})
//LOGOUT ROUTE
router.get('/logout',(req,res)=>{
    req.session.user = undefined;
    res.redirect('/')
})

module.exports = router