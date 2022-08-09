const express = require("express")
const app = express()
const PORT =8500;
const mongoose = require("mongoose")
require('dotenv').config()
const GroceryList = require('./models/Grocery')


app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_STRING,
    {useNewUrlParser: true},
    () => {console.log('Connected to db!')})


app.get('/', async (req,res) => {
    try{
        Grocery.find({}, (err, groceries) => {
        res.render('index.ejs', {grocery: groceries})
    })


    }catch(err){

    }
}
)

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
)