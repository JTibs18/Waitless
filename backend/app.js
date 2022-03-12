const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("./middleware/check-auth")
const uri = "mongodb+srv://Jess:codingking99@cluster0.vcgg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var ObjectId = require('mongodb').ObjectID;

const app = express();
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');

    if (isValid){
      error = null;
    }

    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + '.' + ext);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res ,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

client.connect(err => {
  let db = client.db('Waitless');
  let collRestaurant = db.collection('RestaurantData');
  let collMenu = db.collection('MenuData');
  collRestaurant.createIndex({"email": 1}, {unique:true}).catch(e => { console.log(e) })


  app.get('/Waitless',(req, res, next)=>{

    collRestaurant.insertMany(p, function(err,result){
      if (err) throw err;
    });

  })

  app.get('/Waitless/Registration',(req, res, next)=>{
    collRestaurant.find().toArray(function(err, result){
      if (err) throw err;

      res.status(201).json({
        message: "Registration added successfully",
        data: result
      });
    })
  })


  app.get('/Waitless/Create_Menu', checkAuth, (req, res, next)=>{

    collMenu.find().toArray(function(err, result){
      if (err) throw err;

      res.status(201).json({
        message: "Item added successfully",
        data: result
      });
    })
  })

  app.get('/Waitless/Create_Menu/Edit/:id',checkAuth,(req, res, next)=>{

    collMenu.find({_id: {$eq: ObjectId(req.params.id)}}).toArray(function(err, result){
      if (err) throw err;
    // console.log(result, result[0].itemName, result[0]._id)
    result[0]._id = result[0]._id.toString()
    // console.log(result[0]._id, result[0]._id.toString())

    // console.log(result, req.params.id)
    console.log(result[0])
      if(result){
        res.status(200).json(result[0]);
      }else{
        res.status(404).json({messge: 'Id not found!'});
      }
    })
   })

  app.post("/Waitless/Login", (req, res, next)=> {
    let fetchedUser;
    collRestaurant.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user
      return bcrypt.compare(req.body.password, user.password)

    })
    .then(result => {
      if (!result){
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret_code_that_should_be_very_long_string', {expiresIn: '1h'}); //creates new token

      res.status(200).json({
        token: token,
        expiresIn: 3600
      });

    })
    .catch(err => {
      return res.status(401).json({
      message: "Auth failed"
      });
    })
  });

  app.post("/Waitless/Registration", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash=>{
          const user = {
          restaurantName: req.body.name,
          location: req.body.location,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: hash
        }

        collRestaurant.insertOne(user, function(err, result){
          // if (err) console.log(err);
          if(err){
            console.log(err)
            res.status(500).json({
              error: err
            })
          }
          else{
            res.status(201).json({
              message: "Restaurant added successfully",
              dataId: user._id.toString()
            });
          }
          });
      });

  });

  app.post("/Waitless/Create_Menu", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const imagePath = url + "/images/" + req.file.filename;

    const data = {
      itemName: req.body.itemName,
      description: req.body.description,
      ingredients: req.body.ingredients,
      price: req.body.price,
      calories: req.body.calories,
      imagePath: imagePath
    }

    console.log(data);
    collMenu.insertOne(data, function(err, result){
      if (err) throw err;
      // console.log("RESULTTT", data._id.toString())
      res.status(201).json({
        message: "Post added successfully",
        dataId: data._id.toString(),
        imagePath: url + "/images/" + req.file.filename
      });
    })
  });

  app.put("/Waitless/Create_Menu/Edit/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file){
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const data =  {
      itemName: req.body.itemName,
      description: req.body.description,
      ingredients: req.body.ingredients,
      price: req.body.price,
      calories: req.body.calories,
      _id: ObjectId(req.params.id),
      imagePath: imagePath
    }

      collMenu.updateOne({_id: ObjectId(req.params.id)}, {$set: data}, function(err,result){
            if(err) throw err;
      console.log(result);
      res.status(200).json({message:"Update successful!"})

    })
  });

  app.delete("/Waitless/Create_Menu/:id", checkAuth, (req, res, next) => {
      console.log(req.params.id);
      collMenu.deleteOne({_id: ObjectId(req.params.id)}, function(err, result){
        if (err) throw err;
        console.log("Delete Response: ", result);
        res.status(200).json({message:'Info deleted!'});
      })
  });

});

module.exports = app;
