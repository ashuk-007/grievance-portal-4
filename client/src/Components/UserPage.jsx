import React from "react";
import UserNavbar from "./UserNavbar";

import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import UpdateUserProfile from "./UpdateUserProfile";
import FileNewGrievance from "./FileNewGrievance";
import MyGrievance from "./MyGrievance";
import Footer from "./Footer";
export default function UserPage(){
  if(localStorage.getItem("token")==null){
  
    window.location.href="/userlogin"
  }
  const token=localStorage.getItem("token")
  // axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
  //       .then(res => {
  //           console.log(res.data);
  //       this.setState({
  //           items: res.data,  /*set response data in items array*/
  //           isLoaded : true,
  //           redirectToReferrer: false
  //       })
  //     })
    const [isClicked,setIsClicked]=React.useState("1")
    function handleClick(val,vis){
        setIsClicked(val)
        setVisible(vis)
    }
    const[visible,setVisible]=React.useState("profile")
   return (
     <div className={token==null?"hidden":""}>
       <div className="User-Page">
         <div className="navbar hidden md:block">
           <UserNavbar
             first=""
             second=""
             third=""
             button="logout"
             hidden={true}
           />
         </div>
         <div className="navbar md:hidden">
           <UserNavbar
             first="HOME"
             second="GRIEVANCE"
             third="NEW"
             fourth="UPDATE PROFILE"
             hidden={true}
             handle={handleClick}
           />
         </div>
         <div className="User-page-content h-100 hidden md:flex">
           <Dashboard
             clicked={isClicked}
             visible={visible}
             handle={handleClick}
             first={"HOME"}
             second="MY GRIEVANCE"
             third="NEW GRIEVANCE"
             fourth="UPDATE PROFILE"
           />
           <UserProfile
             visible={visible}
             uName={"Vishesh Vijayvargiya"}
             mail={"iit2021114@iiita.ac.in"}
             contact={"0123456789"}
             address={"PLOT NO-2,EAST VINOD NAGAR, DELHI"}
           />
           <FileNewGrievance visible={visible} />
           <MyGrievance visible={visible} />
           <UpdateUserProfile visible={visible} />
         </div>
         <div className="User-page-content h-100 md:hidden relative">
           <UserProfile
             visible={visible}
             uName={"Vishesh Vijayvargiya"}
             mail={"iit2021114@iiita.ac.in"}
             contact={"0123456789"}
             address={"PlotNo.-2,East Vinod Nagar,Delhi"}
           />
           <FileNewGrievance visible={visible} />
           <MyGrievance visible={visible} />
           <UpdateUserProfile visible={visible} />
         </div>
         <Footer className="z-10" />
       </div>
     </div>
   ); 
}