import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Loading from "./Loading";
export default function MyGrievance(props) {
  const token = localStorage.getItem("token");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/api/v1/complaints",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [grievances, setGrievances] = React.useState([]);
 grievances.sort(function (a, b) {
   return a.status > b.status ? 1 : b.status > a.status ? -1 : 0;
 });
  React.useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setGrievances(response.data.complaints);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [isVisible, setIsVisible] = React.useState(false);
  const [actionHistory, setActionHistory] = React.useState();
  function handleAction(grievance){
    setActionHistory(grievance.actionHistory)
    setIsVisible((prev) => !prev)
  }

  function handleReminder(id){
    setLoading(true)
    let config2 = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/v1/complaints/reminder/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config2)
      .then((response) => {
         setLoading(false);
        alert("Reminder Sent Successfully")
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const [loading, setLoading] = React.useState(false);

  const grievanceData = grievances.map((grievance) => (
    <Fragment>
      <tr
        class={
          grievance.status != "resolved" ? (grievance.status=="pending"?"bg-red":"bg-yellow"): "bg-green"
        }
      >
        <td class="px-4 py-3 text-ms font-semibold border">
          {moment(grievance.createdAt).format("DD/MM/YYYY HH:mm")}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {grievance.department}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {grievance.subject}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {grievance.status}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {grievance.status != "resolved" ? (
            grievance.lastRemindedAt == null || new Date().getDate() - new Date(grievance.lastRemindedAt).getDate()>1
            ) ? (
              <>
              <button
                className="bg-light-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={()=>handleReminder(grievance._id)}
              >
                reminder
              </button>
              {loading==true && <Loading /> }
              </>
            ) : (
              `Cooldown for ${
              7-(  new Date().getDate() -
                  new Date(grievance.lastRemindedAt).getDate())
              } more days`
            )
          : (
            "resolved"
          )}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          <button
            className="bg-light-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8"
            onClick={() => handleAction(grievance)}
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
    </Fragment>
  ));
function checkLogin() {
  if (!token) {
    navigate("/userAdminLogin");
  }
}
  return (
    <>{checkLogin}
    <div
      className={
        props.visible == "view"
          ? "p-4 view-grievance dashboard w-full md:w-3/4 h-100  pt-10  "
          : "hidden"
      }
    >
      <h1 className="text-center text-4xl md:text-7xl">MY GRIEVANCES</h1>
      <section class="container mx-auto font-mono">
        <div class="w-full pt-4 mb-8 overflow-y-scroll overflow-x-scroll h-120 rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th class="px-4 py-3">Date</th>
                  <th class="px-4 py-3">Department</th>
                  <th class="px-4 py-3">Grievance</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3">Reminder</th>
                  <th class="px-4 py-3 mx-auto">View Action History</th>
                </tr>
              </thead>
              <tbody class="bg-white">{grievanceData}</tbody>
            </table>
          </div>
        </div>
      </section>
    </div></>
  );
}
