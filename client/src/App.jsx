import { useState } from 'react'
import React from 'react'
import './App.css'
import Welcome from "./Components/Welcome"
import UserPage from './Components/UserPage'
import UserAdminLogin from "./Components/UserAdminLogin"
import AdminPage from "./Components/AdminPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Components/Footer'
import ForgotPassword from './Components/ForgotPassword'
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/userlogin" element={<UserAdminLogin />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />}/>
        </Routes>
      </BrowserRouter>
  
    </>
  );
}


