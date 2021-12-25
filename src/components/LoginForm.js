import React from "react";
import propTypes from "prop-types";

const LoginForm = (props) => {
  return (
    <div>
      <h1>Log in here</h1>
      <form onSubmit={(e) => props.submitHandler(e)}>
        <p>
          <label htmlFor="username">username: </label>
          <input
            type="text"
            name="username"
            value={props.username}
            onChange={({ target }) => props.usernameInputHandler(target)}
          ></input>
        </p>
        <p>
          <label htmlFor="password">password: </label>
          <input
            type="password"
            name="password"
            value={props.password}
            onChange={({ target }) => props.passwordInputHandler(target)}
          ></input>
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  usernameInputHandler: propTypes.func.isRequired,
  passwordInputHandler: propTypes.func.isRequired,
  submitHandler: propTypes.func.isRequired,
};

export default LoginForm;
