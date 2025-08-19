// // // client/src/components/Header.jsx
// // import React from 'react';
// // import { Link, NavLink } from 'react-router-dom';
// // import axios from 'axios';

// // const Header = ({ loggedIn, setLoggedIn, setUser }) => {
// //   const handleLogout = async () => {
// //     try {
// //       await axios.post('/api/auth/logout', {}, { withCredentials: true });
// //       setLoggedIn(false);
// //       setUser(null);
// //     } catch (error) {
// //       console.error("Logout failed:", error);
// //     }
// //   };

// //   return (
// //     <header className="bg-white shadow-md sticky top-0 z-50">
// //       <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
// //         <Link to="/" className="text-2xl font-bold text-green-600">
// //           PRITHWE
// //         </Link>
        
// //         <div className="hidden md:flex items-center space-x-8 text-gray-600 font-semibold">
// //           <NavLink to="/" className={({ isActive }) => isActive ? "text-green-600" : "hover:text-green-600 transition-colors"}>Home</NavLink>
// //           <NavLink to="/information" className={({ isActive }) => isActive ? "text-green-600" : "hover:text-green-600 transition-colors"}>Information</NavLink>
// //           <NavLink to="/about" className={({ isActive }) => isActive ? "text-green-600" : "hover:text-green-600 transition-colors"}>About Us</NavLink>
// //           <NavLink to="/contact" className={({ isActive }) => isActive ? "text-green-600" : "hover:text-green-600 transition-colors"}>Contact Us</NavLink>
// //         </div>
        
// //         <div>
// //           {loggedIn ? (
// //             <button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-red-600 transition-colors">
// //               Logout
// //             </button>
// //           ) : (
// //             <Link to="/login" className="bg-green-500 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-green-600 transition-colors">
// //               Login
// //             </Link>
// //           )}
// //         </div>
// //       </nav>
// //     </header>
// //   );
// // };

// // export default Header;


// // client/src/components/Header.jsx
// import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import axios from 'axios';

// const Header = ({ loggedIn, setLoggedIn, setUser }) => {
//   const handleLogout = async () => {
//     try {
//       await axios.post('/api/auth/logout', {}, { withCredentials: true });
//       setLoggedIn(false);
//       setUser(null);
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold text-green-600">
//           PRITHWE
//         </Link>
        
//         <div className="hidden md:flex items-center space-x-8 text-gray-600 font-semibold">
//           <NavLink to="/" className={({ isActive }) => isActive ? "text-green-600" : "hover:text-green-600 transition-colors"}>Home</NavLink>
//           <NavLink to="/calculator" className={({ isActive }) => isActive ? "text-green-600" : "hover:text-green-600 transition-colors"}>Calculator</NavLink>
//           <NavLink to="/history" className={({ isActive }) => isActive ? "text-green-600" : "hover:text-green-600 transition-colors"}>History</NavLink>
//           <NavLink to="/information" className={({ isActive }) => isActive ? "text-green-600" : "hover:text-green-600 transition-colors"}>Information</NavLink>
//           <NavLink to="/about" className={({ isActive }) => isActive ? "text-green-600" : "hover:text-green-600 transition-colors"}>About Us</NavLink>
//           <NavLink to="/contact" className={({ isActive }) => isActive ? "text-green-600" : "hover:text-green-600 transition-colors"}>Contact Us</NavLink>
//         </div>
        
//         <div>
//           {loggedIn ? (
//             <button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-red-600 transition-colors">
//               Logout
//             </button>
//           ) : (
//             <Link to="/login" className="bg-green-500 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-green-600 transition-colors">
//               Login
//             </Link>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;


// client/src/components/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

const Header = ({ loggedIn, setLoggedIn, setUser }) => {
  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-600">
            PRITHWE
          </Link>
          
          {/* Navigation Links - Horizontal Spread */}
          <div className="hidden md:flex items-center space-x-1 flex-grow justify-center">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/calculator" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`
              }
            >
              Calculator
            </NavLink>
            
            <NavLink 
              to="/information" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`
              }
            >
              Information
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`
              }
            >
              About Us
            </NavLink>
            
          </div>
          
          {/* Login/Logout Button */}
          <div className="ml-4">
            {loggedIn ? (
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="bg-green-500 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-green-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;