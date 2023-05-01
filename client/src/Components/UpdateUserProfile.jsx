import React from "react";
import axios from "axios";
import Loading from "./Loading";
export default function UpdateUserProfile(props){

const [data, setData] = React.useState({
  name: "",
  age: "",
  phone: "",
  district: "",
});
function handleChange(e) {
  setData({ ...data, [e.target.name]: e.target.value });
}
const token = localStorage.getItem("token");
let config = {
  method: "patch",
  maxBodyLength: Infinity,
  url: "http://localhost:3000/api/v1/user",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  data: data,
};
function handleSubmit(e) {
  e.preventDefault();
  if (  data.name == "" || data.age == "" || data.phone == "" ||    data.district == "") {
    alert("Please fill all the fields");
    return;
  } else {
    setLoading(true);
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        alert("Profile Updated Successfully");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured:" + error.response.data.message);
      });
  }
}
const [loading,setLoading]=React.useState(false);
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
            props.visible == "update"
              ? "p-4 update-profile-content dashboard w-full md:w-3/4 h-100  pt-16"
              : "hidden"
          }
        >
          <h1 className="text-center text-4xl md:text-7xl font-semibold">
            UPDATE YOUR PROFILE
          </h1>
          <div className="mt-16 flex justify-center">
            <form
              action=""
              className="flex-row justify-between items-center border-2 w-11/12 md:w-4/6 rounded-xl p-6 shadow-2xl"
              onSubmit={handleSubmit}
            >
              <div className="name-input flex justify-center items-center mt-4">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
                  onChange={handleChange}
                />
              </div>
              <div className="name-input flex justify-center items-center mt-4 md:mt-8">
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Age"
                  className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
                  onChange={handleChange}
                />
              </div>
              <div className="name-input flex justify-center items-center mt-4 md:mt-8">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Contact Number"
                  className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
                  onChange={handleChange}
                />
              </div>
              <div className="name-input flex justify-center items-center mt-4 md:mt-8">
                <input
                  type="text"
                  name="district"
                  id="district"
                  placeholder="District"
                  className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
                  onChange={handleChange}
                />
              </div>
              {/* <div className="name-input flex justify-center items-center mt-4 md:mt-8">
               <label htmlFor="pfp">
                 <p className="text-xl md:text-3xl">PFP:</p>
               </label>
               <input
                 type="file"
                 name="pfp"
                 id="pfp"
                 placeholder=""
                 className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
               />
             </div> */}
              <div className="name-input flex justify-center items-center mt-8">
                <button
                  type="submit"
                  className="bg-light-green p-2 md:p-3 w-32 rounded-3xl text-white text-xl"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  UPDATE
                </button>
                {loading && <Loading />}
              </div>
            </form>
          </div>
        </div>
      </>
    );
}