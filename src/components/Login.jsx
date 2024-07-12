// import React from "react";

function LoginForm() {
  return (
    <>
      <input type="email" name="email" required placeholder="email" />
      <input type="password" name="password" required placeholder="password" />
      <div>
        <button className="button ">Login</button>
      </div>
    </>
  );
}

export default LoginForm;
