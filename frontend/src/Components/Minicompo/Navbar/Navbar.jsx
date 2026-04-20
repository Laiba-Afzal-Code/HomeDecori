import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import logo from "../../../assets/homedecor.svg";
import userimg from "../../../assets/user.jpg";
const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const user = localStorage.getItem("user");

  return (
    <nav className="nav">
      <div className="navbar">
        {/* Logo */}
        <div className="navlogo">
          <img src={logo} alt="homedecorim" width={170} />
        </div>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Links */}
        <div className={`nav-link ${menuOpen ? "open" : ""}`}>
          <ul className="navul">
            <li className="navli">
              <NavLink
                to="/"
                className="anav"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li className="navli">
              <NavLink
                to="/about-us"
                className="anav"
                onClick={() => setMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li className="navli">
              <NavLink
                to="/contact-us"
                className="anav"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            <li className="navli">
              <NavLink
                to="/blogs"
                className="anav"
                onClick={() => setMenuOpen(false)}
              >
                Blogs
              </NavLink>
            </li>
            <li className="navli">
              <NavLink
                to="/texteditor/fileconverter/tools"
                className="anav"
                onClick={() => setMenuOpen(false)}
              >
                Editor
              </NavLink>
            </li>
          </ul>

          <div className="navbtn">
            <Search
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Decorim"
            />
            <Link to={"/blogrequest"} className="a">
              <button className="navb">Decorim</button>
            </Link>
            {user ? (
              <Link to={"/profile"} className="user">
                <img src={userimg} alt="user" className="userimg" width={50} />
              </Link>
            ) : (
              <Link to={"/login"} className="a">
                <button className="navb">SignIn</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
