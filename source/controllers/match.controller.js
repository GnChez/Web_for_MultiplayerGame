
const mysql = require('mysql2');
const dbConfig = require('../configs/db.config.js');
const { getUserFromId } = require('../controllers/users.controller.js');

const pool = mysql.createPool({
    connectionLimit: 100, // Número máximo de conexiones en el pool
    host: 'dam.inspedralbes.cat',
    user: 'a22osczapmar_User1234',
    password: 'User1234',
    database: 'a22osczapmar_puzzleGame'
})

async function getMatches(req, res, next) {
    pool.getConnection((error, connection) => {
        if (error) {
            return next(error); // Handle the error in an Express error-handling middleware
        }
        connection.query("SELECT * FROM \`MATCH\`", (errorQuery, results) => {
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
    console.log(matchId);
    pool.getConnection((error, connection) => {
        if (error) {
            return next(error); // Handle the error in an Express error-handling middleware
        }
        connection.query("SELECT * FROM \`MATCH\` WHERE id = ?", [matchId], (errorQuery, results) => {
            connection.release(); // Always release connection whether there's an error or not
            if (errorQuery) {
                return next(errorQuery); // Send the error to the next error-handling middleware
            }
            res.json(results); // Send the results back to the client as JSON
        });
    });
  }
  
async function startMatch(req, res, next) {
    let match = req.body;
    let matchStartTime = new Date();
    matchStartTime.setHours(matchStartTime.getHours() + 2);
    let formattedDate = matchStartTime.toISOString().slice(0, 19).replace('T', ' ');

    try {
        const hostUser = await getUserFromId(match.id_host);
        const clientUser = await getUserFromId(match.id_client);
        console.log('hostUser: ', hostUser,", clientUser: ", clientUser)
        if (hostUser.length == 0 || clientUser.length == 0) {
            return res.status(404).json({ message: 'One or both users do not exist' });
        }
        const repeatedPlayer = await getRepeatedPlayerInStartedMatch(match.id_host);
        const repeatedPlayer2 = await getRepeatedPlayerInStartedMatch(match.id_client);
        if (repeatedPlayer2.length > 0 || repeatedPlayer.length > 0) {
            return res.status(400).json({ message: 'One or both users are already in a match' });
        }

        pool.getConnection((error, connection) => {
            if (error) {
                return next(error); // Handle the error in an Express error-handling middleware
            }
            
            connection.query(`INSERT INTO \`MATCH\` (start_time, id_host, id_client) VALUES (?, ?, ?)`,
            [formattedDate, match.id_host, match.id_client], (errorQuery, results) => {
                connection.release(); // Always release connection whether there's an error or not
                if (errorQuery) {
                    return next(errorQuery); // Send the error to the next error-handling middleware
                }
                res.json(results); // Send the results back to the client as JSON
            });
        });
    } catch (error) {
        next(error);
    }
}
  
  async function endMatch(req, res, next) {
    let id = req.params.id;
    let matchEndTime = new Date();
    matchEndTime.setHours(matchEndTime.getHours() + 2);
    let formattedDate = matchEndTime.toISOString().slice(0, 19).replace('T', ' ');
    pool.getConnection((error, connection) => {
        if (error) {
            return next(error); // Handle the error in an Express error-handling middleware
        }
        connection.query(`UPDATE \`MATCH\` SET end_time=? WHERE id=?`, [formattedDate, id], (errorQuery, results) => {
            connection.release(); // Always release connection whether there's an error or not
            if (errorQuery) {
                return next(errorQuery); // Send the error to the next error-handling middleware
            }
            res.json(results); // Send the results back to the client as JSON
        });
    });
  }
  
  async function deleteMatch(req, res, next) {
    let id = req.params.id;
    pool.getConnection((error, connection) => {
        if (error) {
            return next(error); // Handle the error in an Express error-handling middleware
        }
        connection.query(`DELETE FROM \`MATCH\` WHERE id=?`, id, (errorQuery, results) => {
            connection.release(); // Always release connection whether there's an error or not
            if (errorQuery) {
                return next(errorQuery); // Send the error to the next error-handling middleware
            }
            res.json(results); // Send the results back to the client as JSON
        });
    });
  }
 
  async function getRepeatedPlayerInStartedMatch(id) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                reject(error);  // Reject the promise with the error
                return;
            }
            connection.query("SELECT * FROM `MATCH` WHERE (id_host = ? OR id_client = ?) AND end_time IS NULL", [id, id], (errorQuery, results) => {
                connection.release(); // Always release the connection, whether there's an error or not
                if (errorQuery) {
                    reject(errorQuery); // Reject the promise with the query error
                } else {
                    resolve(results); // Resolve the promise with the query results
                }
            });
        });
    });
}

  
  module.exports = {
    getMatches,
    getMatchById,
    startMatch,
    endMatch,
    deleteMatch
  };