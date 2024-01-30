// LoginForm.js

import React, { useEffect } from "react";
import { Form } from "react-router-dom";
import BlackButton from "../../components/common/buttons/BlackButton";
import clsx from "clsx";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function LoginForm({
  usernameRef,
  passwordRef,
  showPassword,
  rememberMe,
  setRememberMe,
  togglePswVisibility,
  formHandler,
  usernameError,
  passwordError,
  isModalOpen,
}) {
  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.type = showPassword ? "text" : "password";
    }
  }, [showPassword]);

  return (
    <Form
      method="post"
      action={process.env.REACT_APP_URL + "/login"}
      className="w-2/3 mx-auto"
    >
      <div className="form-group">
        <input
          ref={usernameRef}
          id="username"
          type="text"
          name="username"
          placeholder="Enter Username"
          className="form-control form-input"
        />
        <div id="usernameIconContainer" className="form-icon center">
          <ion-icon name="person-circle-outline"></ion-icon>
        </div>
      </div>
      <motion.span
        className={clsx(
          "text-red-500",
          "text-xs",
          usernameError ? "block" : "hidden"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {usernameError}
      </motion.span>
      <div className={clsx("form-group", usernameError ? "mt-2" : "mt-5")}>
        <input
          ref={passwordRef}
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="form-control form-input"
        />
        <div id="passwordIconContainer" className="form-icon center">
          <ion-icon name="key-outline"></ion-icon>
        </div>
        <div
          className={clsx(
            "form-icon",
            "center",
            "right-0",
            showPassword ? "d-none" : "flex"
          )}
          id="eye"
          onClick={togglePswVisibility}
        >
          <ion-icon name="eye-outline"></ion-icon>
        </div>
        <div
          className={clsx(
            "form-icon",
            "center",
            "right-0",
            showPassword ? "flex" : "d-none"
          )}
          id="eye-off"
          onClick={togglePswVisibility}
        >
          <ion-icon name="eye-off-outline"></ion-icon>
        </div>
      </div>
      <motion.span
        className={clsx(
          "text-red-500",
          "text-xs",
          passwordError && !isModalOpen ? "block" : "hidden"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {passwordError}
      </motion.span>
      <div
        className={clsx(
          "form-group",
          "items-center",
          "ml-2",
          passwordError ? "mt-2" : "mt-5"
        )}
      >
        <input
          type="checkbox"
          id="remember_me"
          name="remember_me"
          value={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <label htmlFor="remember_me" className="ml-2 select-none">
          Remember Me
        </label>
      </div>
      <div className="center">
        <BlackButton
          text="Log In"
          isInput={true}
          onClick={(e) => {
            e.preventDefault();
            formHandler();
          }}
        />
      </div>
    </Form>
  );
}

LoginForm.propTypes = {
  usernameRef: PropTypes.object.isRequired,
  passwordRef: PropTypes.object.isRequired,
  showPassword: PropTypes.bool.isRequired,
  rememberMe: PropTypes.bool.isRequired,
  setRememberMe: PropTypes.func.isRequired,
  togglePswVisibility: PropTypes.func.isRequired,
  formHandler: PropTypes.func.isRequired,
  usernameError: PropTypes.string,
  passwordError: PropTypes.string,
};

export default LoginForm;
