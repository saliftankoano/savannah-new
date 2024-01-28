// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import About from "./About.jsx";
import Admissions from "./Admissions.jsx";
import Admin from "./Admin.jsx";
import Dashboard from "./Dashboard.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import TestArea from "./TestArea.jsx";
import Lost from "./Lost.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/admissions",
    element: <Admissions />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/lost",
    element: <Lost />,
  },
  {
    path: "/test",
    element: <TestArea />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
