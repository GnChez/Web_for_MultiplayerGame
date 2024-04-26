const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller.js');


router.get('/getMatches',matchController.getMatches);
router.get('/getMatchById/:id',matchController.getMatchById);
router.post('/startMatch',matchController.startMatch);
router.post('/endMatch/:id',matchController.endMatch);  
router.delete('/deleteMatch/:id',matchController.deleteMatch);





module.exports = router;