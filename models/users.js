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
       default:new Date()
   },
   id : {
       type:String,
       default:new Date().valueOf()
   },
   token : {
       type:String,
       required:true
   },
   avatar : {
       type:String,
       default:"doge.png"
   },
   userdata : {
       followers : {
           type:Array,
           default:[]
       },
       following : {
           type:Array,
           default:[]
       }
   }



},{timestamps:false});

const User = mongoose.model('users',userSchema);
module.exports = User;