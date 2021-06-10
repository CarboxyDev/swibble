const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type:string,
        required:true
    },
    content : {
        type:String,
        required:true
    },
    createdAt : {
        type:String,
        default:new Date()
    }

})