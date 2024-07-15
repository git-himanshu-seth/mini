import { useState, useEffect } from "react";
import "../assets/styles/header.styles.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../redux/features/user/userSlice";

const Navbar = ({ navigation }) => {
  const value = useSelector((state) => state?.user?.value);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!Object.keys(value)?.length) {
      navigation("/");
    }
  }, [value]);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">MyLogo</div>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <ul>
            {value.user_type === "manager" && (
              <li
                aria-label="Create Departments "
                onClick={() => {
                  navigation("/create-department");
                  setIsOpen(false);
                }}
              >
                Create Departments
              </li>
            )}
            {value.user_type === "manager" && (
              <li
                onClick={() => {
                  navigation("/employees-list");
                  setIsOpen(false);
                }}
              >
                Employees
              </li>
            )}
            {value.user_type === "manager" && (
              <li
                onClick={() => {
                  navigation("/department-list");
                  setIsOpen(false);
                }}
              >
                Departments
              </li>
            )}
            {!value.first_name && (
              <li
                onClick={() => {
                  navigation("/");
                  setIsOpen(false);
                }}
              >
                SignUp
              </li>
            )}
            {value.first_name && (
              <li
                onClick={() => {
                  dispatch(userLogOut());
                  setIsOpen(false);
                }}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? "change" : ""}`}></div>
          <div className={`bar ${isOpen ? "change" : ""}`}></div>
          <div className={`bar ${isOpen ? "change" : ""}`}></div>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  navigation: PropTypes.func.isRequired,
};

export default Navbar;
