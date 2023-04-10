import React from "react";

export default function UpdateAdminProfile(props) {
  
  return (
    <div
      className={
        props.visible == "update"
          ? "p-4 update-profile-content dashboard w-full md:w-3/4 h-100  pt-16"
          : "hidden"
      }
    >
      <h1 className="text-center text-4xl md:text-7xl">UPDATE YOUR PROFILE</h1>
      <form action="" className="flex-row justify-between items-center">
      {/* name container */}
        <div className="name-input flex justify-center items-center mt-3 md:mt-6">
          <label htmlFor="name">
            <p className=" text-xl md:text-2xl">Name:</p>{" "}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
          />
        </div>
        {/* email container */}
        <div className="name-input flex justify-center items-center mt-1 md:mt-4">
          <label htmlFor="name">
            <p className="text-xl md:text-2xl">Email:</p>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
          />
        </div>
        {/* phone number container */}
        <div className="name-input flex justify-center items-center mt-1 md:mt-4">
          <label htmlFor="phone">
            <p className="text-xl md:text-2xl">PhoneNo.:</p>{" "}
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Contact Number"
            className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
          />
        </div>
        {/* address container */}
        <div className="name-input flex justify-center items-center mt-1 md:mt-4">
          <label htmlFor="name">
            <p className="text-xl md:text-2xl"> Address:</p>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
          />
        </div>
        {/* new passwaor container */}
        <div className="name-input flex justify-center items-center mt-1 md:mt-4">
          <label htmlFor="passward">
            <p className="text-xl md:text-2xl">Enter new Password:</p>{" "}
          </label>
          <input
            type="password"
            name="new password"
            id="new-password"
            placeholder="password"
            className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
          />
        </div>
        {/* confirm passward container */}
        <div className="name-input flex justify-center items-center mt-2 md:mt-4">
          <label htmlFor="passward">
            <p className="text-xl md:text-2xl">Confirm Password:</p>{" "}
          </label>
          <input
            type="password"
            name="confirm password"
            id="confirm-password"
            placeholder="password"
            className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
          />
        </div>
        {/* pfp container */}
        <div className="name-input flex justify-center items-center mt-2 md:mt-4">
          <label htmlFor="pfp">
            <p className="text-xl md:text-2xl">PFP:</p>
          </label>
          <input
            type="file"
            name="pfp"
            id="pfp"
            placeholder=""
            className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
          />
        </div>
        <div className="name-input flex justify-center items-center mt-4">
          <button
            type="submit"
            className="hover:animate-bounce bg-light-green p-2 md:p-3 w-32 rounded-3xl text-white text-xl"
          >
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
}
