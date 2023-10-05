 const passport= require('passport');

const LocalStratregy= require('passport-local').Strategy;
const mongosse = require('mongoose');
const User = require("../models/userschema");



module.exports=  function(passport){
    passport.use(
        new LocalStratregy({usernameField:'username'},(username, password,done)=>{
            // Match user
          
          User.findOne({username:username})
            .then(user =>{
                if(!user){
                    return done(null, false,{message: 'That username is not registered'})
                }else{

                    if (user.password === password){
                     return done(null, user);
                    }else{
                        return done(null,false,{message: 'Password is incorrect'});
                    }
                }

   
            })
            .catch(err => console.log(err))
  // Replace with the correct path to your User model

            // User.findOne({ where: { username: username } })
            // .then(user => {
            //     if (!user) {
            //     return done(null, false, { message: 'That username is not registered' });
            //     } else {
            //     if (user.password === password) {
            //         return done(null, user);
            //     } else {
            //         return done(null, false, { message: 'Password is incorrect' });
            //     }
            //     }
            // })
            // .catch(err => console.error(err));
             
        })
    ); 


    passport.serializeUser(function(user, done) {

    done(null, user.id);
  
});

passport.deserializeUser(function(id, done) {
User.findOne({  id: id  }).then (user =>{
  done(null, user);
})
   
});

}

