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
  const {email} = req.body;
  
  // output to console for debugging
  result = db.createUser(req,res);
  if(result) {
    res.json({success:true, email:email});
  }else {
    res.json({success:false, email:email});
  }
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

app.post('/orders', async (req, res) => {
  let orders = await db.getOrders(req, res);
  res.json(orders);
});

app.post('/cart', async (req, res) => {
  const toAdd = req.body;
  
  // output to console for debugging
  console.log(toAdd);
  carts.push(toAdd);
  if(toAdd.add === 'add') {
    db.createCartItem(req, res);
  } else if(toAdd.add === 'remove') {
    db.deleteCartItem(req, res);
  } else if (toAdd.add === 'checkout') {
    db.deleteCart(req, res);
    
    db.createOrder(req, res);
  } else if(toAdd.add === 'getCart') {
    if(req.body.user_email) {
      let data = await db.getCart(req, res);
      res.json(data);
    }
  }
});

app.post('/logged', async (req, res) => {
  let { email, password } = req.body;
  let result = await db.checkEmailPasswordCombo(req, res);
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
  console.log(cartData);
  res.json(cartData.concat(items));
});




app.listen(port, () => console.log(`Listening on port ${port}`));