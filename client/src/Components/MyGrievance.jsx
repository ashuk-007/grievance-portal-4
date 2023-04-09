import React from "react";
import axios from "axios";
import moment from 'moment';

export default function MyGrievance(props) {
  const token = localStorage.getItem("token");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/v1/complaints',
    headers: { 
      Authorization: `Bearer ${token}`,
    },
  };
  const [grievances, setGrievances] = React.useState([]);

  React.useEffect(() => {
    axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    setGrievances(response.data.complaints);
  })
  .catch((error) => {
    console.log(error);
  });
  },[]);
  const grievanceData = grievances.map((grievance) => <tr>
            <td className="border px-4 py-1 ">{moment(grievance.createdAt).format('DD/MM/YYYY HH:mm')}</td>
            <td className="border px-4 py-1">{grievance.department}</td>
            <td className="border px-8 py-2">{grievance.subject}</td>
            <td className="border px-8 py-2">{grievance.status}</td>
            <td className="border px-8 py-2 ">reminder</td>
            </tr>)
  

  return (
    
    <div
      className={
        props.visible == "view"
          ? "p-4 view-grievance dashboard w-full md:w-3/4 h-100  pt-10  "
          : "hidden"
      }
    >
      <h1 className="text-center text-4xl md:text-7xl">MY GRIEVANCES</h1>
      {/* // index.html */}
      {/* table starts here */}
      <div className="px-5 py-5">
        <table className="rounded-lg shadow bg-while w-full left-5">
        <thead>
            <tr>
              <th className="bg-blue-100 border text-left px-8 py-2">Date</th>
              <th className="bg-blue-100 border text-left px-8 py-2">
                Department
              </th>
              <th className="bg-blue-100 border text-left px-20 py-2">
                Grievance
              </th>
              <th className="bg-blue-100 border text-left px-8 py-2">Status</th>
              <th className="bg-blue-100 border text-left px-3 py-2">
                Reminder
              </th>
            </tr>
            </thead>
            <tbody>
              {grievanceData}
            </tbody>
        </table>
      </div>
    </div>
  );
}
