





module.exports ={
ensureAuthenticated : function(req,res,next){
    if(req.isAuthenticated()){
        return  next();
    }
    else{
        console.log('You need to be authenticated to view this resource');
        res.redirect('/users/login')
    }
},
authRole:function (req,res,next){

        if(req.user.role!= "admin"){
            res.status(401);
            res.send('ACCES DENIED FOR VIEW, NOT ALLOWED')

        }
       return next()
    

},

ensureGuest : function(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/dashboard') 
    }
    else{
        return next()
    }
},

}