const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Jess:codingking99@cluster0.vcgg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('backend/src'));
const path = require('path');
fs = require('fs')

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let p = [ { name: 'Tasty Cotton Chair',
    price: 444.00,
    dimensions: { x: 2, y: 4, z: 5 },
    stock: 21,
    id: 0},
  { name: 'Small Concrete Towels',
    price: 806.00,
    dimensions: { x: 4, y: 7, z: 8 },
    stock: 47,
    id: 1},
  { name: 'Small Metal Tuna',
    price: 897.00,
    dimensions: { x: 7, y: 4, z: 5 },
    stock: 13,
    id: 2},
  { name: 'Generic Fresh Chair',
    price: 403.00,
    dimensions: { x: 3, y: 8, z: 11 },
    stock: 47,
    id: 3},
  { name: 'Generic Steel Keyboard',
    price: 956.00,
    dimensions: { x: 3, y: 8, z: 6 },
    stock: 8,
    id: 4},
  { name: 'Refined Metal Bike',
    price: 435.00,
    dimensions: { x: 7, y: 5, z: 5 },
    stock: 36,
    id: 5},
  { name: 'Practical Steel Pizza',
    price: 98.00,
    dimensions: { x: 4, y: 7, z: 4 },
    stock: 12,
    id: 6},
  { name: 'Awesome Wooden Bike',
    price: 36.00,
    dimensions: { x: 11, y: 10, z: 10 },
    stock: 3,
    id: 7},
  { name: 'Licensed Cotton Keyboard',
    price: 990.00,
    dimensions: { x: 8, y: 7, z: 3 },
    stock: 27,
    id: 8},
  { name: 'Incredible Fresh Hat',
    price: 561.00,
    dimensions: { x: 6, y: 7, z: 5 },
    stock: 28,
    id: 9},
  { name: 'Tasty Cotton Soap',
    price: 573.00,
    dimensions: { x: 2, y: 6, z: 11 },
    stock: 31,
    id: 10},
  { name: 'Intelligent Metal Mouse',
    price: 3.00,
    dimensions: { x: 4, y: 5, z: 10 },
    stock: 0,
    id: 11},
  { name: 'Practical Plastic Ball',
    price: 11.00,
    dimensions: { x: 11, y: 9, z: 11 },
    stock: 25,
    id: 12},
  { name: 'Rustic Fresh Tuna',
    price: 159.00,
    dimensions: { x: 8, y: 6, z: 8 },
    stock: 30,
    id: 13},
  { name: 'Small Metal Tuna',
    price: 225.00,
    dimensions: { x: 8, y: 10, z: 8 },
    stock: 49,
    id: 14} ];

client.connect(err => {
  let db = client.db('Waitless');
  let collRestaurant = db.collection('RestaurantData');


  app.get("/Waitless/registration", function(req, res){
    console.log("ERE")
    var options = {
      root: path.join(__dirname, 'backend/src')
    }
    // fs.createReadStream(__dirname+ "/backend/src/app/" + 'app-routing.module.ts').pipe(res)
    // return res.sendFile('/app/app-routing.module.ts', options)
    return res.sendFile('/app/registration/registration.component.html', options)


  });

  app.get("/Waitless", function(req, res){
    console.log("ERE")
    var options = {
      root: path.join(__dirname, 'backend/src')
    }

    return res.sendFile('/app/app.component.html', options)

  });

  collRestaurant.insertMany(p, function(err,result){
    if (err) throw err;
  });
  // client.close();
app.listen(3000);
console.log("Server listening at http://localhost:3000");
});
