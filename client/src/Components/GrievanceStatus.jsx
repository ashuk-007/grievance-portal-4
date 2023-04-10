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
   const complaintData = complaints.map((complaint) => (

     <tr class="text-gray-700">
       <td class="px-4 py-3 text-ms font-semibold border">{complaint._id}</td>
       <td class="px-4 py-3 text-ms font-semibold border">
         {complaint.createdAt.slice(0, 10) +
           " at " +
           complaint.createdAt.slice(11, 16)}
       </td>
       <td class="px-4 py-3 text-ms font-semibold border">
         {complaint.department}
       </td>
       <td class="px-4 py-3 text-ms font-semibold border">
         {complaint.subject}
       </td>
       <td class="px-4 py-3 text-ms font-semibold border">
         {complaint.description}
       </td>
       <td class="px-4 py-3 text-ms font-semibold border">
         {complaint.status}
       </td>
       <td class="px-4 py-3 text-ms font-semibold border">
         {complaint.updatedAt ? complaint.updatedAt : "not updated"}
       </td>
       <td class="px-4 py-3 text-ms font-semibold border">
         <button
           className="bg-light-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           
         >
          Forward
         </button>
       </td>
     </tr>
   ));
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
        <div class="w-full mb-8 overflow-y-scroll overflow-x-scroll h-120 rounded-lg shadow-lg pt-8">
          <div class="w-full overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th class="px-4 py-3">ID</th>
              <th class="px-4 py-3">Time</th>
              <th class="px-4 py-3">Department</th>
              <th class="px-4 py-3">Subject</th>
              <th class="px-4 py-3">Description</th>
              <th class="px-4 py-3 mx-auto">Status</th>
              <th class="px-4 py-3 mx-auto">UpdatedTime</th>
              <th class="px-4 py-3 mx-auto">Forward</th>
            </tr>
          </thead>
          <tbody class="bg-white">{complaintData}</tbody>
        </table>
        </div>
        </div>
    </div>
  );
}
