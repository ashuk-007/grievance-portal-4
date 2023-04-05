import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pfp from "../Images/pfp.png";

export default function Dashboard(props){
  const navigate=useNavigate()
  function handleLogout(){
    localStorage.removeItem("token")
    navigate("/userlogin")
  }
    return (
      <div className="dashboard w-1/4 h-100 bg-dark-blue pt-16 hidden md:block ">
        <img src={pfp} alt="pfp" className="m-auto h-28" />
        <div className="dash-box mt-16 mb-4">
          <h3
            className={
              props.clicked == "1"
                ? "mb-4 text-white text-center text-2xl bg-dark-cyan w-4/5 cursor-pointer rounded-md mx-auto p-3"
                : "mb-4 text-white text-center text-2xl  w-4/5 rounded-md mx-auto p-3 cursor-pointer"
            }
            onClick={() => props.handle("1", "profile")}
          >
            {props.first}
          </h3>
        </div>
        <div className="dash-box">
          <h3
            className={
              props.clicked == "2"
                ? "mb-4 text-white text-center text-2xl bg-dark-cyan w-4/5 rounded-md mx-auto p-3 cursor-pointer"
                : "mb-4 text-white text-center text-2xl  w-4/5 rounded-md mx-auto p-3 cursor-pointer"
            }
            value="2"
            onClick={() => props.handle("2", "view")}
          >
           {props.second}
          </h3>
        </div>
        <div className="dash-box">
          <h3
            className={
              props.clicked == "3"
                ? "mb-4 text-white text-center text-2xl bg-dark-cyan w-4/5 rounded-md mx-auto p-3 cursor-pointer"
                : "mb-4 text-white text-center text-2xl  w-4/5 rounded-md mx-auto p-3 cursor-pointer"
            }
            value="2"
            onClick={() => props.handle("3", "new")}
          >
            {props.third}
          </h3>
        </div>
        <div className="dash-box">
          <h3
            className={
              props.clicked == "4"
                ? "mb-16 text-white text-center text-2xl bg-dark-cyan w-4/5 rounded-md mx-auto p-3 cursor-pointer"
                : "mb-16 text-white text-center text-2xl  w-4/5 rounded-md mx-auto p-3 cursor-pointer"
            }
            value="4"
            onClick={() => props.handle("4", "update")}
          >
            {props.fourth}
          </h3>
        </div>
          <h3 className="mb-4 text-white text-center text-2xl  w-4/5 rounded-md mx-auto p-3 cursor-pointer" onClick={handleLogout}>LOGOUT</h3>
      </div>
    );
}