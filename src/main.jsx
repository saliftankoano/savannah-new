// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Admin from "./Admin.jsx";
import Dashboard from "./Dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lost from "./Lost.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
