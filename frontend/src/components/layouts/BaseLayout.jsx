import { useLocation } from "react-router-dom"
import BottomBar from "../fragments/BottomBar"
import HeaderPage from "../fragments/Header"
import Navbar from "../fragments/Navbar"
import Sidebar from "../fragments/Sidebar"
import Container from "./Container"
import React from 'react';

const BaseLayout = React.memo((props) => {

  const location = useLocation()

  return (
    <div className="w-full min-h-screen flex">
        <Sidebar/>
        <BottomBar/>

      <div className="flex flex-col items-center w-full gap-y-5 bg-(--secondary-background-color) max-[800px]:pb-[90px]">
        {/* <Navbar /> */}
        <Container>
          {props.children}
        </Container>
      </div>
    </div>
  )
})

export default BaseLayout