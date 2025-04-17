const express = require('express');
const userController = require('../controller/auth-controller');
const authMiddleware=require('../middleware/authmiddleware')
const router = express.Router();

// Route to get all users
router.post('/signup',userController.signUp)
router.post('/login',userController.login)
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/refresh-token', userController.refreshAccessToken);
router.post('/forgotpassword', userController.forgotPassword);
router.post('/verifyotp', userController.verifyOtp);
router.post('/resetpassword', userController.resetPassword);


module.exports = router;