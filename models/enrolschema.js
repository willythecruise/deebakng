const mongoose= require('mongoose')


var EnrolSchema= new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  
  },
  course:{
    type: String,
  },
createdAt: {
    type: Date,
    default: Date.now
  
  },

  reference:{
    type:String,
    required:true
  },
  amount:{
    type: String
  },
  status:{
    type: Boolean,
    default: false
  }

})

// class Enrol extends Model {}
// Enrol.init({
//   course: DataTypes.STRING,
//   reference: DataTypes.STRING,
//   amount: DataTypes.STRING,
// }, { sequelize, modelName: 'user' });

// const User= require('./userschema')

// const { DataTypes } = require('sequelize');
// const sequelize = require('./sequelize'); // Include your Sequelize instance here

// const Enrol = sequelize.define('Enrol', {
//   course: {
//     type: DataTypes.STRING,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   reference: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   amount: {
//     type: DataTypes.STRING,
//   },
//   status: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//   },
// });

// Define the association to the User model
// Enrol.belongsTo(User, {
//   foreignKey: 'userId', // Change 'userId' to the actual foreign key field name in your User model
//   targetKey: 'id',
// });
var Enrol= mongoose.model('Enrol', EnrolSchema)
module.exports = Enrol;



// var EnrolSchema= new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
  
//   },
//   course:{
//     type: String,
//   },
// createdAt: {
//     type: Date,
//     default: Date.now
  
//   },

//   reference:{
//     type:String,
//     required:true
//   },
//   amount:{
//     type: String
//   },
//   status:{
//     type: Boolean,
//     default: false
//   }

// })


// const Enrol=  mongoose.model('Enrol', EnrolSchema);
// module.exports= Enrol;