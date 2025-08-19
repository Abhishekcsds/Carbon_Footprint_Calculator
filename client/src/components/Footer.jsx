// client/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/assets/leaf.png" 
              alt="PrithWe Logo" 
              className="h-8 w-8 mr-2"
            />
            <span className="text-2xl font-bold text-black">PRITHWE</span>
          </div>

          {/* Right side - Navigation Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/about" className="text-black hover:underline">About</Link>
            <Link to="/calculator" className="text-black hover:underline">Calculator</Link>
            <Link to="/information" className="text-black hover:underline">Information</Link>
            <Link to="/contact" className="text-black hover:underline">Contact</Link>
          </div>
        </div>

        {/* Copyright - Centered below */}
        <div className="text-center text-gray-600 mt-4">
          <p>© 2025 PrithWe™. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;