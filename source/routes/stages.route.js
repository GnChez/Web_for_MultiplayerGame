const express = require('express');
const router = express.Router();
const stagesController = require('../controllers/stages.controller.js');


router.get('/getStages',stagesController.getStages);
router.get('/getStageById/:id',stagesController.getStageById);
router.post('/createStage',stagesController.createStage);
router.put('/updateStage/:id',stagesController.updateStage);
router.put('/playStage/:id',stagesController.playStage);  
router.put('/completeStage/:id',stagesController.completeStage); 
router.delete('/deleteStage/:id',stagesController.deleteStage);





module.exports = router;