import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";   
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "./Loading";
function Login(props){
  const [loginData, setLoginData] = React.useState({email:"", password:""});
  const [user,setUser]=React.useState("Citizen");
  function handleChange(e){
    setLoginData({...loginData, [e.target.name]:e.target.value});
  }
  function handleRadio(e){
    setUser(e.target.value);
  }
  const navigate=useNavigate();
 let config = {
   method: "post",
   maxBodyLength: Infinity,
   url: (user=="Citizen"?"http://localhost:3000/api/v1/auth/login":"http://localhost:3000/api/v1/auth/officer/login") ,
   headers: {
     Authorization: "Bearer ",
     "Content-Type": "application/json",
   },
   data:loginData,
 };
  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    if(loginData.email=="" || loginData.password==""){
      setLoading(false)
      alert("Please fill all the fields");
    }
    else{ 
      try {
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          localStorage.setItem("token", response.data.token);
          setLoading(false);
          {user=="Citizen"?navigate("/userpage"):navigate("/adminpage")}
      })
        .catch((error) => {
          if(error.response.status==401){
            setLoading(false)
            alert("Invalid Credentials");
          }
        });

    } catch (error) {
      console.log(error);
    }
    }
  }
  const [loading,setLoading]=React.useState(false);
  function forgotPassword(){
    navigate("/ForgotPassword");
  }
  return (
    <>
      <Navbar />
      <div className="flex-row md:flex  md:h-100 mt-0 ">
        <div className="  px-8 md:w-2/3 ">
          <div className="md:px-20 px-10 pt-20  md:pt-48 py-20 ">
            <div className="w-full md:w-2/3 h-64 ">
              <h2 className=" mt-0 text-6xl font-bold text-dark-blue">आवाज़</h2>

              <p className=" mt-4 text  md:text-2xl text-dark-blue ">
                This web application allows the concerned users and admins to
                communicate regarding the grievances with the provided features
                in order to simplify the tedious procedure of listing the
                grievances.
              </p>
            </div>
          </div>
        </div>

        <div className=" md:px-36 px-10 py-20  bg-dark-blue">
          <div className="">
            <p className="mt-3  text-2xl text-white">
              Sign in to access your account
            </p>
          </div>

          <div className="mt-8">
            <form>
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

              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-white">
                    Password
                  </label>
                  <button
                    href="#"
                    className="text-sm text-gray-400 text-white hover:underline"
                    onClick={forgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  className="block w-full px-4 py-2 mt-2 bg-white  rounded-md"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>

              <div className="mb-2 mt-8 py-1">
                <input
                  checked
                  id="default-radio-1"
                  type="radio"
                  value="Citizen"
                  name="default-radio"
                  className="w-4 h-4   focus:ring-blue-500 "
                  onClick={handleRadio}
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-3 text-l  text-white"
                >
                  Citizen
                </label>
              </div>
              <div className="flex items-center py-0">
                <input
                  id="default-radio-2"
                  type="radio"
                  value="Officer"
                  name="default-radio"
                  className="w-4 h-4  focus:ring-blue-500"
                  onClick={handleRadio}
                />
                <label
                  htmlFor="default-radio-2"
                  className="ml-3 text-l  text-white"
                >
                  Officer
                </label>
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
            </form>

            <p className="mt-6 text-sm text-center text-white">
              Don't have an account yet?{" "}
              <NavLink to="/" className="text-light-green hover:underline">
                Sign up
              </NavLink>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
