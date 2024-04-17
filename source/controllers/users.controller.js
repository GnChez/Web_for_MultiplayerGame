
const mysql = require('mysql2');
const dbConfig = require('../configs/db.config.js');

const pool = mysql.createPool({
    connectionLimit: 10, // Número máximo de conexiones en el pool
    host: 'dam.inspedralbes.cat',
    user: 'a22osczapmar_User1234',
    password: 'User1234',
    database: 'a22osczapmar_puzzleGame'
})

async function getUsers(req, res, next) {
    pool.getConnection((error, connection) => {
        if (error) {
            return next(error); // Handle the error in an Express error-handling middleware
        }
        connection.query("SELECT * FROM user", (errorQuery, results) => {
            connection.release(); // Always release connection whether there's an error or not
            if (errorQuery) {
                return next(errorQuery); // Send the error to the next error-handling middleware
            }
            res.json(results); // Send the results back to the client as JSON
        });
    });
}
  async function getUserById(req, res, next) {
    const userId = req.params.id;
    pool.getConnection((error, connection) => {
        if (error) {
            return next(error); // Handle the error in an Express error-handling middleware
        }
        connection.query("SELECT * FROM user WHERE id = ?", [userId], (errorQuery, results) => {
            connection.release(); // Always release connection whether there's an error or not
            if (errorQuery) {
                return next(errorQuery); // Send the error to the next error-handling middleware
            }
            res.json(results); // Send the results back to the client as JSON
        });
    });
  }
  async function getUsernames(req, res, next) {
    pool.getConnection((error, connection) => {
        if (error) {
            return next(error); // Handle the error in an Express error-handling middleware
        }
        connection.query("SELECT username FROM user", (errorQuery, results) => {
            connection.release(); // Always release connection whether there's an error or not
            if (errorQuery) {
                return next(errorQuery); // Send the error to the next error-handling middleware
            }
            res.json(results); // Send the results back to the client as JSON
        });
    });
  }
  
  async function insertUser(req, res, next) {
    pool.getConnection((error, connection) => {
        if (error) {
            return next(error); // Handle the error in an Express error-handling middleware
        }
        connection.query("SELECT * FROM user", (errorQuery, results) => {
            connection.release(); // Always release connection whether there's an error or not
            if (errorQuery) {
                return next(errorQuery); // Send the error to the next error-handling middleware
            }
            res.json(results); // Send the results back to the client as JSON
        });
    });
  }
  
  async function updateUser(req, res, next) {
    pool.getConnection((error, connection) => {
        if (error) {
            return next(error); // Handle the error in an Express error-handling middleware
        }
        connection.query("SELECT * FROM user", (errorQuery, results) => {
            connection.release(); // Always release connection whether there's an error or not
            if (errorQuery) {
                return next(errorQuery); // Send the error to the next error-handling middleware
            }
            res.json(results); // Send the results back to the client as JSON
        });
    });
  }
  
  async function deleteUser(req, res, next) {
    pool.getConnection((error, connection) => {
        if (error) {
            return next(error); // Handle the error in an Express error-handling middleware
        }
        connection.query("SELECT * FROM user", (errorQuery, results) => {
            connection.release(); // Always release connection whether there's an error or not
            if (errorQuery) {
                return next(errorQuery); // Send the error to the next error-handling middleware
            }
            res.json(results); // Send the results back to the client as JSON
        });
    });
  }
  
  module.exports = {
    getUsers,
    getUserById,
    getUsernames,
    insertUser,
    updateUser,
    deleteUser
  };