import React from 'react'

export default function Modal(props) {
  if(!props.visible)return null;
  console.log(props.data)
  let i=1
  const data=props.data.map((action)=>{
    return (
      <tr className="mb-4 border border-black p-4 rounded-lg">
        <td className="px-4 py-3 text-ms font-semibold border">{i++}</td>
        <td className="px-4 py-3 text-ms font-semibold border">
          {action.officerName}
        </td>
        <td className="px-4 py-3 text-ms font-semibold border">
          {action.officerLevel==1?"Gram panchayat":action.officerLevel==2?"Tehsildar":"Municipal Corporation Officer"}
        </td>
        <td className="px-4 py-3 text-ms font-semibold border">
          {action.time.slice(0, 10) +
            " at " +
            action.time.slice(11, 16)}
        </td>
        <td className="px-4 py-3 text-ms font-semibold border">
          {action.feedback}
        </td>
      </tr>
    );
  })
  i=1;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur flex justify-center items-center">
      <div className="w-full md:w-2/3 flex flex-col ">
        <button
          className="text-xl place-self-end mr-4 md:mr-2 text-white"
          onClick={() => props.setVisible(!props.visible)}
        >
          X
        </button>
        <div className="bg-white p-4 border border-black rounded-lg h-96 md:h-100 overflow-x-scroll overflow-y-scroll flex justify-center">
          <table>
            <thead className='text-center'>Action History</thead>
            <tr>
              <th>S No.</th>
              <th>Officer Name</th>
              <th>Officer Designation</th>
              <th>Time of action</th>
              <th>Feedback</th>
            </tr>
            <tbody>{data}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
