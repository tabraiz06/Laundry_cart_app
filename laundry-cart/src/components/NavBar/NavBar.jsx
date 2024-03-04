import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { contextProvider } from "../../Context/Context";
const NavBar = () => {
  const token = localStorage.getItem("token");
  const [logout, setLogout] = useState(false);

  const { PastOrders } = contextProvider();

  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    Navigate("/");
  };
  return (
    <div className="nav-container">
      <div className="logo">
        <div>Laundry</div>
      </div>
      <div className="nav-menu">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <div>Home</div>
        </NavLink>
        <div>Pricing</div>
        <div>Career</div>
        {!token ? (
          <NavLink to="/signin" style={{ textDecoration: "none" }}>
            <div>Sign In</div>
          </NavLink>
        ) : (
          <>
            <Link onClick={handleLogout} style={{ textDecoration: "none" }}>
              <div className="logout">Log Out</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
