import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';  // Import the LoginSignup component
import App from './App';  // Replace with your actual Home component or other components
import Home from './components/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define the routes */}
        <Route path="/" index element={<LoginSignup />} />  {/* Login/Signup page */}
        <Route path="/home" element={<Home />} />  {/* Home page */}
        <Route path="/products" element={<App />} />  {/* Home page */}
      </Routes>
    </Router>
  </React.StrictMode>
);
