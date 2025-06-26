const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {protect}=require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/verify/:token', authController.verifyEmail);
router.get('/me', protect, (req, res) => {
  res.send({
    id: req.user._id,
    email:req.user.email,
    name: req.user.name,
    role: req.user.role,

  });
});


module.exports = router;

