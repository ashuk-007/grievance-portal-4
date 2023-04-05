import React from "react";

export default function MyGrievance(props) {
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
      <div className="px-5 py-5  overflow-auto rounded-lg shadow">
        <table className="rounded-lg shadow bg-while w-full left-5">
        <tbody>
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
            <tr>
              <td className="border px-4 py-1 whitespace-nowrap">12-12-22</td>
              <td className="border px-8 py-2 whitespace-nowrap">water</td>
              <td className="border px-8 py-2 whitespace-nowrap">Dante </td>
              <td className="border px-8 py-2 whitespace-nowrap">Italy</td>
              <td className="border px-8 py-2 whitespace-nowrap">send</td>
            </tr>
            <tr>
              <td className="border px-4 py-1 whitespace-nowrap">12-12-22</td>
              <td className="border px-8 py-2 whitespace-nowrap">water</td>
              <td className="border px-8 py-2 whitespace-nowrap">Neal Garrison</td>
              <td className="border px-8 py-2 whitespace-nowrap">Spain</td>
              <td className="border px-8 py-2 whitespace-nowrap">send</td>
            </tr>
            <tr>
              <td className="border px-4 py-1 whitespace-nowrap">12-12-22</td>
              <td className="border px-8 py-2 whitespace-nowrap">water</td>
              <td className="border px-8 py-2 whitespace-nowrap">Maggie O'Neill</td>
              <td className="border px-8 py-2 whitespace-nowrap">Austria</td>
              <td className="border px-8 py-2 whitespace-nowrap">send</td>
            </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
