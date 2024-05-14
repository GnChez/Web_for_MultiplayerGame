const mysql = require("mysql2");
const dbConfig = require("../configs/db.config.js");
const { getUserFromId } = require("../controllers/users.controller.js");

const pool = mysql.createPool({
  connectionLimit: 100, // Número máximo de conexiones en el pool
  host: "dam.inspedralbes.cat",
  user: "a22osczapmar_User1234",
  password: "User1234",
  database: "a22osczapmar_puzzleGame",
});

async function getMatches(req, res, next) {
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query("SELECT * FROM `MATCH`", (errorQuery, results) => {
      connection.release(); // Always release connection whether there's an error or not
      if (errorQuery) {
        return next(errorQuery); // Send the error to the next error-handling middleware
      }
      res.json(results); // Send the results back to the client as JSON
    });
  });
}
async function getMatchById(req, res, next) {
  const matchId = req.params.id;
  try {
    const results = await getMatchFromId(matchId);
    if (results.length === 0) {
      res.status(404).send({ msg: "Match not found" });
    } else {
      res.json(results[0]); // Assuming 'id' is unique, there should only be one result
    }
  } catch (error) {
    next(error); // Pass any errors to the Express error-handling middleware
  }
}

async function startMatch(req, res, next) {
  let match = req.body;
  let matchStartTime = new Date();
  matchStartTime.setHours(matchStartTime.getHours() + 2);
  let formattedDate = matchStartTime
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  try {
    const hostUser = await getUserFromId(match.id_host);
    const clientUser = await getUserFromId(match.id_client);
    console.log("hostUser: ", hostUser, ", clientUser: ", clientUser);
    if (hostUser.length == 0 || clientUser.length == 0) {
      return res
        .status(404)
        .json({ message: "One or both users do not exist" });
    }
    const repeatedPlayer = await getRepeatedPlayerInStartedMatch(match.id_host);
    const repeatedPlayer2 = await getRepeatedPlayerInStartedMatch(
      match.id_client
    );
    if (repeatedPlayer2.length > 0 || repeatedPlayer.length > 0) {
      return res
        .status(400)
        .json({ message: "One or both users are already in a match" });
    }

    pool.getConnection((error, connection) => {
      if (error) {
        return next(error); // Handle the error in an Express error-handling middleware
      }

      connection.query(
        `INSERT INTO \`MATCH\` (start_time, id_host, id_client) VALUES (?, ?, ?)`,
        [formattedDate, match.id_host, match.id_client],
        (errorQuery, results) => {
          connection.release(); // Always release connection whether there's an error or not
          if (errorQuery) {
            return next(errorQuery); // Send the error to the next error-handling middleware
          }
          res.json(results); // Send the results back to the client as JSON
        }
      );
    });
  } catch (error) {
    next(error);
  }
}

async function endMatch(req, res, next) {
  let id = req.params.id;
  let matchEndTime = new Date();
  matchEndTime.setHours(matchEndTime.getHours() + 2);
  let formattedDate = matchEndTime.toISOString().slice(0, 19).replace("T", " ");
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `UPDATE \`MATCH\` SET end_time=? WHERE id=?`,
      [formattedDate, id],
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

async function deleteMatch(req, res, next) {
  let id = req.params.id;
  pool.getConnection((error, connection) => {
    if (error) {
      return next(error); // Handle the error in an Express error-handling middleware
    }
    connection.query(
      `DELETE FROM \`MATCH\` WHERE id=?`,
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

async function getRepeatedPlayerInStartedMatch(id) {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error); // Reject the promise with the error
        return;
      }
      connection.query(
        "SELECT * FROM `MATCH` WHERE (id_host = ? OR id_client = ?) AND end_time IS NULL",
        [id, id],
        (errorQuery, results) => {
          connection.release(); // Always release the connection, whether there's an error or not
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
async function getMatchFromId(id) {
  return new Promise((resolve, reject) => {
    let parsedId = parseInt(id);
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error); // Reject the promise with the error
        return;
      }
      connection.query(
        "SELECT * FROM `MATCH` WHERE id = ?",
        [parsedId],
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

async function getTopMatches(req, res, next) {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error); // Handle connection errors
        return;
      }
      // Query to get the top 10 completed matches and their associated stages and rooms
      connection.query(
        `SELECT M.id, M.complete_date, M.time, M.id_host, U1.username as host_username, 
        M.id_client, U2.username as client_username, 
        S.id as stage_id, S.order as stage_order, S.name as stage_name, MS.time as match_stage_time, S.order as stage_order,
        R.id as room_id, MR.time as match_room_time, R.name as room_name
        FROM \`MATCH\` M 
        JOIN \`user\` U1 ON M.id_host = U1.id 
        JOIN \`user\` U2 ON M.id_client = U2.id 
        JOIN \`MATCH_STAGE\` MS ON M.id = MS.id_match
        JOIN \`STAGE\` S ON MS.id_stage = S.id
        JOIN \`MATCH_ROOM\` MR ON M.id = MR.id_match 
        JOIN \`ROOM\` R ON MR.id_room = R.id
        WHERE M.completed = 1
        ORDER BY M.time ASC, S.order ASC, R.id ASC
        LIMIT 10`,
        (errorQuery, results) => {
          connection.release(); // Always release the connection after usage
          if (errorQuery) {
            reject(errorQuery); // Handle query errors
          } else {
            const matches = results.reduce((acc, row) => {
              // Find or create the match object in the accumulator
              let match = acc.find((m) => m.id === row.id);
              if (!match) {
                match = {
                  id: row.id,
                  complete_date: row.complete_date,
                  time: row.time,
                  id_host: row.id_host,
                  host_username: row.host_username,
                  id_client: row.id_client,
                  client_username: row.client_username,
                  stages: [],
                };
                acc.push(match);
              }
              // Find or create the stage object within the match
              let stage = match.stages.find((s) => s.id === row.stage_id);
              if (!stage) {
                stage = {
                  id: row.stage_id,
                  name: row.stage_name,
                  time: row.match_stage_time,
                  rooms: [],
                };
                match.stages.push(stage);
              }
              // Append the room to the appropriate stage
              stage.rooms.push({
                id: row.room_id,
                name: row.room_name,
                order: row.stage_order,
                time: row.match_room_time,
              });
              return acc;
            }, []);
            console.log(matches); // Log the structured data for debugging
            res.json(matches); // Send the structured data as JSON response
            resolve(matches);
          }
        }
      );
    });
  });
}

module.exports = {
  getMatches,
  getMatchById,
  getTopMatches,
  startMatch,
  endMatch,
  deleteMatch,
  getMatchFromId,
};
