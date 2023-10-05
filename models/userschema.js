// const sequelize= require('./sequelize')
// const { DataTypes } = require('sequelize');

// const User= sequelize.define('User',{
//   username: DataTypes.STRING,
//   password: DataTypes.STRING
// })
const mongoose= require('mongoose')


var UserSchema= new mongoose.Schema({

   username:String,
  password: String
  
})

var User= mongoose.model('User', UserSchema)
module.exports= User