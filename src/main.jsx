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
    path: "https://savannah-uv.onrender.com",
    element: <App />,
  },
  {
    path: "https://savannah-uv.onrender.com/about",
    element: <About />,
  },
  {
    path: "https://savannah-uv.onrender.com/admissions",
    element: <Admissions />,
  },
  {
    path: "https://savannah-uv.onrender.com/admin",
    element: <Admin />,
  },
  {
    path: "https://savannah-uv.onrender.com/dashboard",
    element: <Dashboard />,
  },
  {
    path: "https://savannah-uv.onrender.com/lost",
    element: <Lost />,
  },
  {
    path: "https://savannah-uv.onrender.com/test",
    element: <TestArea />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
