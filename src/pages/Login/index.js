import React, { useEffect, useRef, useState } from "react";
import ProfileContainer from "../../components/login/ProfileContainer";
import LoginForm from "../../components/login/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModalContainer from "../../components/common/modal/ModalContainer";
import BlackButton from "../../components/common/buttons/BlackButton";
import "./index.css";
import { useDispatch } from "react-redux";
import { setToken } from "../../tools/reducers/authReducer";
import clsx from "clsx";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const passwordRef = useRef(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const dispatch = useDispatch();
  const [loginFormKey, setLoginFormKey] = useState(0);

  const ContentBody = ({ passwordError }) => {
    return (
      <div>
        <input
          className={clsx("form-control", !passwordError && "mb-5")}
          type="password"
          placeholder="Enter Password"
          ref={passwordRef}
        />
        <motion.span
          className={clsx(
            "text-red-500",
            "text-xs",
            "mb-3",
            passwordError ? "block" : "hidden"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {passwordError}
        </motion.span>
        <BlackButton
          width="100%"
          text="Log In"
          isInput={true}
          onClick={(e) => {
            e.preventDefault();
            formHandler();
          }}
        />
      </div>
    );
  };

  const handleOpen = (user) => {
    setPasswordError(null);
    setOpen(true);
    usernameRef.current.value = user.username;
    const data = {
      title: "Log In as " + user.name,
      body: <ContentBody passwordError={passwordError} />,
    };

    setModalContent(data);
  };

  useEffect(() => {
    const data = {
      ...modalContent,
      body: <ContentBody passwordError={passwordError} />,
    };

    setModalContent(data);
  }, [passwordError]);

  const handleClose = () => {
    setPasswordError(null);
    setOpen(false);
    setLoginFormKey((prevKey) => prevKey + 1);
  };

  const getAllStaffs = async () => {
    await axios.get(process.env.REACT_APP_URL + "/staffs").then((res) => {
      if (res.data.success) {
        setUsers(res.data.data);
      }
    });
  };

  useEffect(() => {
    getAllStaffs();
  }, []);

  const togglePswVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formHandler = async () => {
    setUsernameError(null);
    setPasswordError(null);
    let isValidate = formValidator();
    if (!isValidate) {
      return;
    }

    await axios
      .post(
        process.env.REACT_APP_URL + "/login",
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          rememberMe: rememberMe,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 204) {
          setUsernameError("User not found!");
          return;
        }
        const response = res.data;
        const data = response.data;
        if (response.success) {
          dispatch(setToken(data.token));
          navigate("/");
        }
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setPasswordError(response.data.message);
          return;
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const formValidator = () => {
    if (usernameRef.current.value === "") {
      setUsernameError("Please fill your username*");
      return false;
    }
    if (passwordRef.current.value === "") {
      setPasswordError("Please input your password*");
      return false;
    }
    return true;
  };

  return (
    <div className="flex">
      <div
        id="left-login"
        className="w-1/2 bg-black text-white center h-screen"
      >
        <h1 className="text-4xl">Welcome Back</h1>
        <h2 className="text-3xl my-5">Ko Htun POS</h2>
        <b>Computer & Electronic</b>
      </div>
      <div id="right-login" className="w-1/2 pt-10">
        <h1 className="text-3xl text-center font-bold">
          Connect To Your Account
        </h1>
        <ProfileContainer users={users} onClick={handleOpen} />
        <LoginForm
          key={loginFormKey}
          usernameRef={usernameRef}
          passwordRef={passwordRef}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          showPassword={showPassword}
          togglePswVisibility={togglePswVisibility}
          formHandler={formHandler}
          usernameError={usernameError}
          passwordError={passwordError}
          isModalOpen={open}
        />
        <ModalContainer
          data={modalContent}
          open={open}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}

export default Login;
