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

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const dispatch = useDispatch();

  const handleOpen = (user) => {
    setOpen(true);
    usernameRef.current.value = user.username;
    const data = {
      title: "Log In as " + user.name,
      body: (
        <div>
          <input
            className="form-control mb-5"
            type="password"
            placeholder="Enter Password"
            ref={passwordRef}
          />
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
      ),
    };

    setModalContent(data);
  };

  const handleClose = () => setOpen(false);

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
        const response = res.data;
        const data = response.data;
        if (response.success) {
          dispatch(setToken(data.token));
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
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
          usernameRef={usernameRef}
          passwordRef={passwordRef}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          showPassword={showPassword}
          togglePswVisibility={togglePswVisibility}
          formHandler={formHandler}
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
