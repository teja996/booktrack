const express = require('express')
const router  = express.Router()
const Books = require('../models/books');
const Author = require('../models/author');
// const multer = require('multer');
// const path = require('path');
const { log } = require('console');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
// // //set Storage Eengine
// const storage = multer.diskStorage({
//     destination : 'uploads',
//     filename : function(req, file, cb){
//         cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
//     },
// })

// const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']

// //initialize uplode variable.
// const upload = multer({
//  storage : storage,
//  limits: {fileSize: 10000000},
// //  fileFilter : (req, file, callback) =>{
// //      callback(null, imageMimeTypes.includes(file.mimetype))
// //  }
// })

//list of books.
router.get('/', async (req, res) => {
    const serchParam = {}
    try {
    if( req.query.bookName != null || req.query.bookName!= '') {
        serchParam.bookName = new RegExp(req.query.bookName, 'i')
    }
    const books = await Books.find(serchParam)
    res.render('books/books', {books : books, bookName : req.query.bookName} );
    } catch {
        res.redirect('/books/newBook')
    }
})

//create of new book.
router.get('/newBook', async (req, res) => {
    try {
        const authors = await Author.find({})
        res.render("books/newBook", { books : new Books, authors : authors})
    } catch {
        res.redirect('/books')
    }
    
})

//add book.
router.post('/',  async (req, res) => {
    const authorData = await Author.findById(req.body.author, (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data.name);
                }
            });

    const books = new Books({
        bookName: req.body.bookName,
        author : req.body.author,
        authorName : authorData.name,   
        date : new Date(req.body.date),
        totalPages : req.body.totalPages,
        description : req.body.description,
    });
    saveCover(books, req.body.cover);

    //console.log("should be saving this : " + authorData["name"] + "and" + req.body.cover )
    try {
        const newBook = await books.save()
        //console.log(newBook)
        res.redirect('/books')
    } catch {
        res.redirect('/books/newBook')
    }
})

function saveCover(book, coverEncoded){
    if(coverEncoded == null || coverEncoded=="" ) {
        console.log("no cover uploded...");
        return;
    } 
    const cover = JSON.parse(coverEncoded);
    if(cover != null || imageMimeTypes.includes(cover.type) ){
        book.cover = new Buffer.from(cover.data, 'base64');
        book.coverType = cover.type;
    }
}

module.exports = router