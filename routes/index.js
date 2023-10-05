var express = require('express');
var router = express.Router();
var Enrol= require('../models/enrolschema')
var Course= require('../models/courseschema')
const {
  ensureAuthenticated
} = require('../config/auth');


const paypal = require('../config/paypal');
const { all } = require('axios');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


 router.get('/dashboard',ensureAuthenticated,async function (req,res) {

       const courses = await Enrol.find({
   user : req.user , // Assuming req.user contains the user's ID
  });
      const allcourse = await Course.find();

      //  var allcourse= JSON.stringify(allcourses)
      //  console.log(allcourse1)

       res.render('dashboard',{name:req.user.username,enroledcourses:courses,allcourses:allcourse,req:req})
 })

router.post('/makepayment',ensureAuthenticated, async function(req,res) {
  var amount=req.query.amount;
  var course= req.query.course;

   paypal.MakePayment(req, res, amount, course).then(function (value) {
  
    res.redirect(value.data.data.authorization_url)
  });
          
})

router.get('/enrol',ensureAuthenticated,async function (req,res) {
  var course= req.query.course.replace(/\s+/g,'')
  var price= req.query.price
  var errors=[]

  // var enroled= await Enrol.findOne({user:req.user,course:course})
  const enroled = await Enrol.findOne({
   
      user: req.user, // Assuming req.user contains the user's ID
      course: course, // Assuming 'course' contains the course you want to find
   
  });
  
  if (enroled) {
    errors.push('You have enroled in that course already!')
    res.redirect('/dashboard')
  }

else{
    res.render('makepayment',{course:course,price:price,req:req})

}
 
  
})



router.get('/paymentdone',ensureAuthenticated, function (req, res, next) {
  
  
  

  
  var reference = req.query.reference;
  var course=req.query.course

  user = req.user


  paypal.ConfirmPayment(req, res, reference).then(async function(value) {


    if (value.data.data.status === 'success') {
      amount= parseInt( value.data.data.amount);
       var newOrder = await Enrol.create({
    userId: user.id,
    reference: reference,
    course:course,
    amount:amount,

  })
    // newOrder.save()
    res.redirect('/dashboard')
    


    } else {
      console.log('Error')
    }


  })

})

router.get('/logout',ensureAuthenticated, (req, res) => {
    req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});



router.get('/about', function(req, res, next) {
  res.render('about',{req:req});
});

router.get('/contact', function(req, res, next) {
  res.render('contact',{req:req});
});
module.exports = router;

