const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT','DELETE'],
    exposedHeaders: ['set-cookie', 'ajax-redirect'],
    preflightContinue: true,
    optionsSuccessStatus: 200,
  };

  module.exports = corsOptions;