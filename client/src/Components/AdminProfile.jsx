import React from "react";
import pfp from "../Images/pfp.png";
export default function AdminProfile(props){
    return (
      <div
        className={
          props.visible == "profile"
            ? "p-4 view-profile-content dashboard w-full md:w-3/4 h-100  pt-16 "
            : "hidden"
        }
      >
        <img src={pfp} alt="pfp" className="mx-auto md:hidden w-1/2 mb-16" />
        <h1 className="text-center text-3xl  md:text-7xl font-semibold">YOUR PROFILE</h1>
        <div className="name-input flex justify-center items-center mt-12 md:mt-24">
          <h4 className="text-xl md:text-3xl font-bold ml-6">Name:</h4>
          <h4 className="text-xl md:text-3xl ml-4 md:ml-8">{props.uName}</h4>
        </div>
        <div className="name-input flex justify-center items-center mt-6 md:mt-12">
          <h4 className="text-xl md:text-3xl font-bold ml-6">Email:</h4>
          <h4 className="text-xl md:text-3xl ml-4 md:ml-8">{props.mail}</h4>
        </div>
        <div className="name-input flex justify-center items-center mt-6 md:mt-12">
          <h4 className="text-xl md:text-3xl font-bold ml-6">Phone Number:</h4>
          <h4 className="text-xl md:text-3xl ml-4 md:ml-8">{props.contact}</h4>
        </div>
        <div className="name-input flex-row justify-center items-center mt-6 md:mt-12">
          <h4 className="text-xl md:text-3xl text-center font-bold ml-6">
            Address:
          </h4>
          <h4 className="text-xl md:text-3xl text-center ml-4 md:ml-8">
            {props.address}
          </h4>
        </div>
      </div>
    );
}