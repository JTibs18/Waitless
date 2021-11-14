const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Jess:codingking99@cluster0.vcgg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var ObjectId = require('mongodb').ObjectID;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res ,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});
client.connect(err => {
  let db = client.db('Waitless');
  let collRestaurant = db.collection('RestaurantData');
  let collMenu = db.collection('MenuData');




  app.get('/Waitless',(req, res, next)=>{
    res.send("Hello I am Waitless!");
    let p = [ { name: 'Tasty Cotton Chair',
        price: 444.00,
        dimensions: { x: 2, y: 4, z: 5 },
        stock: 21,
        id: 0}]
    collRestaurant.insertMany(p, function(err,result){
      if (err) throw err;
    });

  })

  app.get('/Waitless/Registration',(req, res, next)=>{
    // res.send("Hello world from express!");
    const regData = [
      {
        name: "Jess Bar",
        location: "GTA",
        email: "JessRest@gmail.com",
        phoneNumber: 9057515554,
        password: "xxxx",
        password2: "xxxx"
      },
      {
        name: "Kayla Krabs",
        location: "GTA",
        email: "KrayKay@gmail.com",
        phoneNumber: 9057445554,
        password: "xxxxJJJ",
        password2: "xxxxJJJ"
      }
    ]
    collRestaurant.find().toArray(function(err, result){
      if (err) throw err;

      res.status(201).json({
        message: "Post added successfully",
        data: result
      });
    })
    //
    // res.status(200).json({message: 'Data fetched successfully!',
    //           data: regData
    // });

  })


  app.get('/Waitless/Create_Menu',(req, res, next)=>{
    // res.send("Hello world from express!");

    collMenu.find().toArray(function(err, result){
      if (err) throw err;

      res.status(201).json({
        message: "Item added successfully",
        data: result
      });
    })
    //
    // res.status(200).json({message: 'Data fetched successfully!',
    //           data: regData
    // });

  })

  app.post("/Waitless/Registration", (req, res, next) => {
    const data = req.body;
    console.log("HERE")
    console.log(data);
    collRestaurant.insertOne(data, function(err, result){
      if (err) throw err;
      // console.log("RESULTTT", data._id.toString())
      res.status(201).json({
        message: "Post added successfully",
        dataId: data._id.toString()
      });
    })

  });

  app.post("/Waitless/Create_Menu", (req, res, next) => {
    const data = req.body;
    console.log("HERE")
    console.log(data);
    collMenu.insertOne(data, function(err, result){
      if (err) throw err;
      // console.log("RESULTTT", data._id.toString())
      res.status(201).json({
        message: "Post added successfully",
        dataId: data._id.toString()
      });
    })

  });

  app.delete("/Waitless/Create_Menu/:id", (req, res, next) => {
      console.log(req.params.id);
      collMenu.deleteOne({_id: ObjectId(req.params.id)}, function(err, result){
        if (err) throw err;
        console.log("Delete Response: ", result);
        res.status(200).json({message:'Info deleted!'});
      })
  });

});

module.exports = app;
