// App.js
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import Main from "./pages/{overview}";
import { getToken } from "./tools/reducers/authReducer";
import { SetUp } from "./pages/SetUp";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "setup",
    element: <SetUp />,
  },
]);

function App() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let path = window.location.pathname;

  // redirect to login if not authenticated except login and logout routes
  useEffect(() => {
    if (path !== "/login" && path !== "/logout") {
      if (!authState.token && path !== "/login") {
        window.location.replace("/login");
      } else {
        dispatch(getToken());
      }
    }
  }, [path, authState.isAuthenticated, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
