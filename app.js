var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flash = require('connect-flash')
const session= require('express-session');
const mongoose= require('mongoose')

const passport = require('passport');
const MongoStore = require('connect-mongo');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const Session = require('./models/session');
// const sequelize= require('sequelize')

// require('dotenv').config()
// const sequelize = require('./models/sequelize'); 




// (async () => {
//   try {
//     await sequelize.sync(); // Synchronize the 'Session' model with the database
//     console.log('Session model synchronized with the database');
//   } catch (error) {
//     console.error('Error synchronizing the Session model:', error);
//   }
// })();


// Express session
var app = express();



require('./config/passport')(passport);

require('dotenv').config()
mongoose.connect(process.env.MONGO_URI).then(()=> console.log('mongodb connected'))





// Express session
app.use(session({
secret: 'my-Secret',
resave: true,
saveUninitialized: true,
store:  MongoStore.create({mongoUrl: process.env.MONGO_URI})

}));


app.use(flash());

app.use((req,res,next)=>{

  res.locals.success_msg= req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error')

  next();
})


// Initialize Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});












const port = process.env.PORT || 3000;



app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
  console.log(`Listening on http://localhost:${port}/`);
});




module.exports = app;
