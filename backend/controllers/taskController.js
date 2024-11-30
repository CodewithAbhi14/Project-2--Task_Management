const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const task = new Task({ title, description, assignedTo });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};


//get all tasks for admin
exports.getAllTask = async (req, res) => {
  try {
    // Fetch all tasks along with the assigned user's details
    const tasks = await Task.find().populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'completed' or 'pending'
  try {
    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task status updated', task });
  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};