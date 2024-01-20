import React from 'react';
import './navbarStyles.css'

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <a href="#home" >Home</a>
        <a href="#services">Services</a>
        <a href="#blogs">Blogs</a>
        <a href="#about">About</a>
        <a href="#book-now">Book Now</a>
      </nav>
    </div>
  );
};

export default Navbar;
