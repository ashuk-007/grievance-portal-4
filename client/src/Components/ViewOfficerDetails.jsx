import React, { Fragment } from "react";
import axios from "axios";
import Loading from "./Loading";
export default function MyGrievance(props) {
  const [officerDetails, setOfficerDetails] = React.useState([]);
  const token=localStorage.getItem("token");
     let config = {
       method: "get",
       maxBodyLength: Infinity,
       url: "http://localhost:3000/api/v1/manage/getOfficerData",
       headers: {
         Authorization: `Bearer ${token}`,
       },
     };
     const [loading,setLoading]=React.useState(true)
  React.useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setOfficerDetails(response.data.data);
      
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  },[])
    officerDetails.sort(function (a, b) {
      return a.department > b.department
        ? 1
        : b.department > a.department
        ? -1
        : 0;
    });
  const officerData = officerDetails.map((officer) => (
    <Fragment>
      <tr>
        <td className="px-4 py-3 text-ms font-semibold border">{officer._id}</td>
        <td className="px-4 py-3 text-ms font-semibold border">{officer.name}</td>
        <td className="px-4 py-3 text-ms font-semibold border">{officer.email}</td>
        <td className="px-4 py-3 text-ms font-semibold border">
          {officer.department}
        </td>
        <td className="px-4 py-3 text-ms font-semibold border">{officer.level}</td>
        <td className="px-4 py-3 text-ms font-semibold border">
          {officer.avgRating==null?"not rated yet":officer.avgRating}
        </td>
        <td className="px-4 py-3 text-ms font-semibold border">
          {officer.pendingCount}
        </td>
        <td className="px-4 py-3 text-ms font-semibold border">
          {officer.inProcessCount}
        </td>
        <td className="px-4 py-3 text-ms font-semibold border">
          {officer.resolvedCount}
        </td>
      </tr>
    </Fragment>
  ));
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
          props.visible == "view"
            ? "p-4 view-officer-details dashboard w-full md:w-3/4 h-100  pt-10  "
            : "hidden"
        }
      >
      {loading && <Loading />}
        <h1 className="text-center text-4xl md:text-7xl font-semibold">
          OFFICER DETAILS
        </h1>
        <section className="container mx-auto font-mono flex justify-center">
          <div className=" pt-4 mb-8 overflow-y-scroll overflow-x-scroll h-120  mt-4 border-2 shadow-2xl rounded-xl p-6 overflow-hidden w-11/12 md:w-5/6">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3 mx-auto">Avg Rating</th>
                    <th className="px-4 py-3 mx-auto">Pending</th>
                    <th className="px-4 py-3 mx-auto">In Process</th>
                    <th className="px-4 py-3 mx-auto">Resolved</th>
                  </tr>
                </thead>
                <tbody className="bg-white">{officerData}</tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
