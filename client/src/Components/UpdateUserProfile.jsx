import React from "react";
import axios from "axios";

export default function UpdateUserProfile(props){

const token = localStorage.getItem("token");

let config = {
  method: 'patch',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/api/v1/user/',
  headers: { 
    Authorization: `Bearer ${token} `, 
    'Content-Type': 'application/json'
  }
};
const [updateprofile, setUpdateprofile] = React.useState({
  name: "",


});


    const handleInput = (event) =>{
      setUpdateprofile({...updateprofile, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) =>{
      event.preventDefault()
      axios.patch('http://localhost:3000/api/v1/user/', updateprofile)
      .then(res => console.log(response.data))
      .catch(err => console.log(err))
    }

    return(
        <div
           className={
             props.visible == "update"
               ? "p-4 update-profile-content dashboard w-full md:w-3/4 h-100  pt-16"
               : "hidden"
           }
         >
           <h1 className="text-center text-4xl md:text-7xl">UPDATE YOUR PROFILE</h1>
           <form action="" className="flex-row justify-between items-center" onSubmit={handleSubmit}>
             <div className="name-input flex justify-center items-center mt-6 md:mt-12">
               <label htmlFor="name">
                 <p className=" text-xl md:text-3xl">Name:</p>{" "}
               </label>
               <input
                 type="text"
                 name="name"
                 id="name"
                 placeholder="Name"
                 className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
                 onChange={handleInput}
               />
             </div>
             <div className="name-input flex justify-center items-center mt-4 md:mt-8">
               <label htmlFor="email">
                 <p className="text-xl md:text-3xl">Email:</p>
               </label>
               <input
                 type="email"
                 name="email"
                 id="email"
                 placeholder="Email"
                 className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
                 onChange={handleInput}
               />
             </div>
             <div className="name-input flex justify-center items-center mt-4 md:mt-8">
               <label htmlFor="phone">
                 <p className="text-xl md:text-3xl">PhoneNo.:</p>{" "}
               </label>
               <input
                 type="tel"
                 name="phone"
                 id="phone"
                 placeholder="Contact Number"
                 className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
                 onChange={handleInput}
               />
             </div>
             <div className="name-input flex justify-center items-center mt-4 md:mt-8">
               <label htmlFor="name">
                 <p className="text-xl md:text-3xl"> Address:</p>
               </label>
               <input
                 type="text"
                 name="name"
                 id="name"
                 placeholder="Name"
                 className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
                 onChange={handleInput}
               />
             </div>
             <div className="name-input flex justify-center items-center mt-4 md:mt-8">
               <label htmlFor="pfp">
                 <p className="text-xl md:text-3xl">PFP:</p>
               </label>
               <input
                 type="file"
                 name="pfp"
                 id="pfp"
                 placeholder=""
                 className=" ml-4 p-1 md:p-2 rounded-md  border border-black"
               />
             </div>
             <div className="name-input flex justify-center items-center mt-8">
               <button
                 type="submit"
                 className="bg-light-green p-2 md:p-3 w-32 rounded-3xl text-white text-xl"
               >
                 UPDATE
               </button>
             </div>
           </form>
         </div>
    )
}