import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";


export default function Layout(){
    const [sidebarDiplay,setSidebarDisplay] = useState(true)
    return (
        <>
            <Navbar setSidebarDisplay={setSidebarDisplay} />
            <Outlet context={{sidebarDiplay}}/>
        </>
    )
}