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
        <div className="menu ">
          <NavLink to="/">
            <img className="home" id="" src={home} alt="" />
          </NavLink>
        </div>
        <div className="menu  " id="more">
          <NavLink to="/products">
            <img className="home" id="moreImg" src={more} alt="" />
          </NavLink>
        </div>
        <div className="menu ">
          <NavLink to="/orders">
            <img className="home" id="lists" src={list} alt="" />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
