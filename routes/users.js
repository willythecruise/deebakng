var express = require('express');
var router = express.Router();
exports.router = router;
const User = require('../models/userschema');
 const passport= require('passport');
 const {
  ensureAuthenticated, ensureGuest
} = require('../config/auth');



const {
  body,
  validationResult
} = require('express-validator');

/* GET users listing. */
router.get('/login', ensureGuest, function(req, res, next) {
  res.render('login');
});




router.post('/login',(req,res,next)=>{
      passport.authenticate('local',{
      successRedirect: '/dashboard',
      failureRedirect:'/users/login',
      failureFlash:true



})(req,res,next);


});


/* GET users listing. */
router.get('/register',ensureGuest, function(req, res, next) {
  res.render('register');
});

 
router.post('/register',ensureGuest, body('username').isAlpha(),
  // password must be at least 5 chars long
  body('password').isLength({
    min: 5
  }), async (req, res, next) => {

    const {
      username,
      password,
      password2
    } = req.body;
    let errors = []

    if (password != password2) {
      errors.push({
        msg: "Passwords do not match"
      });
    }

    if (errors.length > 0) {
      res.render('register', {
        errors:errors,
        username,
        password
      });

    } else {

      
   const registered = await User.findOne({
    
      username: req.body.username,
    
  });
        console.log(registered)
    if (registered === null) {
       const newUser = new User({
              username,
              password

            });
  //       const newUser = await User.create({
  //   username: username,
  //   password: password,
  // });
            newUser.save()
            
                        req.flash('success_msg','Success! You are now registered and can login')
            newUser.save().then(user => {


              res.redirect('/users/login');
              console.log(user);

            })

    } else {
       
            errors.push({
              msg: 'Username is already registered'
            });
            res.render('register', {
              errors:errors
            });
          
      
    }
        
            
          }

    
    



    console.log(req.body);


  });

  router.get('/dashboard ',ensureAuthenticated, function(req, res, next) {
  res.render('dashboard',{req:req});
});


module.exports = router;
