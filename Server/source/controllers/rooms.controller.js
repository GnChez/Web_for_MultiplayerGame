const mysql = require("mysql2");
const dbConfig = require("../configs/db.config.js");

const pool = mysql.createPool({
  connectionLimit: 100, // Número máximo de conexiones en el pool
  host: "dam.inspedralbes.cat",
  user: "a22osczapmar_User1234",
  password: "User1234",
  database: "a22osczapmar_puzzleGame",
});

async function getRooms(req, res, next) {
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query("SELECT * FROM ROOM", (errorQuery, results) => {
      connection.release(); // Always release connection whether there's an error or not
      if (errorQuery) {
        return next(errorQuery); // Send the error to the next error-handling middleware
      }
      res.json(results); // Send the results back to the client as JSON
    });
  });
}
async function getRoomById(req, res, next) {
    roomId = req.params.id;
    pool.getConnection((error, connection) => {
      if (error) {
        return next(error); // Handle the error in an Express error-handling middleware
      }
      connection.query("SELECT * FROM ROOM WHERE id = ?", roomId, (errorQuery, results) => {
        connection.release(); // Always release connection whether there's an error or not
        if (errorQuery) {
          return next(errorQuery); // Send the error to the next error-handling middleware
        }
        res.json(results); // Send the results back to the client as JSON
      });
    });
  }

  async function getRoomByName(req, res, next) {
    roomName = req.params.name;
    pool.getConnection((error, connection) => {
      if (error) {
        return next(error); // Handle the error in an Express error-handling middleware
      }
      connection.query("SELECT * FROM ROOM WHERE name = ?", roomName, (errorQuery, results) => {
        connection.release(); // Always release connection whether there's an error or not
        if (errorQuery) {
          return next(errorQuery); // Send the error to the next error-handling middleware
        }
        res.json(results); // Send the results back to the client as JSON
      });
    });
  }

  async function getRoomsByStage(req, res, next) {
    stageId = req.params.stageId;
    pool.getConnection((error, connection) => {
      if (error) {
        return next(error); // Handle the error in an Express error-handling middleware
      }
      connection.query("SELECT * FROM ROOM WHERE id_stage = ?", stageId, (errorQuery, results) => {
        connection.release(); // Always release connection whether there's an error or not
        if (errorQuery) {
          return next(errorQuery); // Send the error to the next error-handling middleware
        }
        res.json(results); // Send the results back to the client as JSON
      });
    });
  }

async function createRoom(req, res, next) {
  let room = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      "INSERT INTO ROOM (`name`, `id_phase`) VALUES (?,?)",
      [room.name, room.id_phase],
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
async function updateRoom(req, res, next) {
  let roomId = req.params.id;
  let room = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      "UPDATE ROOM SET name=?,  `order`=? WHERE id=?",
      [room.name, room.id_phase, roomId],
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

async function deleteRoom(req, res, next) {
  let id = req.params.id;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `DELETE FROM ROOM WHERE id=?`,
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

module.exports = {
  getRooms,
  getRoomById,
  getRoomByName,
  getRoomsByStage,
  createRoom,
  updateRoom,
  deleteRoom,
};
