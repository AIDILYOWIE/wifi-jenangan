import BottomBar from "../fragments/BottomBar"
import Navbar from "../fragments/Navbar"
import Sidebar from "../fragments/Sidebar"
import Container from "./Container"

const BaseLayout = (props) => {
  return (
    <div className="w-full min-h-screen flex">
        <Sidebar/>
        <BottomBar/>

        <div className="flex flex-col items-center w-full gap-y-5">
          <Navbar/>
          <Container>
            {props.children}  
          </Container>
        </div>
    </div>
  )
}

export default BaseLayout