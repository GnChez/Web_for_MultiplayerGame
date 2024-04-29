const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller.js');

const multer = require('multer');
const upload = multer({ dest: 'public/avatars/' });

router.get('/getUsers',userController.getUsers);
router.get('/getUserById/:id',userController.getUserById);
router.get('/getUsernames',userController.getUsernames);
router.get('/getLogin', userController.getLogin);
router.post('/login',userController.login); 
router.post('/loginGoogle',userController.loginGoogle);   
router.get('/logout',userController.logout);
router.post('/regeneratePassword',userController.regeneratePwd); 
router.post('/downloadImage',userController.downloadImage, upload.single('file')); 
router.post('/registerUser',userController.insertUser);
router.post('/updateUser/:id',userController.updateUser);
router.delete('/deleteUser/:id',userController.deleteUser);





module.exports = router;