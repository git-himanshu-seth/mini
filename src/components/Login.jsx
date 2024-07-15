import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/features/user/userSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <>
      <label> Email</label>
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        onChange={handleChange}
      />
      <label> Password</label>
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        onChange={handleChange}
      />

      <div>
        <button
          className="button "
          onClick={() => {
            dispatch(userLogin(userData));
          }}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default LoginForm;
