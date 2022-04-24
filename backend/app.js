const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("./middleware/check-auth")
const extractFile = require("./middleware/image")
var ObjectId = require('mongodb').ObjectID;

const uri = "mongodb+srv://Jess:codingking99@cluster0.vcgg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

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
  let collOrder = db.collection('OrderData');

  collRestaurant.createIndex({"email": 1}, {unique:true}).catch(e => { console.log(e)  })


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


  app.get('/Waitless/:restaurantName/Create_Menu', checkAuth, (req, res, next)=>{

    collMenu.find({restaurantId: req.userData.userId}).toArray(function(err, result){
      if (err) throw err;

      res.status(201).json({
        message: "successful",
        data: result
      });
    })
  })

  app.get('/Waitless/:restaurantID/Menu', (req, res, next)=>{
    collMenu.find({restaurantId: req.params.restaurantID}).toArray(function(err, result){
      if (err) throw err;

      res.status(201).json({
        message: "successful",
        data: result
      });
    })
  })

  app.get('/Waitless/:restaurantName/Create_Menu/Edit/:id',checkAuth,(req, res, next)=>{

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
        res.status(404).json({message: 'Id not found!'});
      }
    })
   })

   app.get('/Waitless/:restaurantName/CurOrders', checkAuth, (req, res, next)=>{
     restId = req.userData.userId.toString()

     console.log("CURORDER", restId)


     collOrder.find({$and: [{restaurantId: {$eq: req.userData.userId}},
     {status: {$ne: "Paid"}}]}).toArray(function(err, result){
       if (err) throw err;

       console.log("CURORDER", result, req.userData.userId.toString())
       res.status(201).json({
         message: "successful",
         data: result
       });
     })
   })

   app.get('/Waitless/:restaurantName/PastOrder', checkAuth, (req, res, next)=>{
     restId = req.userData.userId.toString()

     collOrder.find({$and: [{restaurantId: {$eq: req.userData.userId}},
     {status: {$eq: "Paid"}}]}).toArray(function(err, result){
       if (err) throw err;

       console.log("PASTORDER", result, req.userData.userId.toString())
       res.status(201).json({
         message: "successful",
         data: result
       });
     })
   })


   app.get('/Waitless/:restaurantName/PastOrder/:id',checkAuth,(req, res, next)=>{

     collOrder.find({_id: {$eq: ObjectId(req.params.id)}}).toArray(function(err, result){
       if (err) throw err;
     // console.log(result, result[0].itemName, result[0]._id)
     result[0]._id = result[0]._id.toString()
     // console.log(result[0]._id, result[0]._id.toString())

     // console.log(result, req.params.id)
     console.log(result[0])
       if(result){
         res.status(200).json(result[0]);
       }else{
         res.status(404).json({message: 'Id not found!'});
       }
     })
    })

   app.get('/Waitless/:restaurantID/Name', (req, res, next)=>{
     collRestaurant.find({_id: ObjectId(req.params.restaurantID)}).toArray(function(err, result){
       if (err) throw err;

       res.status(201).json(result[0].restaurantName);
     })
   })

   app.get('/Waitless/:restaurantID/focusOneItem/:menuId',(req, res, next)=>{

     collMenu.find({_id: {$eq: ObjectId(req.params.menuId)}}).toArray(function(err, result){
       if (err) throw err;
     result[0]._id = result[0]._id.toString()

       if(result){
         res.status(200).json(result[0]);
       }else{
         res.status(404).json({message: 'Id not found!'});
       }
     })
    })

  app.post("/Waitless/Login", (req, res, next)=> {
    let fetchedUser;
    collRestaurant.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Invalid authentication credentials!"
        });
      }
      fetchedUser = user
      return bcrypt.compare(req.body.password, user.password)

    })
    .then(result => {
      if (!result){
        return res.status(401).json({
          message: "Invalid authentication credentials!"
        });
      }
      const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret_code_that_should_be_very_long_string', {expiresIn: '1h'}); //creates new token
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        restaurantName: fetchedUser.restaurantName
      });

    })
    .catch(err => {
      return res.status(401).json({
      message: "Invalid authentication credentials!"
      });
    })
  });

  app.post("/Waitless/Registration", (req, res, next) => {
    let id;

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
            return res.status(500).json({
              message: "Registration failed. Email has already been registered. Please sign in or register with a new email"
            })
          }
          else{
            id = result.insertedId;

            const token = jwt.sign({email: req.body.email, userId: id}, 'secret_code_that_should_be_very_long_string', {expiresIn: '1h'}); //creates new token
            console.log(token)
            res.status(200).json({
              token: token,
              expiresIn: 3600,
              dataId: user._id.toString(),
              userId: id,
              restaurantName: req.body.name
            });
          }
        })
      })

  });

  app.post("/Waitless/:restaurantName/Create_Menu", checkAuth, extractFile, (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const imagePath = url + "/images/" + req.file.filename;

    const data = {
      itemName: req.body.itemName,
      description: req.body.description,
      ingredients: req.body.ingredients,
      price: req.body.price,
      calories: req.body.calories,
      imagePath: imagePath,
      restaurantId: req.userData.userId,
      tags: req.body.tags
    }

    console.log(data);
    collMenu.insertOne(data, function(err, result){
      if (err) throw err;
      // console.log("RESULTTT", data._id.toString())
      res.status(201).json({
        message: "data added successfully",
        dataId: data._id.toString(),
        imagePath: url + "/images/" + req.file.filename
      });
    })
  });

  app.put("/Waitless/:restaurantName/Create_Menu/Edit/:id", checkAuth, extractFile, (req, res, next) => {
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
      imagePath: imagePath,
      restaurantId: req.userData.userId
    }

      collMenu.updateOne({_id: ObjectId(req.params.id), restaurantId: req.userData.userId}, {$set: data}, function(err,result){
            if(err) throw err;
      console.log("THIS", result);
      if (result.matchedCount > 0){
        res.status(200).json({message:"Update successful!"})
      }else{
        res.status(401).json({message:"Not authorized!"})
      }

    })
  });

  app.post("/Waitless/:restaurantName/Dashboard", checkAuth, (req, res, next) => {

    const order = {
      tableNum: req.body.tableNum,
      order: req.body.order,
      specialNotes: req.body.specialNotes,
      tab: req.body.tab,
      restaurantId: req.body.restaurantId,
      status: req.body.status
    }

    console.log(order);
    collOrder.insertOne(order, function(err, result){
      if (err) throw err;

      console.log("ADDED TO DB")
      // console.log("RESULTTT", data._id.toString())
      res.status(201).json({
        message: "Order added successfully",
        orderId: order._id.toString()
      });
    })
  });

  app.post("/Waitless/:restaurantName/PastOrder", checkAuth, (req, res, next) => {

    const order = {
      id: req.body.id,
      tableNum: req.body.tableNum,
      order: req.body.order,
      specialNotes: req.body.specialNotes,
      tab: req.body.tab,
      restaurantId: req.body.restaurantId,
      status: req.body.status,
      timeCompleted: req.body.timeCompleted
    }

    console.log("J", req)

    console.log(order);
    collOrder.updateOne({_id: ObjectId(req.body.id), restaurantId: req.body.restaurantId}, {$set: {status: req.body.status, timeCompleted: req.body.timeCompleted}}, function(err,result){
      if (err) throw err;

      console.log("PAST ORDER ADDED TO DB")
      // console.log("RESULTTT", data._id.toString())
      res.status(201).json({
        message: "Order added successfully"
      });
    })
  });


  app.delete("/Waitless/:restaurantName/Create_Menu/:id", checkAuth, (req, res, next) => {
      console.log(req.params.id);

      collMenu.deleteOne({_id: ObjectId(req.params.id), restaurantId: req.userData.userId}, function(err, result){
        if (err) throw err;
        if (result.deletedCount > 0){
          res.status(200).json({message:"Deletion successful!"})
        }else{
          res.status(401).json({message:"Not authorized!"})
        }
        console.log("Delete Response: ", result);
      })
  });

});

module.exports = app;
