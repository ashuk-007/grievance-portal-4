import React from "react";
import axios from "axios";
import Loading from "./Loading";
export default function UpdateStatus(props) {
  const token=localStorage.getItem("token")
  const [id, setId] = React.useState("");
  function handleIDChange(e) {
    setId(e.target.value);
  }
  const [data, setData] = React.useState({
    status: "pending",
    feedback:"" 
  });
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
 let config = {
   method: "get",
   maxBodyLength: Infinity,
   url: `http://localhost:3000/api/v1/tasks/${id}`,
   headers: {
     Authorization:
       `Bearer ${token}`,
   },
 };
 let config2 = {
   method: "patch",
   maxBodyLength: Infinity,
   url: `http://localhost:3000/api/v1/tasks/feedback/${id}`,
   headers: {
     Authorization:
       `Bearer ${token}`,
     "Content-Type": "application/json",
   },
   data: data,
 };
 const [loading, setLoading] = React.useState(false);
 function onSubmit(e){
  e.preventDefault()
  if(data.status=="" && data.feedback==""){
    alert("Please fill all the fields");
    return;
  }
  else{
    setLoading(true);
    axios
      .request(config2)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        alert("Status Updated");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured:"+error.response.data.message);
      }); 
  }
 }
 const [complaint, setComplaint] = React.useState({
  subject:"",
  description:"",
  department:"",
  status:"",
  createdAt:""
 })
  function onSubmitId(e){
    e.preventDefault();
    if(id==""){
      alert("Please enter the grievance ID");
    }
    else{
      setLoading(true);
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setComplaint(response.data.complaint)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  console.log(data.status)
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
          props.visible == "new"
            ? "p-4 view-grievance dashboard w-full md:w-3/4 h-screen  md:pb-0 pt-4  "
            : "hidden"
        }
      >
        <h1 className="text-2xl text-center md:hidden">
          Enter the Grievance ID:
        </h1>
        <div className="flex justify-center mt-4">
          <div className="get-details-form flex justify-center border-2 w-4/6 p-4 rounded-xl shadow-2xl">
            <form action="" className="px-3">
              <label
                htmlFor="id"
                className="hidden md:block mx-auto md:mb-4 text-xl font-medium text-center"
              >
                ENTER THE GRIEVANCE ID:
              </label>
              <input
                type="text"
                id="id"
                placeholder="Grievance ID"
                className="border1 border border-black mx-auto  md:ml-3 md:mt-0 rounded-md p-1"
                name="id"
                onChange={handleIDChange}
              />
              <button
                type="submit"
                className=" hover:animate-bounce border-1 border-black border p-2 ml-2  md:m-0 rounded-xl bg-light-green text-white md:ml-8"
                onClick={(e) => onSubmitId(e)}
              >
                GET DETAILS
              </button>
              {loading && <Loading />}
            </form  >
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl text-center mt-4 md:mt-10 font-semibold">
          GRIEVANCE INFORMATION
        </h1>
        <div className="flex justify-center md:mt-8">
          <form
            action=""
            className=" mt-4 md:mt-10 px-6 border-2 p-6 rounded-xl shadow-2xl md:w-4/6"
          >
            <div className="md:flex justify-start mx-auto items-center mb-4">
              <div className="name flex justify-start mx-auto md:m-0 items-center">
                <h1 className="text-lg md:text-xl font-semibold">Subject:</h1>
                <h1 className="text-lg md:text-xl ml-2 md:ml-4">
                  {complaint.subject}
                </h1>
              </div>
            </div>

            <div className="name flex justify-start mx-auto mt-6 ">
              <h1 className="text-lg md:text-xl font-semibold">Description:</h1>
              <h1 className="text-lg md:text-xl ml-2 md:ml-4">
                {complaint.description}
              </h1>
            </div>
            <div className="md:flex justify-start items-center mt-6">
              <div className="name flex justify-start mx-auto md:m-0 items-center">
                <h1 className="text-lg md:text-xl font-semibold">
                  Department:
                </h1>
                <h1 className=" text-lg md:text-xl ml-2 md:ml-4">
                  {complaint.department}
                </h1>
              </div>
              <div className="name flex justify-start mx-auto md:ml-16 mt-2 md:mt-0 items-center">
                <h1 className="text-lg md:text-xl font-semibold">
                  Current Status:
                </h1>
                <h1 className="text-lg md:text-xl ml-2 md:ml-4">
                  {complaint.status}
                </h1>
              </div>
            </div>
            {complaint.status != "resolved" && (
              <>
                <div className="name flex justify-start mx-auto mt-2 md:mt-6 items-center">
                  <label
                    htmlFor="status"
                    className="text-lg md:text-xl font-semibold"
                  >
                    Status:
                  </label>
                  <select
                    name="status"
                    id="status"
                    className="border1 border border-black mx-auto  md:ml-3 md:mt-0 rounded-md p-1"
                    value={data.status}
                    onChange={handleChange}
                  >
                    <option value="pending">pending</option>
                    <option value="in process">in process</option>
                    <option value="resolved">resolved</option>
                  </select>
                </div>
                <div className="flex justify-center"></div>
                <div className="name flex mx-auto mt-2 md:mt-6 items-center">
                  <label
                    htmlFor="feedback"
                    className="text-lg md:text-xl font-semibold"
                  >
                    Feedback:
                  </label>
                  <input
                    type="text"
                    name="feedback"
                    id="feedback"
                    placeholder="Enter Feedback"
                    className="border1 border border-black mx-auto ml-4 md:ml-3 md:mt-0 rounded-md p-1"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-row md:flex justify-between pb-10 md:pb-0   items-center mt-4">
                  <div className="name flex justify-center mt-2 md:mt-0 items-center">
                    <h1 className="text-lg md:text-xl font-semibold">
                      Date of Filing:
                    </h1>
                    <h1 className="text-lg md:text-xl ml-2 md:ml-4">
                      {complaint.createdAt.slice(0, 10)}
                    </h1>
                  </div>
                  <button
                    type="submit"
                    className="hover:animate-bounce border-1 border-black border p-3 md:w-36 ml-28 mt-4 md:mt-0 rounded-xl bg-light-green text-white "
                    onClick={(e) => onSubmit(e)}
                  >
                    Submit
                  </button>
                  {loading && <Loading />}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
