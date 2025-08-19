// client/src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen -mt-20">
      <h1 className="text-9xl font-bold text-green-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
      <p className="text-slate-600 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
