const corsOptions = {
    origin: "http://robot-escape.dam.inspedralbes.cat",
    credentials: true,
    methods: ['GET', 'POST', 'PUT','DELETE'],
    exposedHeaders: ['set-cookie', 'ajax-redirect'],
    preflightContinue: true,
    optionsSuccessStatus: 200,
  };

  module.exports = corsOptions;