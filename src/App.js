// App.js
import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import Main from "./pages/{overview}";
import { getToken } from "./tools/reducers/authReducer";
import { SetUp } from "./pages/SetUp";
import { HSStaticMethods } from "preline/preline";

window.HSStaticMethods = HSStaticMethods || {};

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "setup",
        element: <SetUp />,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
]);

function Root() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();
  let path = location.pathname;

  useEffect(() => {
    console.log("page reload");
    window.HSStaticMethods.autoInit();

    if (path !== "/login" && path !== "/logout") {
      if (!authState.token && path !== "/login") {
        window.location.replace("/login");
      } else {
        dispatch(getToken());
      }
    }
  }, [path, authState.token]);

  // Render the corresponding component based on the current path
  let Component;
  switch (path) {
    case "/login":
      Component = Login;
      break;
    case "/setup":
      Component = SetUp;
      break;
    default:
      Component = Main; // Assuming Main is your default component
  }

  return <Component />;
}

export default function App() {
  return <RouterProvider router={router} />;
}
