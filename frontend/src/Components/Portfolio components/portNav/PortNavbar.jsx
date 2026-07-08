import React from "react";
import "./portnav.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbarport">
      <h2 className="logo">Laiba.dev</h2>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="portbtns">

        <Link to="#contact">
          <button className=" portbtn1, portbtn">Hire Me</button>
        </Link>
        <Link to="/">
          <button className="portbtn">Decorim</button>
        </Link>
        
      
      </div>
    </nav>
  );
}

export default Navbar;