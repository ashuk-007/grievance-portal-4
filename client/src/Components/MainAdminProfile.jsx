import React from 'react'
import pfp from "../Images/pfp.png";
import axios from "axios";
import Loading from "./Loading";
export default function MainAdminProfile(props) {
    const [adminData,setAdminData]=React.useState({})
    const token = localStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/v1/manage/",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    };
    React.useState(() => {
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setAdminData(response.data.admin)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        }); 
    }, []);
    const [loading, setLoading] = React.useState(true);
    function checkLogin() {
        if (!token) {
            navigate("/userAdminLogin");
        }
    }
  return (
    <>
      {checkLogin}
      <div
        className={
          props.visible == "profile" && loading == false
            ? "p-4 view-profile-content dashboard w-full md:w-3/4 h-100  pt-16 "
            : "hidden"
        }
      >
        <img src={pfp} alt="pfp" className="mx-auto md:hidden w-1/2 mb-16" />
        <h1 className="text-center text-3xl  md:text-7xl font-semibold">
          YOUR PROFILE
        </h1>
        <div className="flex justify-center">
          <div className="border-2 mix-blend- shadow-2xl w-11/12  md:w-4/6 mt-6 md:mt-12 p-8 rounded-xl">
            <div className="name-input flex justify-center items-center">
              <h4 className="text-xl md:text-3xl font-bold ml-6">Name:</h4>
              <h4 className="text-xl md:text-3xl ml-4 md:ml-8">
                {adminData.name}
              </h4>
            </div>
            <div className="name-input flex justify-center items-center mt-6 md:mt-10">
              <h4 className="text-xl md:text-3xl font-bold ml-6">Email:</h4>
              {"\n"}
              <h4 className="text-xl md:text-3xl ml-4 md:ml-8">
               {adminData.email} 
              </h4>
            </div>
            <div className="name-input flex justify-center items-center mt-6 md:mt-10">
              <h4 className="text-xl md:text-3xl font-bold ml-6">
                Role:
              </h4>
              <h4 className="text-xl md:text-3xl ml-4 md:ml-8">
                {adminData.role}
              </h4>
            </div>
            <div className="name-input flex justify-center items-center mt-6 md:mt-10">
              <h4 className="text-xl md:text-3xl text-center font-bold ml-6">
                District:
              </h4>
              <h4 className="text-xl md:text-3xl text-center ml-4 md:ml-8">
                {adminData.district}
              </h4>
            </div>
          </div>
        </div>
      </div>
      {loading == true && <Loading />}
    </>
  );
}
