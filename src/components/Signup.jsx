// import React from "react";

function SignupForm() {
  return (
    <>
      <input type="email" name="email" required placeholder="email" />
      <input type="password" name="password" required placeholder="password" />
      <input
        type="password"
        name="confirmPassword"
        required
        placeholder="confirmPassword"
      />
      <div>
        <button className="button" type="submit">
          Sign Up
        </button>
      </div>
    </>
  );
}

export default SignupForm;
