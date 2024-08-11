import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import './Navbar.css'; // Make sure to create the CSS file for styling

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Destructure isAuthenticated and logout from useAuth
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate('/'); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/homepage">Genealogy</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/familytree">Family Tree</Link></li>
        <li><Link to="/MemberList">Member List</Link></li>
        {isAuthenticated && (
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
