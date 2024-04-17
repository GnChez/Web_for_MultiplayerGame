const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller.js');


router.get('/getUsers',userController.getUsers);
router.get('/getUserById',userController.getUserById);
router.get('/getUsernames',userController.getUsernames);
router.post('/registerUser',userController.insertUser);
router.put('/updateUser/:id',userController.updateUser);
router.delete('/deleteUser/:id',userController.deleteUser);





module.exports = router;