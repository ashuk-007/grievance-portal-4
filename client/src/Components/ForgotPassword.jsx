import React from 'react'
import axios from "axios";
import Navbar from './Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Loading from "./Loading";
export default function ForgotPassword() {
      const [loading, setLoading] = React.useState(false);
  return (
    <>
      <Navbar />
      <div className="p-8 flex justify-center">
        <div className=" md:px-36 px-10 py-20 h-100  md:w-1/2 rounded-2xl  bg-dark-blue">
          <div className="">
            <p className="mt-3 text-2xl font-semibold  md:text-4xl text-center  text-white">
              Forgot password?
            </p>
            <p className="md:mt-24 text-center md:text-2xl text-white">
              Enter your Email ID to reset your password
            </p>
          </div>
          <div className="mt-24">
            <form className="border-black">
              <div>
                <label htmlFor="email" className="block text-sm text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  className="block w-full px-4 py-2 mt-2 bg-white rounded-md"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="mt-6 flex justify-center ">
                <button
                  className="w-1/2 hover:animate-bounce  px-4 py-2  text-white bg-light-green rounded-md"
                >
                  Sign in
                </button>
                {loading && <Loading />}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
