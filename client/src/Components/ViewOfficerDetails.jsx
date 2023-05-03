import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import Modal from "./Modal";
import Loading from "./Loading";
export default function MyGrievance(props) {
  const [officerDetails, setOfficerDetails] = React.useState([]);
 
  const [isVisible, setIsVisible] = React.useState(false);


  const [loading, setLoading] = React.useState(false);
  const grievances=[]
  const grievanceData = grievances.map((grievance) => (
    <Fragment>
      <tr>
        <td class="px-4 py-3 text-ms font-semibold border">
          {/* {moment(grievance.createdAt).format("DD/MM/YYYY HH:mm")} */}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {/* {grievance.department} */}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {/* {grievance.subject} */}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {/* {grievance.status} */}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {/* {grievance.status != "resolved" ? (
            grievance.lastRemindedAt == null ||
            new Date().getDate() -
              new Date(grievance.lastRemindedAt).getDate() >
              1 ? (
              <>
                <button
                  className="bg-light-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleReminder(grievance._id)}
                >
                  reminder
                </button>
                {loading == true && <Loading />}
              </>
            ) : (
              `Cooldown for ${
                7 -
                (new Date().getDate() -
                  new Date(grievance.lastRemindedAt).getDate())
              } more days`
            )
          ) : (
            "resolved"
          )} */}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {/* <button
            className="bg-light-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleAction(grievance)}
          >
            View
          </button>
          <Modal
            visible={isVisible}
            setVisible={setIsVisible}
            data={actionHistory}
          /> */}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {/* {grievance.status == "resolved" && grievance.isRated == false && (
            <button
              className="bg-light-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  "
              onClick={() => handleReopen(grievance._id)}
            >
              Reopen
            </button>
          )} */}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {/* {grievance.status == "resolved" && grievance.isRated == false ? (
            <form className="flex justify-evenly">
              <select
                name="rating"
                id="rating"
                value={rating}
                className="rounded-2xl"
                onChange={changeRating}
              >
                <option value="">--Rate--</option>
                <option value={1}>1 Star</option>
                <option value={2}>2 Star</option>
                <option value={3}>3 Star</option>
                <option value={4}>4 Star</option>
                <option value={5}>5 Star</option>
              </select>
              <button
                className="bg-light-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 "
                onClick={() => handleRating(grievance._id)}
              >
                Rate
              </button>
            </form>
          ) : grievance.status == "resolved" ? (
            "Thank you for your feedback"
          ) : (
            "We are working on it"
          )} */}
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
        <h1 className="text-center text-4xl md:text-7xl font-semibold">
          OFFICER DETAILS
        </h1>
        <section class="container mx-auto font-mono flex justify-center">
          <div class=" pt-4 mb-8 overflow-y-scroll overflow-x-scroll h-120  mt-4 border-2 shadow-2xl rounded-xl p-6 overflow-hidden w-11/12 md:w-5/6">
            <div class="w-full overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th class="px-4 py-3">ID</th>
                    <th class="px-4 py-3">Name</th>
                    <th class="px-4 py-3">Department</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Reminder</th>
                    <th class="px-4 py-3 mx-auto">View Action History</th>
                    <th class="px-4 py-3 mx-auto">Reopen</th>
                    <th class="px-4 py-3 mx-auto">Give Rating</th>
                  </tr>
                </thead>
                <tbody class="bg-white">{grievanceData}</tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
