import React, { useState } from "react";
import "../../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="navbar-logo-text">&lt;&gt;</span>
          <div>
            <div className="navbar-subtext">Google Developer Student Clubs</div>
            <div className="navbar-subtext-small">
              Vellore Institute of Technology
            </div>
          </div>
        </div>
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <a href="#about" className="navbar-link">
            About
          </a>
          <a href="#faqs" className="navbar-link">
            FAQs
          </a>
          <a href="#contact" className="navbar-link">
            Contact Us
          </a>
        </div>
        <div className="navbar-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="navbar-button-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span>Coming Soon!</span>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
