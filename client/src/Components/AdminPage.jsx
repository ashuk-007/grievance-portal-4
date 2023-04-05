import React from "react";
import UserNavbar from "./UserNavbar";
import Dashboard from "./Dashboard";
import AdminProfile from "./AdminProfile";
import GrievanceStatus from "./GrievanceStatus";
import UpdateStatus from "./UpdateStatus"
import UpdateAdminProfile from "./UpdateAdminProfile";
import Footer from "./Footer";
export default function AdminPage(){
    const [isClicked,setIsClicked]=React.useState("1")
    function handleClick(val,vis){
        setIsClicked(val)
        setVisible(vis)
    }
    const[visible,setVisible]=React.useState("profile")
   return (
     <div className="admin-Page h-3/4 ">
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
           second="STATUS"
           third="UPDATE"
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
           first="HOME"
           second="GRIEVANCES STATUS"
           third="UPDATE STATUS"
           fourth="UPDATE PROFILE"
         />
         <AdminProfile
           visible={visible}
           uName={"Vishesh Vijayvargiya"}
           mail={"iit2021114@iiita.ac.in"}
           contact={"0123456789"}
           address={"PLOT NO-2,EAST VINOD NAGAR, DELHI"}
         />
         <GrievanceStatus visible={visible} />
         <UpdateStatus visible={visible} />
         <UpdateAdminProfile visible={visible} />
       </div>
       <div className="User-page-content h-100 md:hidden relative">
         <AdminProfile
           visible={visible}
           uName={"Vishesh Vijayvargiya"}
           mail={"iit2021114@iiita.ac.in"}
           contact={"0123456789"}
           address={"PlotNo.-2,East Vinod Nagar,Delhi"}
         />

         <GrievanceStatus visible={visible} />
         <UpdateStatus visible={visible} />
         <UpdateAdminProfile visible={visible} />
       </div>
      <Footer />
     </div>
   ); 
}