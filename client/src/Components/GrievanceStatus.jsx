import React from "react";
import axios from "axios";
import Modal from "./Modal";
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
  const [id,setId]=React.useState("")
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
  const [isVisible, setIsVisible] = React.useState(false);
  const [actionHistory, setActionHistory] = React.useState();
  function handleAction(complaint) {
    setActionHistory(complaint.actionHistory);
    setIsVisible((prev) => !prev);
  }
  function handleForward(complaint){
    setId(complaint._id)
    handleLevelForward(complaint._id)
  }
  function handleLevelForward(id){
    let level = JSON.stringify({});
    let config2 = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/v1/tasks/pass/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: level,
    };
    axios
      .request(config2)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });  
    }

    complaints.sort(function (a, b) {
      return a.status > b.status ? 1 : b.status > a.status ? -1 : 0;
    });
   const complaintData = complaints.map((complaint) => (
     <tr
       class={complaint.status == "pending" ? "bg-red-" :complaint.status=="resolved"?"bg-green":"bg-yellow"}
     >
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
         {complaint.actionHistory[complaint.actionHistory.length - 1].level !=
           "3" ||
           (complaint.status != "resolved" && (
             <button
               className="bg-light-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
               onClick={() => handleForward(complaint)}
             >
               Forward
             </button>
           ))}
       </td>
       <td class="px-4 py-3 text-ms font-semibold border">
         <button
           className="bg-light-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           onClick={() => handleAction(complaint)}
         >
           View
         </button>
         <Modal
           visible={isVisible}
           setVisible={setIsVisible}
           data={actionHistory}
         />
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
            <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray uppercase ">
              <th class="px-4 py-3">ID</th>
              <th class="px-4 py-3">Time</th>
              <th class="px-4 py-3">Department</th>
              <th class="px-4 py-3">Subject</th>
              <th class="px-4 py-3">Description</th>
              <th class="px-4 py-3 mx-auto">Status</th>
              <th class="px-4 py-3 mx-auto">UpdatedTime</th>
              <th class="px-4 py-3 mx-auto">Forward</th>
              <th class="px-4 py-3 mx-auto">Action History</th>
            </tr>
          </thead>
          <tbody class="bg-white">{complaintData}</tbody>
        </table>
        </div>
        </div>
    </div>
  );
}
