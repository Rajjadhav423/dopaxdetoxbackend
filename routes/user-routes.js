const express = require('express');
const userController = require('../controller/auth-controller');
const authMiddleware=require('../middleware/authmiddleware')
const router = express.Router();

// Route to get all users
router.post('/signup',userController.signUp)
router.post('/login',userController.login)
router.get('/profile', authMiddleware, (req, res) => {
  return res.status(200).json({
    message: 'User profile fetched successfully',
    user: req.user
  });
});

module.exports = router;

module.exports = router;