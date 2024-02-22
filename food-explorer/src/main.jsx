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
import ViewDishAdminPage from "./pages/AdminHome/ViewDishAdmin.jsx";
import ErrorPage from "./pages/ErrorPage/Error404.jsx";
import EditDish from "./pages/AdminHome/EditDishAdmin.jsx";
import FavoritesDish from "./pages/FavoritesDish/FavoritesDish.jsx";
import Orders from "./pages/Requests/Orders.jsx";

const styleTag = document.createElement('style');
styleTag.innerHTML = globalStyles;
document.head.appendChild(styleTag);


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="login" element={<Login />} />
          <Route path="home/user" element={<UserHome />} />
          <Route path="home/user/viewDish/:id" element={<ViewDishPage />} />
          <Route path="home/user/favoritesDishes/:id" element={<FavoritesDish />} />
          <Route path="home/user/orders/:id" element={<Orders />} />
          <Route path="home/admin" element={<AdminHome />} />
          <Route path="home/admin/newdish" element={<NewDish />} />
          <Route path="home/admin/viewDish/:id" element={<ViewDishAdminPage />} />
          <Route path="home/admin/editdish/:id" element={<EditDish />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
