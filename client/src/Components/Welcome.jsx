import React from "react"
import Navbar from "./Navbar"
import WelcomeContent from "./WelcomeContent"

export default function Welcome(){
    return(
        <main className="welcome-page ">
            <Navbar className="h-1/6" first="HOME" second="LOGIN AS USER" third="LOGIN AS ADMIN" fourth="" hidden={false} />
            <WelcomeContent className="h-5/6" />
           
        </main>
    )
}