import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaInfoCircle, FaProjectDiagram, FaBlog, FaFileAlt, FaEnvelope, FaSearch, FaLink } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white fixed top-0 w-full shadow-lg z-50">
      <div className="container mx-auto py-4 px-8 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold text-blue-800 hover:text-blue-600">
          SmartTrack
        </Link>

        {/* Navigation Links */}
        <ul className="grid grid-cols-10 gap-2 w-full text-gray-800 text-center">
          <li className="group">
            <Link 
              to="/home" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
              <FaHome className="text-lg group-hover:text-blue-600" />
              <span className="text-xs group-hover:text-blue-600">Home</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/profile" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
              <FaUser className="text-lg group-hover:text-blue-600" />
              <span className="text-xs group-hover:text-blue-600">Profile</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/about" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
              <FaInfoCircle className="text-lg group-hover:text-blue-600" />
              <span className="text-xs group-hover:text-blue-600">About</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/projects" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
              <FaProjectDiagram className="text-lg group-hover:text-blue-600" />
              <span className="text-xs group-hover:text-blue-600">Projects</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/blogs" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
              <FaBlog className="text-lg group-hover:text-blue-600" />
              <span className="text-xs group-hover:text-blue-600">Blogs</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/resume" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
              <FaFileAlt className="text-lg group-hover:text-blue-600" />
              <span className="text-xs group-hover:text-blue-600">Resume</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/contact" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
              <FaEnvelope className="text-lg group-hover:text-blue-600" />
              <span className="text-xs group-hover:text-blue-600">Contact</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/social-links" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
              <FaLink className="text-lg group-hover:text-blue-600" />
              <span className="text-xs group-hover:text-blue-600">Social Links</span>
            </Link>
          </li>
          <li className="group">
            <Link 
              to="/" 
              className="flex flex-col items-center p-2 w-full rounded-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
              <FaSearch className="text-lg group-hover:text-blue-600" />
              <span className="text-xs group-hover:text-blue-600">Search</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;