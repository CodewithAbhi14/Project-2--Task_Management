import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [profile, setProfile] = useState([]);

  // Fetch tasks assigned to the user
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/tasks/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.filter(task => task.assignedTo?._id === res.data.userId));
      console.log('User tasks:', res.data);
      
      const rest = await axios.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(rest.data);
    };
    fetchTasks();
  }, []);

  // Mark task as complete
  const completeTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/tasks/update/${taskId}`, { status: 'completed' }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Task marked as complete');
      window.location.reload(); // Refresh tasks
    } catch (error) {
      alert('Error updating task');
    }
  };

  return (
    <div className="p-6 pt-20 min-h-[100vh]">
        <h1 className="text-2xl mb-4 text-center">
        Welcome {profile.name}{" "}
        <span className="font-extralight text-sm">
          ({localStorage.getItem("role") === "admin" ? "admin" : "user"})
        </span>{" "}
        to your dashboard
      </h1>
      <hr className="border-slate-500 pb-5" />
      <h1 className="text-2xl mb-4">Your Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="border-b py-2 flex justify-between">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description} <span className='text-xs text-slate-400'>({task.status === 'completed' ? 'Completed' : "In Progress"})</span></p>
            </div>
            {task.status !== 'completed' && (
              <button onClick={() => completeTask(task._id)} className="btn">Mark Complete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;