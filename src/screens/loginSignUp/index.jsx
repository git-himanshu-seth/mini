import { useState } from "react";
import LoginForm from "../../components/Login";
import SignupForm from "../../components/Signup";
import "../../assets/styles/loginSignUp.styles.css";

function LoginAndSignUp() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      <div className="container_second">
        <h1 className="fs-secondary-heading">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        {isLogin ? <LoginForm /> : <SignupForm />}
        <div>
          <button className="button " onClick={toggleForm}>
            {isLogin ? "Switch to Sign Up" : "Switch to Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginAndSignUp;
