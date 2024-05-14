const mysql = require("mysql2");
const dbConfig = require("../configs/db.config.js");
const { getStageFromId } = require("../controllers/stages.controller.js");
const { getMatchFromId } = require("../controllers/match.controller.js");

const pool = mysql.createPool({
  connectionLimit: 100, // Número máximo de conexiones en el pool
  host: "dam.inspedralbes.cat",
  user: "a22osczapmar_User1234",
  password: "User1234",
  database: "a22osczapmar_puzzleGame",
});

async function getMatchStageData(req, res, next) {
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query("SELECT * FROM MATCH_STAGE", (errorQuery, results) => {
      connection.release(); // Always release connection whether there's an error or not
      if (errorQuery) {
        return next(errorQuery); // Send the error to the next error-handling middleware
      }
      res.json(results); // Send the results back to the client as JSON
    });
  });
}
async function getMatchStageDataByMatchId(req, res, next) {
  const matchId = req.params.id;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      "SELECT * FROM MATCH_STAGE WHERE id_match = ?",
      [matchId],
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
async function getMatchStageDataByStageId(req, res, next) {
  const stageId = req.params.id;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      "SELECT * FROM MATCH_STAGE WHERE id_stage = ?",
      [stageId],
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

async function enterStage(req, res, next) {
  let data = req.body;
  try {
    const match = await getMatchFromId(data.id_match);
    const stage = await getStageFromId(data.id_stage);
    if (match.length == 0 || stage.length == 0) {
      return res
        .status(404)
        .json({ message: "One or both foreign keys don't exist" });
    }
    pool.getConnection((error, connection) => {
      if (error) {
        return next(error); 
      }

      connection.query(
        `INSERT INTO MATCH_STAGE (id_match, id_stage) VALUES (?, ?)`,
        [data.id_match, data.id_stage],
        (errorQuery, results) => {
          connection.release();
          if (errorQuery) {
            return next(errorQuery);
          }
          res.json(results); 
        }
      );
    });
  } catch (error) {
    next(error);
  }
}

async function endStage(req, res, next) {
  let data = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `UPDATE MATCH_STAGE SET time=? WHERE (id_match=? AND id_stage=?)`,
      [data.time, data.id_match, data.id_stage],
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

async function deleteStageMatch(req, res, next) {
  let data = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `DELETE FROM MATCH_STAGE WHERE (id_match=? AND id_stage=?)`,
      [data.id_match, data.id_stage],
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

module.exports = {
  getMatchStageData,
  getMatchStageDataByMatchId,
  getMatchStageDataByStageId,
  enterStage,
  endStage,
  deleteStageMatch,
};
