const { response } = require("express");
const express = require("express")
const app = express()
const PORT =8500;
const mongoose = require("mongoose")
require('dotenv').config()
const Grocery = require('./models/grocery');



app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_STRING,
    {useNewUrlParser: true},
    () => {console.log(`Connected to DB!`)})


app.get('/', (req,res) => {
        res.render('index.ejs')
})

//get grocery list
app.get('/grocerylist', async (req,res) => {
    try{
        Grocery.find({}, (err, groceries) =>{
            res.render('grocerylist.ejs', {
                grocery: groceries,
            })
        })
    } catch (error){
        res.status(500).send({message: error.message})
    }
})

app.post('/grocerylist', async(req,res) => {
    const grocery = new Grocery(
        {   
            category: req.body.category,
            item: req.body.item
        }
    )
    try {
        await grocery.save()
        console.log(grocery)
        res.redirect("/grocerylist")
    }catch (err){
        if (err) return res.status(500).send(err)
        res.redirect('/grocerylist')
    }
})

function getRequestHandler(req, res) {
    const id = req.params.id;
    Grocery.find({}, (err, groceries) => {
      res.render("edit.ejs", {
        grocery: groceries,
        idData: id,
      });
    });
  }
  
  function postRequestHandler(req, res) {
    const id = req.params.id;
    Grocery.findByIdAndUpdate(
      id,
      {
        category: req.body.category,
        item: req.body.item,
      },
      (err) => {
        if (err) return res.status(500).send(err);
        res.redirect("/grocerylist");
      }
    );
  }
  
  app.route("/edit/:id").get(getRequestHandler).post(postRequestHandler);


function getDeleteHandler(req,res){
    const id = req.params.id
    Grocery.findByIdAndRemove(id, err =>{
        if (err) return res.status(500).send(err);
        res.redirect("/grocerylist");
    })
}
app.route("/remove/:id").get(getDeleteHandler)




app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
)