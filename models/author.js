const mongoose = require("mongoose");

const author_model = mongoose.Schema({
    name:{
        type : String,
        require : true
    }
})

module.exports = mongoose.model( "Author" , author_model )