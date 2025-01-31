import React from "react";
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
      <div className="w-full flex backdrop-blur-md bg-white/30 justify-between px-14 py-4 fixed top-0 z-50 shadow-lg">
        <div className="flex gap-1">
          <img src="" alt="" />
          <div className="flex gap-1 font-bold text-xl">
            <h1>Wissen</h1>
            <h1 className="text-green-600">Hub</h1>
          </div>
        </div>
  
        <div className="flex gap-4">
          <Link to="/" className="hover:text-green-400 transition-colors">Home</Link>
          <Link to="/courses" className="hover:text-green-400 transition-colors">Courses</Link>
          <Link to="/teacher" className="hover:text-green-400 transition-colors">Our Teachers</Link>
          <Link to="/about" className="hover:text-green-400 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-green-400 transition-colors">Contact</Link>
        </div>
      </div>
    );
  };
  
  export default Nav;
