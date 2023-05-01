import React from "react";
import NAVLOGO from "../Images/nav-logo.png"
import { NavLink } from "react-router-dom";
export default function Navbar(props){   
    return (
      <>
        <nav className="navigation-bar w-full bg-dark-cyan h-40 md:h-20 flex-row md:flex items-center md:items-center justify-between text-white sticky top-0 ">
          <div className="w-48 md:nav-left flex items-center mx-auto justify-between md:m-0 pt-4 md:pt-0 ">
            <img src={NAVLOGO} alt="" className="h-14 md:ml-12" />
            <h1 className="text-4xl mb-1 ml-4 p-0">आवाज़</h1>
          </div>
          <div className="md:nav-right w-11/12 md:w-80  flex justify-evenly mx-auto md:ml-20 md:m-0 md:mr-8 mt-6 md:mt-0   ">
            <NavLink to="/">
              <h3 className="text-center">HOME</h3>
            </NavLink>
            <NavLink to="/userlogin">
              <h3 className="text-center">LOGIN</h3>
            </NavLink>
          </div>
        </nav>
      </>
    );
}