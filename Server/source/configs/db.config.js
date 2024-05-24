require('dotenv').config();

const env = process.env;
const db = {
    connectionLimit: 100, // Número máximo de conexiones en el pool
    host: 'dam.inspedralbes.cat',
    user: 'a22osczapmar_User1234',
    password: 'User1234',
    database: 'a22osczapmar_puzzleGame'
}


module.exports = db;