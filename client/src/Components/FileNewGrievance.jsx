import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import Loading from './Loading';
function FileNewGrievance(props) {
  const [data, setData] = React.useState({subject:"", description:"", department:""});
  const [submit, setSubmit] = React.useState(false);
  function handleChange(e){
    setData({...data, [e.target.name]: e.target.value});
  }
  const token = localStorage.getItem("token");
 let config = {
   method: "post",
   maxBodyLength: Infinity,
   url: "http://localhost:3000/api/v1/complaints/",
   headers: {
     Authorization:
       `Bearer ${token}`,
     "Content-Type": "application/json",
   },
   data: data,
 };
  function handleSubmit(e){
    console.log(data)
    e.preventDefault();
    if(data.subject=="" || data.description=="" || data.department==""){
      alert("Please fill all the fields");
    }
    else{
      setLoading(true)
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setSubmit(true);
          setLoading(false)
          alert("Grievance Filed Successfully")
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
          alert("Error Occured:"+error.response.data.message);
        });
    }

  }
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
          props.visible == "new"
            ? "p-4 update-profile-content dashboard w-full md:w-3/4 h-100  pt-10"
            : "hidden"
        }
      >
        <h1 className="md:text-7xl text-4xl font-bold text-black capitalize dark:text-black py-4 text-center px-20  ">
          File New Grievance
        </h1>
        <div className='flex justify-center'>
          <form className="border-2 shadow-2xl p-6 mt-8 w-11/12 md:w-4/6 rounded-xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 px-4">
              <div>
                <label className="text-black dark:text-gray-200" htmlFor="Dept">
                  Department
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={(e) => handleChange(e)}
                  name="department"
                  value={data.department}
                >
                  <option>--SELECT--</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Transport">Transport</option>
                  <option value="Pension">Pension</option>
                  <option value="other">other</option>
                </select>
              </div>

              <div>
                <label
                  className="text-black dark:text-gray-200"
                  htmlFor="Subject"
                >
                  Subject
                </label>
                <input
                  id="Subject"
                  name="subject"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={(e) => handleChange(e)}
                />
                {loading == true && <Loading />}
              </div>
              <div>
                <label
                  className="text-black dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Write your complaint
                </label>
                <textarea
                  id="textarea"
                  name="description"
                  type="textarea"
                  className="block w-full px- py-8 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-around mt-6 " color="black">
              <button
                type="submit"
                className="bg-light-green p-2 md:p-3 w-32 rounded-3xl text-white text-xl"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
            <div className="text-light-green flex justify-center mt-3">
              {submit ? "Your complaint has been filed" : ""}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FileNewGrievance;
