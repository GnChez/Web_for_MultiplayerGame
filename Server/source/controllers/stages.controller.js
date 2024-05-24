const mysql = require("mysql2");
const dbConfig = require("../configs/db.config.js");

const pool = mysql.createPool({
  connectionLimit: 100, // Número máximo de conexiones en el pool
  host: "dam.inspedralbes.cat",
  user: "a22osczapmar_User1234",
  password: "User1234",
  database: "a22osczapmar_puzzleGame",
});

async function getStages(req, res, next) {
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query("SELECT * FROM STAGE", (errorQuery, results) => {
      connection.release(); // Always release connection whether there's an error or not
      if (errorQuery) {
        return next(errorQuery); // Send the error to the next error-handling middleware
      }
      res.json(results); // Send the results back to the client as JSON
    });
  });
}
async function getStageById(req, res, next) {
  const stageId = req.params.id;
  try {
    const results = await getStageFromId(stageId);
    if (results.length === 0) {
      res.status(404).send({ msg: "Stage not found" });
    } else {
      res.json(results[0]); // Assuming 'id' is unique, there should only be one result
    }
  } catch (error) {
    next(error); // Pass any errors to the Express error-handling middleware
  }
}
async function getStageByName(req, res, next) {
  const stageName = req.params.name;
  try {
    const results = await getStageFromName(stageName);
    if (results.length === 0) {
      res.status(404).send({ msg: "Stage not found" });
    } else {
      res.json(results[0]); // Assuming 'id' is unique, there should only be one result
    }
  } catch (error) {
    next(error); // Pass any errors to the Express error-handling middleware
  }
}

async function createStage(req, res, next) {
  let stage = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      "INSERT INTO STAGE (`name`, `order`, `times_played`, `times_completed`) VALUES (?,?,0,0)",
      [stage.name, stage.order],
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
async function playStage(req, res, next) {
  let stageId = req.body.id_stage
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `UPDATE STAGE SET times_played=times_played+1 WHERE id=?`,
      stageId,
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
async function completeStage(req, res, next) {
  let stageId = req.body.id_stage;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `UPDATE STAGE SET times_completed=times_completed+1 WHERE id=?`,
      stageId,
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

async function updateStage(req, res, next) {
  const id = parseInt(req.params.id); // Ensure 'id' is an integer
  const { name, order } = req.body; // Destructure for easier access

  // Input validation
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid stage ID" });
  }

  if (typeof name !== "string" || typeof order !== "number") {
    return res.status(400).json({ error: "Invalid input data types" });
  }

  // Ensure 'name' and 'order' are not empty if required
  if (!name.trim() || order == null) {
    return res.status(400).json({ error: "Missing name or order" });
  }

  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    const query = "UPDATE STAGE SET name = ?, `order` = ? WHERE id = ?";
    connection.query(query, [name, order, id], (errorQuery, results) => {
      connection.release(); // Always release connection whether there's an error or not
      if (errorQuery) {
        return next(errorQuery); // Send the error to the next error-handling middleware
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "No record found with that ID" });
      }
      res.json({
        success: true,
        message: "Stage updated successfully",
        results,
      });
    });
  });
}

async function deleteStage(req, res, next) {
  let id = req.params.id;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `DELETE FROM STAGE WHERE id=?`,
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

/* GENERAL FUNCTIONS */

async function getStageFromId(id) {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error); // Reject the promise with the error
        return;
      }
      connection.query(
        "SELECT * FROM STAGE WHERE id = ?",
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
async function getStageFromName(name) {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error); // Reject the promise with the error
        return;
      }
      connection.query(
        "SELECT * FROM STAGE WHERE name = ?",
        [name],
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
async function getStageRooms(req, res, next) {
  const stageId = req.params.id;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); 
    }
    connection.query(
      "SELECT * FROM ROOM WHERE id_phase = ?",
      [stageId],
      (errorQuery, results) => {
        connection.release(); // Always release connection whether there's an error or not
        if (errorQuery) {
          return next(errorQuery); // Reject the promise with the query error
        } else {
          res.json(results); // Resolve the promise with the query results
        }
      }
    );
  });
}

async function getStageFromId(id) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
          if (error) {
            reject(error); // Reject the promise with the error
            return;
          }
          connection.query(
            "SELECT * FROM STAGE WHERE id = ?",
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
  getStages,
  getStageById,
  getStageByName,
  createStage,
  updateStage,
  completeStage,
  playStage,
  deleteStage,
  getStageRooms,
  getStageFromId
};
