import { useState } from "react";
import Dropdown from "./DropDown";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/features/user/userSlice";

function SignupForm() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    location: "",
    user_type: "",
    password: "",
    confirm_password: "",
  });

  const [validation, setValidation] = useState({
    first_name: { message: "", isValid: true },
    last_name: { message: "", isValid: true },
    email_address: { message: "", isValid: true },
    location: { message: "", isValid: true },
    user_type: { message: "", isValid: true },
    password: { message: "", isValid: true },
    confirm_password: { message: "", isValid: true },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFocus = (name) => {
    setValidation((prev) => ({
      ...prev,
      [name]: { message: "", isValid: true },
    }));
  };

  const handleValidation = () => {
    let valid = true;
    let newValidation = { ...validation };

    if (userData.first_name.trim() === "") {
      newValidation.first_name.message = "First name is required";
      newValidation.first_name.isValid = false;
      valid = false;
    }

    if (userData.last_name.trim() === "") {
      newValidation.last_name.message = "Last name is required";
      newValidation.last_name.isValid = false;
      valid = false;
    }

    if (userData.email_address.trim() === "") {
      newValidation.email_address.message = "Email address is required";
      newValidation.email_address.isValid = false;
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email_address)) {
      newValidation.email_address.message = "Email address is invalid";
      newValidation.email_address.isValid = false;
      valid = false;
    }

    if (userData.location.trim() === "") {
      newValidation.location.message = "Location is required";
      newValidation.location.isValid = false;
      valid = false;
    }

    if (userData.user_type.trim() === "") {
      newValidation.user_type.message = "User type is required";
      newValidation.user_type.isValid = false;
      valid = false;
    }

    if (userData.password.trim() === "") {
      newValidation.password.message = "Password is required";
      newValidation.password.isValid = false;
      valid = false;
    } else if (userData.password.length <= 8) {
      newValidation.password.message =
        "Password must be longer than 8 characters";
      newValidation.password.isValid = false;
      valid = false;
    }

    if (userData.confirm_password !== userData.password) {
      newValidation.confirm_password.message = "Passwords do not match";
      newValidation.confirm_password.isValid = false;
      valid = false;
    }

    setValidation(newValidation);
    return valid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      dispatch(userRegister(userData));
    }
  };

  const options = [
    { value: "manager", label: "Manager" },
    { value: "employee", label: "Employee" },
  ];

  return (
    <>
      <label>First Name</label>
      <input
        type="text"
        name="first_name"
        required
        placeholder="First Name"
        onChange={handleChange}
        onFocus={() => handleFocus("first_name")}
      />
      {!validation.first_name.isValid && (
        <p className="error">{validation.first_name.message}</p>
      )}

      <label>Last Name</label>
      <input
        type="text"
        name="last_name"
        required
        placeholder="Last Name"
        onChange={handleChange}
        onFocus={() => handleFocus("last_name")}
      />
      {!validation.last_name.isValid && (
        <p className="error">{validation.last_name.message}</p>
      )}

      <label>Email</label>
      <input
        type="email"
        name="email_address"
        required
        placeholder="Email"
        onChange={handleChange}
        onFocus={() => handleFocus("email_address")}
      />
      {!validation.email_address.isValid && (
        <p className="error">{validation.email_address.message}</p>
      )}

      <label htmlFor={"1"}>Location</label>
      <input
        type="text"
        id="1"
        name="location"
        required
        placeholder="Location"
        onChange={handleChange}
        onFocus={() => handleFocus("location")}
      />
      {!validation.location.isValid && (
        <p className="error">{validation.location.message}</p>
      )}

      <label>Employee Type</label>
      <Dropdown
        options={options}
        onSelect={(val) => {
          setUserData({ ...userData, user_type: val });
        }}
      />
      {!validation.user_type.isValid && (
        <p className="error">{validation.user_type.message}</p>
      )}

      <label>Password</label>
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        onChange={handleChange}
        onFocus={() => handleFocus("password")}
      />
      {!validation.password.isValid && (
        <p className="error">{validation.password.message}</p>
      )}

      <label>Confirm Password</label>
      <input
        type="password"
        name="confirm_password"
        required
        placeholder="Confirm Password"
        onChange={handleChange}
        onFocus={() => handleFocus("confirm_password")}
      />
      {!validation.confirm_password.isValid && (
        <p className="error">{validation.confirm_password.message}</p>
      )}

      <div>
        <button className="button" type="button" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
    </>
  );
}

export default SignupForm;
