const mongoose = require('mongoose')

// const { DataTypes } = require('sequelize');
// const sequelize = require('./sequelize'); 




var CourseSchema= new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },

})

var Course = mongoose.model('Course', CourseSchema)
module.exports= Course;