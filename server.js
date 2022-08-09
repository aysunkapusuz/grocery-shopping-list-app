const express = require("express")
const app = express()
const PORT =8500;
const mongoose = require("mongoose")
require('dotenv').config()


app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_STRING,
    {useNewUrlParser: true},
    () => {console.log('Connected to db!')})


app.get('/', async (req,res) => {
    try{ GroceryList.find({}, (err, groceries) => {
        res.render('index.ejs', {groceryLists, groceries})
    })


    }catch(err){

    }
}
)

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
)