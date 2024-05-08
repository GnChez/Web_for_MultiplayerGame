const {v4: uuidv4} = require('uuid');
const fs = require('fs')
const mysql = require("mysql2");
const dbConfig = require("../configs/db.config.js");
const { SERVER_URL, port } = require('../../index.js');
const bcrypt = require('bcrypt');

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
  let hashedPassword = await bcrypt.hash(user.password, 10);
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `INSERT INTO user (email, username, password, name, surname) VALUES (?, ?, ?, ?, ?)`,
      [user.email, user.username, hashedPassword, user.name, user.surname],
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
      return next(error);
    }
    connection.query(
      `UPDATE user SET username=?, password=? WHERE id=?`,
      [user.username, user.password, id],
      (errorQuery, results) => {
        connection.release();
        if (errorQuery) {
          return next(errorQuery);
        }
        // Initialize req.session.user as an object if it doesn't already exist
        req.session.user = req.session.user || {};
        req.session.user.username = user.username;
        req.session.user.password = user.password; // Consider the security implications of storing passwords in session
        console.log(req.session.user.username)
        res.json(results);
      }
    );
  });
}

async function updatePassword(req, res, next) {
  let id = req.params.id;
  let user = req.body;
  
  let hashedPassword = await bcrypt.hash(user.password, 10);
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `UPDATE user SET password=? WHERE id=?`,
      [hashedPassword, id],
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
  const user = req.body;

  req.session.user = {}

  pool.getConnection(async (error, connection) => {
    if (error) {
      return next(error);
    }
    connection.query(
      `SELECT * FROM user WHERE username = ? OR email = ?`,
      [user.username, user.username],
      async (errorQuery, results) => {
        connection.release(); 
        if (errorQuery) {
          return next(errorQuery); 
        }
        
        if (results.length > 0) {
          const userData = results[0];
          console.log("Retreived password:"+userData.password)
          console.log("Passed password:"+user.password)
          const match = await bcrypt.compare(user.password, userData.password);
          if (match) {
            console.log("Login Successful");
            userData.sessionId = req.session.id; // Add sessionId field to userData
            req.session.user = userData;
            res.status(200).json({ msg: "Login Successful", data: userData });
          } else {
            console.log("Password does not match");
            res.status(401).json({ msg: "Login Failed" });
          }
        } else {
          console.log("No user found with that username/email");
          res.status(404).json({ msg: "No user found" });
        }
      }
    );
  });
}

async function loginGoogle(req, res, next) {

}

async function getLogin(req, res, next) {
  if (req.session.user?.email) {
    res.json(req.session.user);
  } else {
      usuariIndividual = { email: "" };
      res.json(usuariIndividual);
  }
}

async function logout(req, res, next) {
  const sessionId = req.session.id;
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar la sesión:', err);
            res.status(500).json({ message: 'Error al cerrar la sesión' });
        } else {
            res.clearCookie('connect.sid'); // Elimina la cookie de sesión
            res.status(200).send();
        }
    });
}

async function regeneratePwd(req, res, next) {
  try {
      //console.log(req.body);
      if (req.session.user.password == req.body.lastPassword) {
          const response = await new Promise((resolve, reject) => {
              pool.getConnection((error, connection) => {
                if(error) {
                  reject(error);
                  return;
                }
                connection.query("UPDATE user SET password = ? WHERE id = ?", [req.body.newPassword, req.session.user.id], (errorQuery, results) => {
                  connection.release();
                  if(errorQuery) {
                    reject(errorQuery);
                  } else {
                    req.session.user.password = req.body.newPassword;
                    resolve(results);
                  }
                })
          });
          req.session.user.contrasena = req.body.contrasenyaNueva;
          //console.log("login contrasenya cambiada", req.session.user);
          res.json(response); // Envía la respuesta si la comparación de contraseñas es correcta   funcio
        });
      } else {
          res.status(500).json({ error: 'La contraseña antigua no coincide' });
      }

  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
  }
}
async function downloadImage(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ error: 'Por favor, selecciona una imagen.' });
  }
  const uploadedFile = req.file;

  const fileName = uploadedFile.originalName;
  const uniqueFileName = uuidv4() + path.extname(fileName);

  const uploadPath = path.join(__dirname, '../public/avatars', uniqueFileName+".jpg");
  fs.rename(uploadedFile.path, uploadPath, (err) => {
      if (err) {
          console.error("Error:", err);
          return res.status(500).json({ error: 'Hubo un error al subir la imagen' });
      }
      pool.getConnection((error, connection) => { 
        if (error) {
          return next(error);
        }
        connection.query(
          `UPDATE user SET image = ? WHERE id = ?`,
          [uniqueFileName+".jpg", req.session.user.id],
          (errorQuery, results) => {
            connection.release();
            if (errorQuery) {
              return next(errorQuery); 
            }
          }
        );
      })
      req.session.user.image = SERVER_URL + ":"+port+"/imagen"+uniqueFileName+".jpg";
      res.json({ image: SERVER_URL + ":"+port+"/imagen"+uniqueFileName+".jpg"});
});
}
async function isUsernameAvailable(req, res, next) {
  const username = req.params.username;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error);
    }
    connection.query(
      "SELECT * FROM user WHERE username = ?",
      [username],
      (errorQuery, results) => {
        connection.release();
        if (errorQuery) {
          return next(errorQuery);
        }
        if (results.length === 0) {
          console.log("Username disponible");
          res.json({ available: true });
        } else {
          console.log("Username no disponible");
          res.json({ available: false });
        }
      }
    );
  });
}
async function isEmailAvailable(req, res, next) {
  const email = req.params.email;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error);
    }
    connection.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      (errorQuery, results) => {
        connection.release();
        if (errorQuery) {
          return next(errorQuery);
        }
        if (results.length === 0) {
          console.log("Email disponible");
          res.json({ available: true });
        } else {
          console.log("Email no disponible");
          res.json({ available: false });
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
  loginGoogle,
  getLogin,
  logout,
  regeneratePwd,
  isUsernameAvailable,
  isEmailAvailable,
  updatePassword,
  downloadImage,
  insertUser,
  updateUser,
  deleteUser,
}
