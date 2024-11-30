// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
  getAllTask
} = require('../controllers/taskController');
const { authenticateUser, isAdmin } = require('../middleware/authMiddleware');

router.post('/create', authenticateUser, isAdmin, createTask); // Only admins can create tasks
router.get('/all', authenticateUser, getTasks); // Any authenticated user can view tasks
router.put('/update/:id', authenticateUser, updateTaskStatus); // Only admins can update tasks
router.delete('/delete/:id', authenticateUser, isAdmin, deleteTask); // Only admins can delete tasks
router.get('/all_task', authenticateUser, isAdmin, getAllTask);

module.exports = router;