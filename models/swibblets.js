const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const swibbletSchema = new Schema({
    author : {
        username : {
            type:String,
            required:true
        },
        id : {
            type:String,
            reqjuired:true
        }
    },
    
    content : {
        type:String,
        required:true
    },

    createdAt : {
        type:Date,
        default : new Date()
    }

});

const Swibblet = mongoose.model('swibblet',swibbletSchema);
module.exports = Swibblet;


