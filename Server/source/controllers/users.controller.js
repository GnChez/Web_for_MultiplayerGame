const mysql = require("mysql2");
const dbConfig = require("../configs/db.config.js");

const pool = mysql.createPool({
  connectionLimit: 100, // Número máximo de conexiones en el pool
  host: "dam.inspedralbes.cat",
  user: "a22osczapmar_User1234",
  password: "User1234",
  database: "a22osczapmar_puzzleGame",
});

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
  try {
    const results = await getUserFromId(userId);
    if (results.length === 0) {
      res.status(404).send({ msg: "User not found" });
    } else {
      res.json(results[0]); // Assuming 'id' is unique, there should only be one result
    }
  } catch (error) {
    next(error); // Pass any errors to the Express error-handling middleware
  }
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
  let user = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `INSERT INTO user (username, password) VALUES (?, ?)`,
      [user.username, user.password],
      (errorQuery, results) => {
        connection.release(); // Always release connection whether there's an error or not
        if (errorQuery) {
          return next(errorQuery); // Send the error to the next error-handling middleware
        }
        res.json(results); // Send the results back to the client as JSON
      }
    );
  });
}

async function updateUser(req, res, next) {
  let id = req.params.id;
  let user = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `UPDATE user SET username=?, password=? WHERE id=?`,
      [user.username, user.password, id],
      (errorQuery, results) => {
        connection.release(); // Always release connection whether there's an error or not
        if (errorQuery) {
          return next(errorQuery); // Send the error to the next error-handling middleware
        }
        res.json(results); // Send the results back to the client as JSON
      }
    );
  });
}

async function deleteUser(req, res, next) {
  let id = req.params.id;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `DELETE FROM user WHERE id=?`,
      id,
      (errorQuery, results) => {
        connection.release(); // Always release connection whether there's an error or not
        if (errorQuery) {
          return next(errorQuery); // Send the error to the next error-handling middleware
        }
        res.json(results); // Send the results back to the client as JSON
      }
    );
  });
}

async function login(req, res, next) {
  let user = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `SELECT * FROM user WHERE username=? AND password=?`,
      [user.username, user.password],
      (errorQuery, results) => {
        connection.release(); // Always release connection whether there's an error or not
        if (errorQuery) {
          return next(errorQuery); // Send the error to the next error-handling middleware
        }
        if (results.length > 0) {
          res.json({ msg: "Login Success" });
        } else {
          res.json({ msg: "Login Failed" });
        }
      }
    );
  });
}

async function getUserFromId(id) {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error); // Reject the promise with the error
        return;
      }
      connection.query(
        "SELECT * FROM user WHERE id = ?",
        [id],
        (errorQuery, results) => {
          connection.release(); // Always release connection whether there's an error or not
          if (errorQuery) {
            reject(errorQuery); // Reject the promise with the query error
          } else {
            resolve(results); // Resolve the promise with the query results
          }
        }
      );
    });
  });
}

module.exports = {
  getUsers,
  getUserById,
  getUserFromId,
  getUsernames,
  login,
  insertUser,
  updateUser,
  deleteUser,
};
