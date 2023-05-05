import React from "react";
import axios from "axios";
import Modal from "./Modal";
import Loading from "./Loading";
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
    setLoading(true)
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
        setLoading(false)
        alert("Forwarded to next level Officer");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured:"+error.response.data.message);
      });  
    }
    const [loading, setLoading] = React.useState(false); 
    complaints.sort(function (a, b) {
      return a.status > b.status ? 1 : b.status > a.status ? -1 : 0;
    });
   const complaintData = complaints.map((complaint) => (
     <tr
       className={
         complaint.status == "pending"
           ? "bg-red"
           : complaint.status == "resolved"
           ? "bg-green"
           : "bg-yellow"
       }
     >
       <td className="px-4 py-3 text-ms font-semibold border">{complaint._id}</td>
       <td className="px-4 py-3 text-ms font-semibold border">
         {complaint.createdAt.slice(0, 10) +
           " at " +
           complaint.createdAt.slice(11, 16)}
       </td>
       <td className="px-4 py-3 text-ms font-semibold border">
         {complaint.department}
       </td>
       <td className="px-4 py-3 text-ms font-semibold border">
         {complaint.subject}
       </td>
       <td className="px-4 py-3 text-ms font-semibold border">
         {complaint.description}
       </td>
       <td className="px-4 py-3 text-ms font-semibold border">
         {complaint.contact}
       </td>
       <td className="px-4 py-3 text-ms font-semibold border">
         {complaint.status}
       </td>
       <td className="px-4 py-3 text-ms font-semibold border">
         {complaint.updatedAt
           ? complaint.updatedAt.slice(0, 10) +
             " at " +
             complaint.updatedAt.slice(11, 16)
           : "not updated"}
       </td>
       <td className="px-4 py-3 text-ms font-semibold border">
         {complaint.actionHistory[complaint.actionHistory.length - 1]
           .officerLevel != "3" &&
           complaint.status != "resolved" && (
             <>
               <button
                 className="bg-light-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                 onClick={() => handleForward(complaint)}
               >
                 Forward
               </button>
               {loading && <Loading />}
             </>
           )}
       </td>
       <td className="px-4 py-3 text-ms font-semibold border">
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
       <td className="px-4 py-3 text-ms font-semibold border">
         {complaint.status=="resolved"?(complaint.rating==null?"Not rated yet":complaint.rating):"Not resolved yet"}
       </td>
     </tr>
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
            ? "p-4 view-grievance dashboard w-full md:w-3/4 h-100  pt-10  "
            : "hidden"
        }
      >
        <h1 className="text-center font-bold text-3xl md:text-6xl">
          GRIEVANCES STATUS
        </h1>
        <div className="flex justify-center">
          <div className="md:w-5/6 mb-8 overflow-y-scroll overflow-x-scroll h-120 border-2 shadow-2xl rounded-xl mt-4 p-6">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray uppercase ">
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Created by</th>
                    <th className="px-4 py-3 mx-auto">Status</th>
                    <th className="px-4 py-3 mx-auto">UpdatedTime</th>
                    <th className="px-4 py-3 mx-auto">Forward</th>
                    <th className="px-4 py-3 mx-auto">Action History</th>
                    <th className="px-4 py-3 mx-auto">Rating</th>
                  </tr>
                </thead>
                <tbody className="bg-white">{complaintData}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
