import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <h2>🏗️ BBC Construction</h2>
          </Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/inquiry">Get Quote</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

