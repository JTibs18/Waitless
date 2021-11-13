const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res ,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/Waitless", (req, res, next) => {
  const data = req.body;
  console.log(data);
  res.status(201).json({
    message: "Post added successfully"
  });
});

app.get('/Waitless',(req, res, next)=>{
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


  res.status(200).json({message: 'Data fetched successfully!',
            data: regData
  });
})

module.exports = app;
