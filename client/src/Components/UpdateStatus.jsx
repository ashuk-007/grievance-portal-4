import React from "react";

export default function UpdateStatus(props) {
  return (
    <div
      class={
        props.visible == "new"
          ? "p-4 view-grievance dashboard w-full md:w-3/4 h-screen  md:pb-0 pt-4  "
          : "hidden"
      }
    >
      <h1 className="text-2xl text-center md:hidden">
        Enter the Grievance ID:
      </h1>
      <div className="get-details-form flex justify-center">
        <form action="" className="px-3">
          <label
            htmlFor="id"
            className="hidden md:block mx-auto md:mb-4 text-xl font-medium text-center"
          >
            ENTER THE GRIEVANCE ID:
          </label>
          <input
            type="text"
            id="id"
            placeholder="Grievance ID"
            className="border1 border border-black mx-auto  md:ml-3 md:mt-0 rounded-md p-1"
          />
          <button
            type="submit"
            className=" hover:animate-bounce border-1 border-black border p-2 ml-2  md:m-0 rounded-xl bg-light-green text-white md:ml-8"
          >
            GET DETAILS
          </button>
        </form>
      </div>

      <h1 className="text-3xl md:text-5xl text-center mt-4 font-semibold">
        GRIEVANCE INFORMATION
      </h1>
      <form action="" className="mt-10 px-6">
        <div className="md:flex justify-start mx-auto items-center mb-4">
          <div className="name flex justify-start mx-auto md:m-0 items-center">
            <h1 className="text-lg md:text-2xl font-semibold">Name:</h1>
            <h1 className="text-lg md:text-2xl ml-2 md:ml-4">
              Vishesh Vijayvargiya
            </h1>
          </div>
          <div className="name flex justify-start mx-auto md:ml-16 mt-2 md:mt-0 items-center">
            <h1 className="text-lg md:text-2xl font-semibold">Phone:</h1>
            <h1 className="text-lg md:text-2xl ml-2 md:ml-4">0123456789</h1>
          </div>
        </div>

        <div className="name flex justify-start mx-auto mt-6 ">
          <h1 className="text-lg md:text-2xl font-semibold">Grievance:</h1>
          <h1 className="text-lg md:text-2xl ml-2 md:ml-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
            neque fugiat fuga modi tempore. Id, neque. Reiciendis ab ut sunt
            numquam non explicabo velit incidunt, amet illum distinctio ratione
            reprehenderit!
          </h1>
        </div>
        <div className="md:flex justify-start items-center mt-6">
          <div className="name flex justify-start mx-auto md:m-0 items-center">
            <h1 className="text-lg md:text-2xl font-semibold">Email:</h1>
            <h1 className=" text-lg md:text-2xl ml-2 md:ml-4">
              iit2021114@iiita.ac.in
            </h1>
          </div>
          <div className="name flex justify-start mx-auto md:ml-16 mt-2 md:mt-0 items-center">
            <h1 className="text-lg md:text-2xl font-semibold">Department:</h1>
            <h1 className="text-lg md:text-2xl ml-2 md:ml-4">Pension</h1>
          </div>
        </div>
        <div className="name flex justify-start mx-auto mt-4 md:mt-6 items-center">
          <label
            htmlFor="main-id"
            className="text-lg md:text-2xl font-semibold"
          >
            Main ID:
          </label>
          <input
            type="text"
            name="main-id"
            id="main-id"
            placeholder="Enter the Main ID"
            className="border1 border border-black mx-auto  md:ml-3 md:mt-0 rounded-md p-1"
          />
        </div>
        <div className="name flex justify-start mx-auto mt-2 md:mt-6 items-center">
          <label
            htmlFor="this-id"
            className="text-lg md:text-2xl font-semibold"
          >
            This ID:
          </label>
          <input
            type="text"
            name="this-id"
            id="this-id"
            placeholder="Enter New ID"
            className="border1 border border-black mx-auto  md:ml-3 md:mt-0 rounded-md p-1"
          />
        </div>
        <div className="name flex justify-start mx-auto mt-2 md:mt-6 items-center">
          <label htmlFor="status" className="text-lg md:text-2xl font-semibold">
            Status:
          </label>
          <select
            name="status"
            id="status"
            className="border1 border border-black mx-auto  md:ml-3 md:mt-0 rounded-md p-1"
          >
            <option value="not-seen">Not Seen</option>
            <option value="in-process">In Process</option>
            <option value="forwarded">Forwarded</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="flex justify-center"></div>
        <div className="name flex mx-auto mt-2 md:mt-6 items-center">
          <label
            htmlFor="feedback"
            className="text-lg md:text-2xl font-semibold"
          >
            Feedback:
          </label>
          <input
            type="text"
            name="feedback"
            id="feedback"
            placeholder="Enter Feedback"
            className="border1 border border-black mx-auto ml-4 md:ml-3 md:mt-0 rounded-md p-1 w-96"
          />
        </div>
        <div className="flex-row md:flex justify-between pb-10 md:pb-0   items-center mt-4">
          <div className="name flex justify-center mt-2 md:mt-0 items-center">
            <h1 className="text-lg md:text-2xl font-semibold">
              Date of Filing:
            </h1>
            <h1 className="text-lg md:text-2xl ml-2 md:ml-4">01/01/23</h1>
          </div>
          <button
            type="submit"
            className="hover:animate-bounce border-1 border-black border p-3 md:w-36 ml-28 mt-4 md:mt-0 rounded-xl bg-light-green text-white "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
