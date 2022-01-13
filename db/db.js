const { Pool } = require('pg');
const { DB } = require('../config');
var sha256 = require('js-sha256');

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
  let result = [];
  try{
    result = await pool.query('SELECT * FROM cart ORDER BY id ASC');
    return result.rows;
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

const createUser = (request, response) => {
  const { id, email, password } = request.body
  // serverside hashing
  let h = sha256(password);

  pool.query('INSERT INTO users (id, email, password) VALUES ($1, $2, $3)', [id, email, h], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(201).send(`User added with ID: ${results.insertId}`)
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

const createCartItem = (request, response) => {
  const { user_id, item_id } = request.body

  pool.query('INSERT INTO cart (user_id, item_id) VALUES ($1, $2)', [user_id, item_id], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(201).send(`User added with ID: ${results.insertId}`)
  })
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
  checkEmailPasswordCombo
}