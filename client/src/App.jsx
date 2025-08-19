import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout and Global Components
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Spinner from './components/Spinner.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Information from './components/Information.jsx';

// Pages
import Home from './pages/Home.jsx';
import AboutUs from './components/AboutUs.jsx';
//import Information from './pages/Information.jsx';
import ContactUs from './pages/ContactUs.jsx';
import CalculatorPage from './pages/CalculatorPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { data } = await axios.get("/api/auth/status", { withCredentials: true });
        setLoggedIn(data.authenticated);
        setUser(data.user);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer autoClose={3000} position="top-center" newestOnTop />
      <div className="flex flex-col min-h-screen">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/information" element={<Information />} />
            <Route path="/contact" element={<ContactUs />} />
            
            {/* Login Route */}
            <Route
              path="/login"
              element={loggedIn ? <Navigate to="/calculator" /> : <LoginPage />}
            />
            
            {/* Protected Calculator Route */}
            <Route
              path="/calculator"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <CalculatorPage user={user} />
                </ProtectedRoute>
              }
            />
            
            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
