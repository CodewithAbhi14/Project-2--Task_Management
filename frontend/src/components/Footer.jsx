import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


const Footer = () => {
  const {theme} = useContext(ThemeContext);      

  return (
    <footer className={`py-4 fixed bottom-0 w-full shadow-md backdrop-blur-md border-t rounded-t-xl ${theme === 'dark' ? 'text-white border-slate-300' : ' text-black border-slate-600'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Task Manager. All rights reserved to codewithabhi14@gmail.com.</p>
        <ul className="flex space-x-6">
          <li>
            <a href="/about" className="hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-400">
              Contact
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
