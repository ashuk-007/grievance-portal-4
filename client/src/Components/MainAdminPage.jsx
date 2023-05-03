import React from 'react'
import UserNavbar from "./UserNavbar";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import MainAdminProfile from './MainAdminProfile';
import ViewOfficerDetails from './ViewOfficerDetails';
import AddNewOfficer from './AddNewOfficer';
export default function MainAdminPage() {
    const token=localStorage.getItem("token")
    const [isClicked, setIsClicked] = React.useState("1");
    function handleClick(val, vis) {
      setIsClicked(val);
      setVisible(vis);
    }
    if (localStorage.getItem("token") == null) {
      window.location.href = "/userlogin";
    }
   const [visible, setVisible] = React.useState("profile"); 
  return (
    <div className={token == null ? "" : "admin-Page h-3/4 "}>
      <div className="navbar hidden md:block">
        <UserNavbar first="" second="" third="" button="logout" hidden={true} />
      </div>
      <div className="navbar md:hidden">
        <UserNavbar
          first="HOME"
          second="OFFICERS"
          third="NEW OFFICER"
          fourth=""
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
          second="OFFICERS DETAILS"
          third="NEW OFFICER"
          fourth=""
        />
        <MainAdminProfile
            visible={visible}
        />
        
        <ViewOfficerDetails visible={visible} />
        <AddNewOfficer visible={visible} />
      </div>
      <div className="User-page-content h-100 md:hidden relative">
        <MainAdminProfile
          visible={visible}
        />
        <ViewOfficerDetails visible={visible} />
        <AddNewOfficer visible={visible} />
      </div>
      <Footer />
    </div>
  );
}
