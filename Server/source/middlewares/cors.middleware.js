const corsOptions = {
    origin: ["http://robot-escape.dam.inspedralbes.cat", "http://localhost:3666", "http://robot-escape.dam.inspedralbes.cat:3666", "http://localhost:3000"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT','DELETE'],
    exposedHeaders: ['set-cookie', 'ajax-redirect'],
    preflightContinue: true,
    optionsSuccessStatus: 200,
  };

  module.exports = corsOptions;