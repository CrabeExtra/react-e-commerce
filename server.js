const express = require('express');
const db = require('./db/db');
const bodyParser = require('body-parser');
const config = require('./config.js');
const cors = require('cors');
const app = express();


const port = config.PORT || 5000;

// for storing users
let items = [];
let users = [];
let carts = [];

app.use(cors());

// setting up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting up the ability for json access from react app
app.use(function (req, res, next) {
  //res.setHeader(`Access-Control-Allow-Origin', 'http://localhost:3000`); this line was giving me errors.
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

// posts for form submissions:

app.post('/user', (req, res) => {
  const user = req.body;
  
  // output to console for debugging
  console.log(user);
  users.push(user);
  db.createUser(req,res);
  res.send('user registered!');
});

app.post('/item', (req, res) => {
  const item = req.body;
  
  // output to console for debugging
  console.log(item);
  items.push(item);
  let newreq = req;
  let newres = res;
  db.createItem(newreq, newres);

  res.send('item added to the database');
});

app.post('/cart', (req, res) => {
  const toAdd = req.body;
  
  // output to console for debugging
  console.log(toAdd);
  carts.push(toAdd);
  db.createCartItem(req, res);
  res.send('item added to cart');
});

app.post('/logged', async (req, res) => {
  let { email, password } = req.body;
  let result = await db.checkEmailPasswordCombo(req, res);
  console.log(req.body);
  if(result.length !== 0) {
      res.json({success:true, email:email});
  }else {
      res.json({success:false, email:email});
  }
  
});

//getters for db data and login data:

app.get('/items', async (req, res) => {
  let itemData = await db.getItems(req, res);
  res.json(itemData.concat(items));
});

app.get('/users', async (req, res) => {
  let userData = await db.getUsers(req, res);
  res.json(userData.concat(users));
});

app.get('/carts', async (req, res) => {
  let cartData = await db.getCart(req, res);
  res.json(cartData.concat(carts));
});


app.listen(port, () => console.log(`Listening on port ${port}`));