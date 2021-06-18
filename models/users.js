const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   username : {
       type:String,
       required:true,
       unique:true
   },
   password: {
       type:String,
       required:true
   },
   createdAt: {
       type:Date,
       required:true
   },
   id : {
       type:String,
       default:new Date().valueOf()
   },
   token : {
       type:String,
       required:true
   },

},{timestamps:false});

const User = mongoose.model('users',userSchema);
module.exports = User;