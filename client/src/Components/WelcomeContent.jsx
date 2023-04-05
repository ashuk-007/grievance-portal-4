import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
export default function WelcomeContent() {
  const password = React.useRef();
  const cPassword = React.useRef();
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [cPasswordClass, setCPasswordClass] = React.useState("form-control");
  const [isCPasswordDirty, setIsCPasswordDirty] = React.useState(false);

  React.useEffect(() => {
    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) {
        setShowErrorMessage(false);
        setCPasswordClass("form-control is-valid");
      } else {
        setShowErrorMessage(true);
        setCPasswordClass("form-control is-invalid");
      }
    }
  }, [isCPasswordDirty]);

  const checkPasswords = (e) => {
    setIsCPasswordDirty(true);
    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) {
        setShowErrorMessage(false);
        setCPasswordClass("form-control is-valid");
      } else {
        setShowErrorMessage(true);
        setCPasswordClass("form-control is-invalid");
      }
    }
  };
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    district: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

const navigate=useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.current.value != cPassword.current.value) {
    alert("Passwords do not match");}
    else if(data.name=="" || data.email=="" || data.password=="" || data.age=="" || data.phone=="" || data.district==""){
      alert("Please fill all the fields");
    }
    else{
   try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        data
      );
      console.log(response)
       navigate("/userlogin", {
         state: {
           token: response.data.token,
         },
         replace: true,
       });
    } catch (error) {
      console.log(error);
      alert("User already exists");
    }
  
} 
  }

  return (
    <div className="welcome-content flex-row md:flex justify-between md:h-100">
      <div className="w-full md:w-2/3 h-64 md:relative">
        <h1 className="pl-0 md:pl-32 text-center md:text-left text-5xl md:text-8xl pt-16 md:pt-48 font-semibold text-dark-blue">
          WELCOME TO GRIEVSOL
        </h1>
        <h3 className="text-center md:text-left pl-0 md:pl-32 text-l md:text-2xl text-dark-blue mt-2 md:mt-6 mb-8 md:mb-0">
          An initiative by Government of India
        </h3>
      </div>
      <div className="w-3/4 m-auto mt-2 mb-10  md:mb-0 md:m-0 rounded-md md:rounded-none md:w-1/3 bg-dark-blue overflow-hidden">
        <h1 className="text-3xl md:text-4xl text-white ml-16 md:ml-0 md:text-left  md:pl-16 pt-8 md:pt-20 md:mb-8">
          SIGN UP
        </h1>
        <form action="">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mt-4 mb-4 md:m-0 md:mt-4"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password(min 6)"
            className="form-control w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4"
            ref={password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            className={
              cPasswordClass +
              ` w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4`
            }
            onChange={checkPasswords}
            ref={cPassword}
          />
          <input
            type="phone"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            className="form-control w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4"
            onChange={handleChange}
          />

          <div className="w-80 hidden justify-between mt-4 ml-16 md:flex md:visible">
            <input
              type="text"
              name="district"
              id="district"
              placeholder="District"
              className="rounded-md w-48 p-2 md:p-3"
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Age(>18)"
              className="rounded-md w-24 p-2 md:p-3"
              onChange={handleChange}
            />
          </div>
          <div className="md:hidden">
            <input
              type="text"
              name="district"
              id="district"
              placeholder="District"
              className="w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4"
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              id="age"
              placeholder="age(>18)"
              className="w-48 md:w-80 p-2 md:p-3 rounded-md md:ml-16 ml-12 mb-4  md:m-0 md:mt-4"
              onChange={handleChange}
            />
          </div>
          <div className="m-auto md:ml-16 ml-12 mb-8">
            <h3 className="text-white mt-4">
              Already have an account?{" "}
              <NavLink to="/userlogin" className="text-light-green">
                Login
              </NavLink>
            </h3>
          </div>
          <div className="w-80 flex justify-center mt-2 md:mt-2 ml-16  ">
            <button
              type="submit"
              className="hover:animate-bounce ml-0 md:ml-16 md:w-48 bg-light-green text-white p-3 rounded-3xl m-auto mb-4 md:m-auto  "
              onClick={handleSubmit}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
