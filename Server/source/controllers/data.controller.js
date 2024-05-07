const fs = require('fs')
const path = require('path')

function downloadGame(req, res, next) {
    const ruta = path.join(__dirname, '../../game/Robot Escape.exe')
    res.download(ruta, function (err) {
        if (err) {
            console.log(err);
        }
    })
}
module.exports = {downloadGame}