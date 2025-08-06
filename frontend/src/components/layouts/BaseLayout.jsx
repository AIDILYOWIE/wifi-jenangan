import { useLocation } from "react-router-dom"
import BottomBar from "../fragments/BottomBar"
import HeaderPage from "../fragments/Header"
import Navbar from "../fragments/Navbar"
import Sidebar from "../fragments/Sidebar"
import Container from "./Container"
import React, { useState } from 'react';

const BaseLayout = React.memo((props) => {

  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  const psClass = sidebarIsOpen ? 'ps-64' : 'ps-20 '
  
  return (
    <div className="w-full min-h-screen flex">
        <Sidebar setSidebarIsOpen={setSidebarIsOpen}/>
        <BottomBar/>

      <div className={`flex flex-col items-center w-full ${psClass} gap-y-5 bg-(--secondary-background-color) max-[800px]:pb-[90px] duration-200 max-[800px]:ps-0`}>
        {/* <Navbar /> */}
        <Container>
          {props.children}
        </Container>
      </div>
    </div>
  )
})

export default BaseLayout