const mongoose = require("mongoose")
const Author = require('./author')
const path = require("path")

const bookSchema = mongoose.Schema({
    bookName: {
        type : String,
        required : true,
    },

    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : Author,
    },

    totalPages : {
        type : Number,
        default : 0,
    },

    authorName : {
        type : String,
    },

    date: {
        type : Date,
        required : true,
        default : Date.now,
    },
    
    cover : {
        type : Buffer,
        required : true,
    },

    coverType :{
        type : String,
        required : true,
    },

    description : {
        type : String,
        default : "description...",
    },
})

bookSchema.virtual("coverImage").get(function() {
    const image=`data:${this.coverType};charset=utf-8;base64,${this.cover.toString('base64')}`
    //console.log(image);
    return image;
    //return path.join("/uploads", this.cover)
})

module.exports = mongoose.model( "Books", bookSchema )