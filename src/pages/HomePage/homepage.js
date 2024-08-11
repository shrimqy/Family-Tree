// HomePage.js

import React from 'react';
import FamilyCircle from '../../component/FamilyCircle/familycircle'; // Import FamilyCircle component
import Navbar from '../../component/Navbar/Navbar'; // Import Navbar component
import '../HomePage/homepage.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div className="homeContainer">
      <div className='navContent'>
        <Navbar /> {/* Use Navbar component */}
      </div>
        <h1 className='textcolor'>Welcome to the Family Tree Application</h1>
        <div className="homeContent">
        <FamilyCircle /> {/* Use FamilyCircle component */}
      </div>
    </div>
    
    
  );
};

export default HomePage;
