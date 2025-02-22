const session = require('express-session');
require('dotenv').config();
const sessionMiddleware = session({
    secret: 'mySecretKey',
    resave: true,
    name: "puzzleGame",
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false,
        domain: process.env.DOMAIN || "localhost",
        path: "/",
        maxAge: 3600000,
        sameSite: 'lax'
    }
});
module.exports = sessionMiddleware;