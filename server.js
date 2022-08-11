const { response } = require("express");
const express = require("express")
const app = express()
const PORT =8500;
const mongoose = require("mongoose")
require('dotenv').config()
const Grocery = require('./models/grocery')


app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_STRING,
    {useNewUrlParser: true},
    () => {console.log('Connected to db!')})


app.get('/', async (req,res) => {
    try{
        Grocery.find({}, (err, groceries) =>{
            res.render('index.ejs', {
                grocery: groceries
            })
        })
    } catch (error){
        res.status(500).send({message: error.message})
    }
})

app.post('/', async(req,res) => {
    const grocery = new Grocery(
        {
            category: req.body.category,
            item: req.body.item
        }
    )
    try {
        await grocery.save()
        console.log(grocery)
        res.redirect("/")
    }catch (err){
        if (err) return res.status(500).send(err)
        res.redirect('/')
    }
})


app
   .route("/edit/:id").get((req,res) => {
    const id = req.params.id
    Grocery.find({}, (err, groceries) => {
        res.render('edit.ejs',{
            grocery:groceries, idData: id
        })
    })
    .post((req,res) =>{
        const id = req.params.id
        Grocery.findByIdAndUpdate(
            id,
            {
              category: req.body.category,
              item: req.body.item
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })
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
        res.redirect("/");
      }
    );
  }
  
  app.route("/edit/:id").get(getRequestHandler).post(postRequestHandler);

app
   .route("/remove/:id")
   .get((req,res) => {
    const id = req.params.id
    Grocery.findByIdAndRemove(id, err =>{
        if (err) return res.status(500).send(err);
        res.redirect("/");
    })
   })




app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
)