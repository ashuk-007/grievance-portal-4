import React from "react";
import axios from "axios";
export default function GrievanceStatus(props) {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/api/v1/tasks",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [complaints, setComplaints] = React.useState([]);
  React.useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setComplaints(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured");
      });
  }, []);
  const complaintData = complaints.map((complaint) => <tr>
            <td className="border px-4 py-1 whitespace-nowrap">{complaint._id}</td>
            <td className="border px-4 py-1 whitespace-nowrap">{complaint.createdAt}</td>
            <td className="border px-8 py-2 whitespace-nowrap">{complaint.department}</td>
            <td className="border px-8 py-2 whitespace-nowrap">{complaint.subject}</td>
            <td className="border px-8 py-2 whitespace-nowrap">{complaint.description}</td>
            <td className="border px-8 py-2 whitespace-nowrap">{complaint.status}</td>
            <td className="border px-8 py-2 whitespace-nowrap">{complaint.updatedAt?complaint.updatedAt:"not updated"}</td>
            <td className="border px-3 py-2 whitespace-nowrap">reminder</td> 
          </tr>)
  return (
    <div
      class={
        props.visible == "view"
          ? "p-4 view-grievance dashboard w-full md:w-3/4 h-100  pt-10  "
          : "hidden"
      }
    >
      <h1 className="text-center font-bold text-3xl md:text-6xl">
        GRIEVANCES STATUS
      </h1>
      {/* // index.html */}
      <div className="px-5 py-5  overflow-auto rounded-lg shadow mt-16 md:mt-36">
        <table className="rounded-lg shadow bg-while w-full left-5">
          <tr>
            <th className="bg-blue-100 border text-left px-8 py-2">ID</th>
            <th className="bg-blue-100 border text-left px-8 py-2">Time</th>
            <th className="bg-blue-100 border text-left px-8 py-2">
              Department
            </th>
            <th className="bg-blue-100 border text-left px-20 py-2">Subject</th>
            <th className="bg-blue-100 border text-left px-8 py-2">
              Description
            </th>
            <th className="bg-blue-100 border text-left px-8 py-2">Status</th>
            <th className="bg-blue-100 border text-left px-8 py-2">UpdatedTime</th>
            <th className="bg-blue-100 border text-left px-3 py-2">Reminder</th>
          </tr>
          {complaintData}
        </table>
      </div>
    </div>
  );
}
