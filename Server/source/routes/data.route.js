const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller.js');


router.get('/getGame',dataController.downloadGame);






module.exports = router;