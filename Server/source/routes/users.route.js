const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller.js');


router.get('/getUsers',userController.getUsers);
router.get('/getUserById/:id',userController.getUserById);
router.get('/getUsernames',userController.getUsernames);
router.post('/login',userController.login);  
router.post('/registerUser',userController.insertUser);
router.post('/updateUser/:id',userController.updateUser);
router.delete('/deleteUser/:id',userController.deleteUser);





module.exports = router;