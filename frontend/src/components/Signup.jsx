import React, { useState, useContext } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ThemeContext } from "../context/ThemeContext";


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const navigate = useNavigate();
  const {theme}= useContext(ThemeContext)


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', { name, email, password, role });
      alert('Signup successful! Please log in.');
      navigate('/'); // Redirect to login
    } catch (error) {
      console.error('Signup Error:', error.response.data.message);
      alert('Error: ' + (error.response.data.message || 'Signup failed'));
    }
  };

  return (
    <div>
    <div className="h-[100vh] flex items-center justify-center">
  <div className="relative">
    <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
    <div id="form-container" className={`${theme === 'dark' ? 'bg-gradient-to-tl from-zinc-700 to-zinc-900 text-white' : 'bg-gradient-to-tl from-zinc-200 to-zinc-400'} p-16 rounded-lg shadow-2xl w-80 relative z-10 `}>
      <h2 id="form-title" className="text-center text-3xl font-bold mb-10">Sign Up</h2>
      <form className="space-y-5" onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="Name"
        className={`w-full h-12 border border-gray-800 px-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`} 
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className={`w-full h-12 border border-gray-800 px-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`} 
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className={`w-full h-12 border border-gray-800 px-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`} 
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Role Selection Dropdown */}
      <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className={`w-full h-12 border border-gray-800 px-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`} 
  required
>
  <option value="" disabled>Select Role</option> {/* Placeholder */}
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select>
        <button className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
        <p className="text-center mt-4">
        Already a user? <Link to="/" className="text-blue-500">Login here</Link>
      </p>
      </form>
    </div>
  </div>
</div>
    </div>
  );
};

export default Signup;