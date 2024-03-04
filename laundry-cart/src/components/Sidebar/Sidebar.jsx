import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import home from "./home-run (1).png";
import more from "./more@2x.png";
import list from "./list.png";

const Sidebar = () => {
  return (
    <>
      <div className="main">
        <NavLink to="/" className="menu ">
          <img className="home" id="" src={home} alt="" />
        </NavLink>

        <NavLink to="/products" className="menu  " id="more">
          <img className="home" id="moreImg" src={more} alt="" />
        </NavLink>
        <NavLink to="/orders" className="menu ">
          <img className="home" id="lists" src={list} alt="" />
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
