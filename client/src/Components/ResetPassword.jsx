import React from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Loading from "./Loading";
export default function ForgotPassword() {
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState({
     password: "",
     token:""
  });
  const [cPassword, setCPassword] = React.useState("")
  function handleChangePassword(e) {
    setPassword((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };
     const [showPassword, setShowPassword] = React.useState(false);
  function handleChangeCPassword(e) {
   setCPassword(e.target.value) 
  }
  const Navigate = useNavigate();
  function handleSubmit() {
    if(password.password!==cPassword){
        alert("Passwords do not match");
    }
    else if(password.password=="" || password.token=="" || cPassword=="" ){
      alert("Please fill all the fields")
    }
    else{
      setLoading(true)
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:3000/api/v1/auth/reset-password",
            headers: {
                "Content-Type": "application/json",
            },
            data: password,
        };
        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("Password reset successful");
                setLoading(false);
                Navigate("/userlogin");
            })
            .catch((error) => {
                console.log(error);
                alert(error)
        });
    }
  }


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
              Enter your new password
            </p>
          </div>
          <div className="mt-24">
            <div className="border-black">
              <div>
                <label htmlFor="password" className="block text-sm text-white">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="block w-full px-4 py-2 mt-2 bg-white rounded-md"
                  onChange={(e) => {
                    handleChangePassword(e);
                  }}
                />
                <button onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div>
                <label htmlFor="cpassword" className="block text-sm text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  className="block w-full px-4 py-2 mt-2 bg-white rounded-md"
                  onChange={(e) => {
                    handleChangeCPassword(e);
                  }}
                />
              </div>
              <div>
                <label htmlFor="token" className="block text-sm text-white">
                  Token
                </label>
                <input
                  type="text"
                  name="token"
                  id="token"
                  className="block w-full px-4 py-2 mt-2 bg-white rounded-md"
                  onChange={(e) => {
                    handleChangePassword(e);
                  }}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-center ">
              <button
                className="w-1/2 hover:animate-bounce  px-4 py-2  text-white bg-light-green rounded-md"
                onClick={handleSubmit}
              >
                Sign in
              </button>
              {loading && <Loading />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
