import React, { useState, useEffect, useContext } from "react";
import axios from "../services/api";
import { ThemeContext } from "../context/ThemeContext";


const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [profile, setProfile] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });
  const {theme}= useContext(ThemeContext)


  // Fetch tasks and users
  useEffect(() => {  
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      // Fetch tasks
      const tasksRes = await axios.get("/api/tasks/all_task", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasksRes.data);

      // Fetch users
      const usersRes = await axios.get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(usersRes.data);

      const res = await axios.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/tasks/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task deleted successfully");
      setTasks(tasks.filter((task) => task._id !== taskId)); // Update state
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response?.data?.message || error.message
      );
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/tasks/update/${taskId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Task updated successfully");
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error(
        "Error updating task status:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Create a new task
  const createTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("/api/tasks/create", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task created successfully");
      // Refresh tasks without reloading
      setTasks((prevTasks) => [...prevTasks, newTask]);     
      setNewTask({ title: "", description: "", assignedTo: "" }); // Reset form
      fetchData()
    } catch (error) {
      console.error(
        "Task Creation Error:",
        error.response?.data?.message || error.message
      );
      setError(
        error.response?.data?.message || "Error creating task. Try again."
      );
    }
  };

  if (loading) return <div>Loading...</div>; // Loading indicator

  return (
    <div className="p-10 pt-20 min-h-[100vh]">
      <h1 className="text-2xl mb-4 text-center">
        Welcome {profile.name}{" "}
        <span className="font-extralight text-sm">
          ({localStorage.getItem("role") === "admin" ? "admin" : "user"})
        </span>{" "}
        to your dashboard
      </h1>
      <hr className="border-slate-500 pb-5" />
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      {/* Error Message */}
      <div className="flex w-100 justify-between align-middle">
      <div>
          {/* Display tasks */}
          <ul>
            {tasks.map((task) => (
              <li key={task._id} className="border-b py-4">
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p>Assigned to: {task.assignedTo?.name || "N/A"}</p>
                <p>Status: {task.status}</p>
                <div className="flex space-x-2">
                  {/* Update Status Buttons */}
                  <button
                    className="btn btn-sm bg-green-500 text-white"
                    onClick={() => updateTaskStatus(task._id, "completed")}
                  >
                    Mark as Completed
                  </button>
                  <button
                    className="btn btn-sm bg-yellow-500 text-white"
                    onClick={() => updateTaskStatus(task._id, "pending")}
                  >
                    Mark as Pending
                  </button>
                  {/* Delete Task Button */}
                  <button
                    className="btn btn-sm bg-red-500 text-white"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {/* Form to create a new task */}
          <form onSubmit={createTask} className="mb-6">
            <h2 className="font-bold text-center w-100 mb-5">Create New Task</h2>
            <input
              type="text"
              placeholder="Title"
              className={`input mb-4 ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`}
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description"
              className={`input mb-4 ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`}
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              required
            />

            {/* Dropdown to select user */}
            <select
              className={`input mb-4 ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`}
              value={newTask.assignedTo}
              onChange={(e) =>
                setNewTask({ ...newTask, assignedTo: e.target.value })
              }
              required
            >
              <option value="">Assign to...</option>
              {users.length > 0 ? (
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))
              ) : (
                <option disabled>No users available</option>
              )}
            </select>

            <button type="submit" className="btn w-full">
              Create Task
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
