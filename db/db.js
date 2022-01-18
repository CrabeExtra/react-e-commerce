const { Pool } = require('pg');
const { DB } = require('../config');
var sha256 = require('js-sha256');
const express = require('express');
const { request } = require('express');

const pool = new Pool({
  user: DB.PGUSER,
  host: DB.PGHOST,
  database: DB.PGDATABASE,
  password: DB.PGPASSWORD,
  port: DB.PGPORT
});

const getUsers = async (request, response) => {
  
  let results = [];
  try {
    results = await pool.query('SELECT * FROM users ORDER BY id ASC');
    return results.rows;
  } catch(e) {
    throw e;
  }
}

const getOrders = async (request, response) => {
  const { email } = request.body; 
  let result = [];
  try{
    result = await pool.query('SELECT * FROM order_history WHERE user_email=$1 ORDER BY id ASC',[email]);
    return result.rows;
  } catch(e) {
    throw e;
  }
}

const createUser = (request, response) => {
  const { email, password } = request.body
  // serverside hashing
  let h = sha256(password);

  return pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, h], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const createOrder = async (request, response) => {
  const { user_email, item_id } = request.body;
// add to order details to database in database
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  await pool.query('INSERT INTO order_history (user_email, time, items) VALUES ($1, $2, $3)', [user_email, time, item_id]);
}

const getItems = async (request, response) => {
  let result = [];
  try{
    result = await pool.query('SELECT * FROM items ORDER BY id ASC');
    return result.rows;
  } catch(e) {
    throw e;
  }
}

const getCart = async (request, response) => {
  const { user_email, item_id } = request.body;
  try{
    let results = await pool.query('SELECT id FROM users WHERE email=$1 ORDER BY id ASC',[user_email]);
    let user_id = results.rows[0].id;
    let resultC = await pool.query('SELECT item_id FROM cart WHERE user_id = $1 ORDER BY id ASC', [user_id]);
    let item_ids = resultC.rows;
    let toReturn = []
    let items = await pool.query('SELECT * FROM items ORDER BY id ASC');
    
    for(let i = 0; i < item_ids.length; i++) {
      let temp = items.rows.find(row =>  {
        return item_ids[i].item_id === row.id;
      });
      toReturn.push(temp);
    }
    return toReturn;
  } catch(e) {
    throw e;
  }
}

const deleteCartItem = async (request, response) =>  {
  const { user_email, item_id } = request.body;

  try {
    let results = await pool.query('SELECT id FROM users WHERE email=$1 ORDER BY id ASC',[user_email]);
    let user_id = results.rows[0].id;
    console.log(user_id);
    let cartId = await pool.query('SELECT id FROM cart WHERE item_id=$1 AND user_id=$2', [item_id, user_id]);
    cartId = cartId.rows[0].id;
    await pool.query('DELETE FROM cart WHERE id=$1', [cartId]);
  } catch(e) {
    throw e;
  }
}

const deleteCart = async (request, response) =>  {
  const { user_email } = request.body;

  try {
    let results = await pool.query('SELECT id FROM users WHERE email=$1 ORDER BY id ASC',[user_email]);
    let user_id = results.rows[0].id;
    await pool.query('DELETE FROM cart WHERE user_id = $1', [user_id]);

  } catch(e) {
    throw e;
  }
}

const checkEmailPasswordCombo = async (request, response) => {
  const { email, password } = request.body;

  let h = sha256(password);
  let result = [];
  try {
    result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, h]);
  } catch (e) {
    throw e;
  }
  console.log(result.rows);
  return result.rows;
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(200).json(results.rows)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { email, password } = request.body

  let h = sha256(password);

  pool.query(
    'UPDATE users SET email = $1, password = $2 WHERE id = $3',
    [email, h, id],
    (error, results) => {
      if (error) {
        throw error
      }
      //response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const getItemById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM items WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(200).json(results.rows)
  })
}

const createItem = (request, response) => {
  const { id, name, price } = request.body

  pool.query('INSERT INTO items (id, name, price) VALUES ($1, $2, $3)', [id, name, price], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const createCartItem = async (request, response) => {
  const { user_email, item_id } = request.body
  
  let results = await pool.query('SELECT id FROM users WHERE email=$1 ORDER BY id ASC',[user_email]);
  
  if(results.rows){
    console.log(results.rows[0].id);
    let user_id = results.rows[0].id;
    pool.query('INSERT INTO cart (user_id, item_id) VALUES ($1, $2)', [user_id, item_id], (error, results) => {
      if (error) {
        throw error
      }
      //response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
}

module.exports = {
  getUsers,
  getItems,
  getCart,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getItemById,
  createItem,
  createCartItem,
  checkEmailPasswordCombo,
  deleteCartItem,
  deleteCart,
  createOrder,
  getOrders
}