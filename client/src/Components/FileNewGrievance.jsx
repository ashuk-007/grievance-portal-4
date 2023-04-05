import React from 'react';
import ReactDOM from 'react-dom/client';
import validate from "./validate";
import {useFormik} from "formik"
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};
function FileNewGrievance(props) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      Vpassword: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div
      className={
        props.visible == "new"
          ? "p-4 update-profile-content dashboard w-full md:w-3/4 h-100  pt-10"
          : "hidden"
      }
    >
      <h1 className="md:text-6xl text-4xl font-bold text-black capitalize dark:text-black py-4 text-center px-20  ">
        File New Grievance
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2 px-4">
          <div>
            <label className="text-black dark:text-gray-200" htmlFor="username">
              Name
            </label>
            <input
              id="username"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              name="firstName"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </div>

          <div>
            <label
              className="text-black dark:text-gray-200"
              htmlFor="emailAddress"
            >
              Email Address
            </label>
            <input
              id="emailAddress"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label
              className="text-black dark:text-gray-200"
              htmlFor="passwordConfirmation"
            >
              Department
            </label>
            <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              <option>District Survey and Land Records</option>
              <option>Department of Agriculture</option>
              <option>Department of Civil Supplies</option>
              <option>District Rural Development Agency</option>
              <option>District Educational Department</option>
              <option>Health Department</option>
              <option>Department of Civil Supplies</option>
            </select>
          </div>
          <div>
            <label
              className="text-black dark:text-gray-200"
              htmlFor="passwordConfirmation"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-black dark:text-gray-200" htmlFor="username">
              Phone Number
            </label>
            <input
              id="username"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label
              className="text-black dark:text-gray-200"
              htmlFor="emailAddress"
            >
              District
            </label>
            <input
              id="emailAddress"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label
              className="text-black dark:text-gray-200"
              htmlFor="passwordConfirmation"
            >
              Write your complaint
            </label>
            <textarea
              id="textarea"
              type="textarea"
              className="block w-full px- py-8 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-black"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="md:pl-8 px-1">Upload a file</span>

                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs text-black">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-6 " color="black">
          <button
            type="submit"
            className="bg-light-green p-2 md:p-3 w-32 rounded-3xl text-white text-xl"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FileNewGrievance;
