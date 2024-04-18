const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/rooms.controller.js');


router.get('/getRooms',roomsController.getRooms);
router.get('/getRoomsById/:id',roomsController.getRoomById);
router.post('/createRoom',roomsController.createRoom);
router.post('/updateRoom/:id',roomsController.updateRoom);
router.delete('/deleteRoom/:id',roomsController.deleteRoom);






module.exports = router;