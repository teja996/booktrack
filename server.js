if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyparser = require('body-parser');


const indexRouter = require("./routers/index")
const authorRouter = require("./routers/authors")
const bookRouter = require("./routers/books")
//////
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(express.static('public'))
app.use(bodyparser.urlencoded({ limit:'10mb', extended:false}))

//////
mongoose.connect( process.env.DATABASE_URL, {useNewUrlParser: true,
    useUnifiedTopology: true})

const db = mongoose.connection
db.on("eroor", error => console.error(error))
db.once('open', () => console.log("connected to mongodb"))

const coll = db.collection("books");
console.log(coll.find({}));


app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
app.listen(process.env.PORT || 3000)
