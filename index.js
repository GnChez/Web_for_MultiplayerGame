const express = require('express');
const http = require('http');
const sessionMiddleware = require('./source/middlewares/session.middleware.js');
const corsOptions = require('./source/middlewares/cors.middleware.js');
const usersRouter = require('./source/routes/users.route');
const matchRouter = require('./source/routes/match.route');
const stagesRouter = require('./source/routes/stages.route');
const roomsRouter = require('./source/routes/rooms.route');
const matchStageRouter = require('./source/routes/match_stage.route');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();



const app = express();
app.use(sessionMiddleware);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors(corsOptions));

const port = process.env.PORT || 3666;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  var response = {};
  response.msg = 'Server Working!';
  res.json(response);
});

app.use('/users', usersRouter);

app.use('/match', matchRouter);

app.use('/stages', stagesRouter);

app.use('/rooms', roomsRouter);

app.use('/match_stage', matchStageRouter);
