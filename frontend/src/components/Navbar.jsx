import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signout } from "../utils/signout";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Authentication context
  const { theme, toggleTheme } = useContext(ThemeContext);        // Theme context
  const location = useLocation(); // Get the current page location
  const navigate = useNavigate(); // For navigation based on role

  // Handle sign-out and update context
  const handleSignOut = () => {
    signout();
    setIsLoggedIn(false);  // Update context to reflect sign-out
    localStorage.removeItem('token'); // Clear token and role from localStorage
    localStorage.removeItem('role');  // Clear role from localStorage
    navigate('/'); // Redirect to the login page
  };

  const value = localStorage.getItem('role');

   // Determine Navbar content based on location and logged-in status
  const renderNavbarContent = () => {
    if (!isLoggedIn) {
      return (
        <>
          <div className="flex space-x-6 flex-grow justify-center">
            <Link to="/" className="hover:font-bold">Sign In</Link>
            <Link to="/signup" className="hover:font-bold">Sign Up</Link>
            <Link to="/about" className="hover:font-bold">About Us</Link>
            <Link to="/contact" className="hover:font-bold">Contact</Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex space-x-6 flex-grow justify-center">
            {location.pathname === '/profile' ? (
              <>
                {/* Redirect to dashboard based on role */}
                <Link to={value === 'admin' ? '/admin' : '/dashboard'} className="hover:font-bold">Dashboard</Link>
                <Link to="/about" className="hover:font-bold">About Us</Link>
                <Link to="/contact" className="hover:font-bold">Contact</Link>
              </>
            ) : location.pathname === '/about' ? (
              <>
                <Link to="/profile" className="hover:font-bold">Profile</Link>
                <Link to={value === 'admin' ? '/admin' : '/dashboard'} className="hover:font-bold">Dashboard</Link>
                <Link to="/contact" className="hover:font-bold">Contact</Link>
              </>
            ) : location.pathname === '/contact' ? (
              <>
                <Link to="/profile" className="hover:font-bold">Profile</Link>
                <Link to="/about" className="hover:font-bold">About Us</Link>
                <Link to={value === 'admin' ? '/admin' : '/dashboard'} className="hover:font-bold">Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="hover:font-bold">Profile</Link>
                <Link to="/about" className="hover:font-bold">About Us</Link>
                <Link to="/contact" className="hover:font-bold">Contact</Link>
              </>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <nav className={`p-4 flex justify-between items-center fixed top-0 left-0 w-full rounded-b-xl border-b backdrop-blur-md  ${theme === 'dark' ? 'text-white border-slate-300' : ' text-black border-slate-600'}`}>
      {/* Left: App Name */}
      <h1 className="text-2xl font-bold">Task Manager</h1>

      {/* Center: Conditional Navbar Content */}
      {renderNavbarContent()}

      {/* Right: Sign Out & Theme Toggle */}
      <div className="flex space-x-4 items-center">
        {isLoggedIn && (
          <button onClick={handleSignOut} className="hover:font-bold">Sign Out</button>
        )}
        
        {/* Dark/Light Mode Toggle */}
        <div className="relative w-14 h-8">
          <input
            type="checkbox"
            id="themeToggle"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className="sr-only"
          />
          <label
            htmlFor="themeToggle"
            className="block bg-gray-300 rounded-full w-14 h-8 cursor-pointer relative transition-all"
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300 ${
                theme === 'dark' ? 'transform translate-x-6 bg-yellow-400' : 'transform translate-x-0 bg-white-700'
              }`}
            />
            {/* Sun and Moon Icons */}
            <span
              className={`absolute top-1/2 transform -translate-y-1/2 left-1.5 text-yellow-400 transition-opacity duration-300 ${
                theme === 'dark' ? 'opacity-0' : 'opacity-100'
              }`}
            >
              ☀️
            </span>
            <span
              className={`absolute top-1/2 transform -translate-y-1/2 right-1.5 text-gray-700 transition-opacity duration-300 ${
                theme === 'dark' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              🌙
            </span>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
