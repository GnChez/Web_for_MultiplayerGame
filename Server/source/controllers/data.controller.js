const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 100, // Número máximo de conexiones en el pool
  host: "dam.inspedralbes.cat",
  user: "a22osczapmar_User1234",
  password: "User1234",
  database: "a22osczapmar_puzzleGame",
});

function downloadGame(req, res, next) {
  const ruta = path.join(__dirname, "../../game/Robot Escape.exe");
  res.download(ruta, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function getPersonalStatsData(req, res, next) {
  const userId = req.params.id;
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
        return;
      }
      const personalData = {};
      connection.query(
        `SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(M.time))) as timePlayed, COUNT(M.id) as matchs_registered FROM \`MATCH\` M WHERE M.id_host = ? OR M.id_client = ?`,
        [userId, userId],
        (errorQuery, results) => {
          connection.release();
          if (errorQuery) {
            reject(errorQuery);
          } else {
            {
              const timeParts = results[0].timePlayed.split(":");
              const hours = parseInt(timeParts[0], 10);
              const minutes = parseInt(timeParts[1], 10);
              const seconds = parseInt(timeParts[2], 10);
              const totalSeconds = hours * 3600 + minutes * 60 + seconds;
              personalData.timePlayed = totalSeconds;
              personalData.matchs_registered = results[0].matchs_registered;
            }
          }
        }
      );
      connection.query(
        `SELECT U.username as frequentPartner, COUNT(*) as gamesPlayed 
        FROM \`MATCH\` M 
        JOIN user U ON (M.id_client = U.id AND M.id_host = ?) OR (M.id_host = U.id AND M.id_client = ?)
        GROUP BY U.username 
        ORDER BY gamesPlayed DESC 
        LIMIT 1`,
        [userId, userId],
        (errorQuery, results) => {
          connection.release();
          if (errorQuery) {
            reject(errorQuery);
          } else {
            personalData.frequentPartner = results[0].frequentPartner;
          }
        }
      );
      connection.query(
        `SELECT MIN(M.time) as bestTime 
         FROM \`MATCH\` M 
         WHERE M.id_host = ? OR M.id_client = ?`,
        [userId, userId],
        (errorQuery, results) => {
          connection.release();
          if (errorQuery) {
            reject(errorQuery);
          } else {
            personalData.bestTime = results[0].bestTime;
            console.log(personalData);
            res.json(personalData);
            resolve(personalData);
          }
        }
      );
    });
  });
}
module.exports = { downloadGame, getPersonalStatsData };
