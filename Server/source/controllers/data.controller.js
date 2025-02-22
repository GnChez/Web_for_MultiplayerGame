const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 100, // Número máximo de conexiones en el pool
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function downloadGame(req, res, next) {
  const ruta = path.join(__dirname, "../../game/Robot Escape.txt");
  console.log(ruta);  
  res.download(ruta, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function getPersonalStatsData(req, res, next) {
  const userId = req.params.id;
    pool.getConnection((error, connection) => {
      if (error) {
        return next(error);
      }
      const personalData = {};
      connection.query(
        `SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(M.time))) as timePlayed, COUNT(M.id) as matchs_registered FROM \`MATCH\` M WHERE M.id_host = ? OR M.id_client = ?`,
        [userId, userId],
        (errorQuery, results) => {
          
          if (errorQuery) {
            connection.release();
            return next(errorQuery);
          } else {
            console.log(results[0])
            if (results[0].matchs_registered > 0) {
              const timeParts = results[0].timePlayed.split(":");
              const hours = parseInt(timeParts[0], 10);
              const minutes = parseInt(timeParts[1], 10);
              const seconds = parseInt(timeParts[2], 10);
              const totalSeconds = hours * 3600 + minutes * 60 + seconds;
              personalData.timePlayed = totalSeconds;
              personalData.matchs_registered = results[0].matchs_registered;
            }
            else {
              personalData.timePlayed = 0;
              personalData.matchs_registered = 0;
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
          if (errorQuery) {
            connection.release();
            return next(errorQuery);
          } else {
            console.log('userId:', userId);
            console.log(results[0])
            if (results[0] != null) {
              if (results[0].gamesPlayed > 0) {
                personalData.frequentPartner = results[0].frequentPartner;
              }
            }
            else {
              personalData.frequentPartner = "Undefined";
            }
          }
        }
      );
      connection.query(
        `SELECT MIN(M.time) as bestTime, COUNT(*) as timesPlayed 
         FROM \`MATCH\` M 
         WHERE M.id_host = ? OR M.id_client = ?`,
        [userId, userId],
        (errorQuery, results) => {
          connection.release();
          if (errorQuery) {
            return next(errorQuery);
          } else {
            if (results[0].timesPlayed > 0) {
              personalData.bestTime = results[0].bestTime;
            }
            else {
              personalData.bestTime = "Undefined";
            
            }
            console.log(personalData);
            res.json(personalData);
          }
        }
      );
    });
  
}
module.exports = { downloadGame, getPersonalStatsData };
