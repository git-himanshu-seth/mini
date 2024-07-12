// src/Navbar.js
import { useState } from "react";
import "../assets/styles/header.styles.css";

const Navbar = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">MyLogo</div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <ul>
          <li
            aria-label="Create Departments "
            onClick={() => {
              navigation("/create-department");
              setIsOpen(false);
            }}
          >
            Create Departments
          </li>
          <li
            onClick={() => {
              navigation("/employees");
              setIsOpen(false);
            }}
          >
            Employees
          </li>
          <li
            onClick={() => {
              navigation("/");
              setIsOpen(false);
            }}
          >
            SignUp
          </li>
          <li
            onClick={() => {
              navigation("/");
              setIsOpen(false);
            }}
          >
            Logout
          </li>
        </ul>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? "change" : ""}`}></div>
        <div className={`bar ${isOpen ? "change" : ""}`}></div>
        <div className={`bar ${isOpen ? "change" : ""}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
