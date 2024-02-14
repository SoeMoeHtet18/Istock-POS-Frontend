// App.js
import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import { getToken } from "./tools/reducers/authReducer";
import { SetUp } from "./pages/SetUp";
import { HSStaticMethods } from "preline/preline";
import { StockContent } from "./components/setup/contents/StockContent";
import { SupplierContent } from "./components/setup/contents/SupplierContent";
import { LocationContent } from "./components/setup/contents/LocationContent";

window.HSStaticMethods = HSStaticMethods || {};

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "setup",
        element: <SetUp />,
        children: [
          {
            path: "stock",
            element: <StockContent />,
          },
          {
            path: "supplier",
            element: <SupplierContent />,
          },
          {
            path: "location",
            element: <LocationContent />,
          },
        ],
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
    window.HSStaticMethods.autoInit();

    if (path !== "/login" && path !== "/logout") {
      if (!authState.token && path !== "/login") {
        window.location.replace("/login");
      } else {
        dispatch(getToken());
      }
    }
  }, [path, authState.token]);

  return <Outlet />;
}

export default function App() {
  return <RouterProvider router={router} />;
}
