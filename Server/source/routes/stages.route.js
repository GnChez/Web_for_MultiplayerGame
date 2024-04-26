const express = require('express');
const router = express.Router();
const stagesController = require('../controllers/stages.controller.js');


router.get('/getStages',stagesController.getStages);
router.get('/getStageById/:id',stagesController.getStageById);
router.get('/getStageRooms/:id',stagesController.getStageRooms);
router.post('/createStage',stagesController.createStage);
router.post('/updateStage/:id',stagesController.updateStage);
router.post('/playStage/:id',stagesController.playStage);  
router.post('/completeStage/:id',stagesController.completeStage); 
router.delete('/deleteStage/:id',stagesController.deleteStage);






module.exports = router;