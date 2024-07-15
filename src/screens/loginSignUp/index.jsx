import { useState, useEffect } from "react";
import LoginForm from "../../components/Login";
import SignupForm from "../../components/Signup";
import "../../assets/styles/loginSignUp.styles.css";
import Loader from "../../components/Loade";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function LoginAndSignUp({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const value = useSelector((state) => state?.user?.value);
  const status = useSelector((state) => state.user.status);
  useEffect(() => {
    if (Object.keys(value)?.length > 0) {
      navigation("/employees-list");
    }
  }, [navigation, value]);
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      {status !== "loading" ? (
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
      ) : (
        <Loader />
      )}
    </div>
  );
}

LoginAndSignUp.propTypes = {
  navigation: PropTypes.func.isRequired,
};
export default LoginAndSignUp;
