import React from 'react'

export default function Modal(props) {
  if(!props.visible)return null;
  console.log(props.data)
  let i=1
  const data=props.data.map((action)=>{
    return (
      <tr className="mb-4 border border-black p-4 rounded-lg">
        <td class="px-4 py-3 text-ms font-semibold border">{i++}</td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {action.officerName}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {action.officerLevel}
        </td>
        <td class="px-4 py-3 text-ms font-semibold border">{action.time}</td>
        <td class="px-4 py-3 text-ms font-semibold border">
          {action.feedback}
        </td>
      </tr>
    );
  })
  i=1;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur flex justify-center items-center">
      <div className="w-2/3 flex flex-col ">
        <button
          className="text-xl place-self-end mr-2 text-white"
          onClick={() => props.setVisible(!props.visible)}
        >
          X
        </button>
        <div className="bg-white p-4 border border-black rounded-lg h-100 overflow-x-scroll overflow-y-scroll flex justify-center">
          <table>
            <thead className='text-center'>Action History</thead>
            <tr>
              <th>S No.</th>
              <th>Officer Name</th>
              <th>Officer Level</th>
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
