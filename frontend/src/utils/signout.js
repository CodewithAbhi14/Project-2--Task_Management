// src/utils/signout.js
export const signout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Redirect to the login page
    window.location.href = '/';  // Or use navigate('/'), if using react-router-dom
  };
  