const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;