import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home.Routes.jsx";
import Login from "./routes/Login.Routes.jsx";
import UserHome from "./pages/UserHome/UserHome.jsx";
import AdminHome from "./pages/AdminHome/AdminHome.jsx";
import globalStyles from './global.js';
import NewDish from "./pages/AdminHome/NewDish.jsx";
import ViewDishPage from "./pages/Dishs/ViewDish.jsx";

const styleTag = document.createElement('style');
styleTag.innerHTML = globalStyles;
document.head.appendChild(styleTag);


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="home/user" element={<UserHome />} />
          <Route path="home/admin" element={<AdminHome />} />
          <Route path="home/admin/newdish" element={<NewDish />} />
          <Route path="home/viewDish/:id" element={<ViewDishPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
