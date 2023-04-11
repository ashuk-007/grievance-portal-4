import React from "react";
import NAVLOGO from "../Images/nav-logo.png";
import { Link } from "react-router-dom";

export default function UserNavbar(props){
    return (
      <>
        <nav className=" navigation-bar w-full bg-dark-cyan h-40 md:h-20 flex-row md:flex items-center md:items-center justify-between text-white sticky top-0 ">
          <div className="w-70 md:w-48 md:nav-left flex items-center justify-between  ml-4 md:m-0 md:ml-10 pt-4 md:pt-0 ">
            <div className="flex justify-center ml-4 items-center">
              <img src={NAVLOGO} alt="" className="h-14" />
              <h1 className="text-3xl mb-1">आवाज़</h1>
            </div>
            <Link
              to="/userlogin"
              className="ml-28 mr-4 md:hidden border border-light-green rounded-lg md:border-0 p-1 "
            >
              LOGOUT
            </Link>
          </div>
          <div className="md:nav-right w-11/12 md:w-96  flex justify-between m-auto md:m-0 md:mr-8 mt-6 md:mt-0   ">
            <h3
              className="text-sm border border-light-green rounded-lg p-1 md:border-0"
              onClick={() => props.handle("1", "profile")}
            >
              {props.first}
            </h3>
            <a
              className="text-sm border border-light-green  rounded-lg p-1 md:border-0"
              onClick={() => props.handle("2", "view")}
            >
              {props.second}
            </a>
            <a
              className="text-sm border border-light-green rounded-lg p-1 md:border-0"
              onClick={() => props.handle("3", "new")}
            >
              {props.third}
            </a>
            {props.fourth != "" && (
              <h3
                className="text-sm border border-light-green rounded-lg p-1 md:border-0"
                onClick={() => props.handle("4", "update")}
              >
                {props.fourth}
              </h3>
            )}
          </div>
        </nav>
      </>
    );
}