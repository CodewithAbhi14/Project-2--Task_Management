const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, getUserProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/profile', authenticateUser, getUserProfile);


module.exports = router;