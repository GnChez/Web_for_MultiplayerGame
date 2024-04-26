const express = require('express');
const router = express.Router();
const match_stageController = require('../controllers/match_stage.controller.js');


router.get('/getMatchStageData',match_stageController.getMatchStageData);
router.get('/getMatchStageDataByMatchId/:id',match_stageController.getMatchStageDataByMatchId);
router.get('/getMatchStageDataByStageId/:id',match_stageController.getMatchStageDataByStageId);
router.post('/enterStage',match_stageController.enterStage);
router.post('/endStage',match_stageController.endStage);  
router.delete('/deleteMatchStageData',match_stageController.deleteStageMatch);





module.exports = router;