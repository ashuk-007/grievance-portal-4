import React from 'react'
import pfp from "../Images/pfp.png";
import axios from "axios";
import Loading from "./Loading";
export default function MainAdminProfile(props) {
    const [loading, setLoading] = React.useState(false);
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
                {/* {officerData.name} */}
              </h4>
            </div>
            <div className="name-input flex justify-center items-center mt-6 md:mt-10">
              <h4 className="text-xl md:text-3xl font-bold ml-6">Email:</h4>
              {"\n"}
              <h4 className="text-xl md:text-3xl ml-4 md:ml-8">
                {/* {officerData.email} */}
              </h4>
            </div>
            <div className="name-input flex justify-center items-center mt-6 md:mt-10">
              <h4 className="text-xl md:text-3xl font-bold ml-6">
                Designation:
              </h4>
              <h4 className="text-xl md:text-3xl ml-4 md:ml-8">
                {/* {officerData.level == 1
                  ? "Gram Panchayat"
                  : officerData.level == 2
                  ? "Tehsildar"
                  : "Municipal Corporation officer"} */}
              </h4>
            </div>
            <div className="name-input flex justify-center items-center mt-6 md:mt-10">
              <h4 className="text-xl md:text-3xl font-bold ml-6">
                Department:
              </h4>
              <h4 className="text-xl md:text-3xl ml-4 md:ml-8">
                {/* {officerData.department} */}
              </h4>
            </div>
            <div className="name-input flex justify-center items-center mt-6 md:mt-10">
              <h4 className="text-xl md:text-3xl text-center font-bold ml-6">
                District:
              </h4>
              <h4 className="text-xl md:text-3xl text-center ml-4 md:ml-8">
                {/* {officerData.district} */}
              </h4>
            </div>
            <div className="name-input flex justify-center items-center mt-6 md:mt-10">
              <h4 className="text-xl md:text-3xl text-center font-bold ml-6">
                Rating:
              </h4>
              <h4 className="text-xl md:text-3xl text-center ml-4 md:ml-8">
                {/* {officerRatingData.avgRating == null
                  ? "Not Rated"
                  : officerRatingData.avgRating} */}
              </h4>
            </div>
          </div>
        </div>
      </div>
      {loading == true && <Loading />}
    </>
  );
}
