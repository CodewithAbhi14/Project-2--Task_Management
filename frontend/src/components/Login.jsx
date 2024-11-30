import React, { useState, useContext } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import { ThemeContext } from "../context/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const { setIsLoggedIn } = useContext(AuthContext); 
  const {theme}= useContext(ThemeContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", { email, password });
      const { token, role } = res.data;

      console.log("Role:", role);
      console.log("Token:", token);

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Update global auth state
      setIsLoggedIn(true);

      // Role-based redirection
      if (role === "admin") {
        navigate("/admin"); // Ensure this route exists
      } else {
        navigate("/dashboard"); // Ensure this route exists
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || "Unknown error");
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <>
    <div className="h-[100vh] flex items-center justify-center">
  <div className="relative">
    <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
    <div id="form-container" className={`${theme === 'dark' ? 'bg-gradient-to-tl from-zinc-700 to-zinc-900 text-white' : 'bg-gradient-to-tl from-zinc-200 to-zinc-400'} p-16 rounded-lg shadow-2xl w-80 relative z-10 `}>
      <h2 id="form-title" className="text-center text-3xl font-bold mb-10">Login</h2>
      <form className="space-y-5" onSubmit={handleLogin}>
        <input className={`w-full h-12 border border-gray-800 px-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`} placeholder="Email" id="" name="" type="text" onChange={(e) => setEmail(e.target.value)}
        value={email} />
        <input className={`w-full h-12 border border-gray-800 px-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`}  placeholder="Password" id="" name="" type="password"  onChange={(e) => setPassword(e.target.value)}
        value={password}/>
        <button className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign in</button>
        <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign up here
        </Link>
      </p>
      </form>
    </div>
  </div>
</div>
    </>
  );
};

export default Login;
