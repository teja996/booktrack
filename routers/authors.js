const express = require('express')
const router  = express.Router()
const Author = require('../models/author');


//list of authors.
router.get('/', async (req, res) => {
    const serchParam = {}
    try {
    if( req.query.name != null || req.query.name != '') {
        serchParam.name = new RegExp(req.query.name, 'i')
    }
    const authors = await Author.find(serchParam)
    console.log(authors)
    res.render('authors/authors', {authors : authors, name : req.query.name} );
    } catch {
        res.redirect('/newAuthor')
    }
})

//list of new authors.
router.get('/newAuthor', (req, res) => {
    res.render('authors/newAuthor', { author : new Author() })
})
//create author.
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    try {
        const newAuthor = await author.save()
        res.redirect('/authors')
    } catch {
        res.render('authors/newAuthor', {
                            author : author,
                            errorMessage : "error creating Author",
                        })
    }

    // author.save((err , newAuthor) => {
    //     if(err) {
    //         res.render('authors/newAuthor', {
    //             author : author,
    //             errorMessage : "error creating Author",
    //         })     
    //     }
    //     else {
    //         res.redirect('authors/')
    //     }

    // })
})


module.exports = router