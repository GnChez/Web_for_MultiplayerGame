const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller.js');


router.get('/getGame',dataController.downloadGame);
router.get('/getPersonalStatsData/:id',dataController.getPersonalStatsData);






module.exports = router;