import { useState } from 'react'
import logo from '../../assets/icon/logo.png'
import { arrow_down, Home, PeopleOutlinedIcon, ReceiptLongOutlinedIcon, ReceiptOutlinedIcon } from '../../assets/RegisterAsset'
import Navlink from '../elements/Navlink'

const Sidebar = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showContent, setShowContent] = useState(true)

  const sidebarOpenClass = sidebarOpen ? 'w-[288px]' : 'w-19'
  

  const toggleSidebar = () => {
    console.log("open");
    setSidebarOpen(!sidebarOpen)

    setTimeout(function() {
      setShowContent(!showContent)
    }, 100);
  }
  
  return (
    <aside className={`${sidebarOpenClass} overflow-hidden border border-[var(--border-color)] p-5 duration-200`}>
        <div className="w-full h-full">
            <div className="header sticky flex items-center justify-between pb-3.5 border-b-[1px] border-[var(--border-color)]">
                {showContent && 
                  <img src={logo} alt="logo" width={155}/>
                }
                <img src={arrow_down} alt="icon" className={` ${sidebarOpen ? 'rotate-90' : '-rotate-90'}  cursor-pointer`} width={36} onClick={() => {toggleSidebar()}} />
            </div>
            <div className="body pt-7 flex flex-col gap-y-1.5">
                {showContent && 
                  <h1 className='ps-5 text-xs text-[var(--text-color)]'>MAIN MENU</h1>
                }
                <Navlink to="/" sidebarOpen={sidebarOpen} icon={<Home/>}>  Dashboard</Navlink>
                <Navlink to="/pelanggan" sidebarOpen={sidebarOpen} icon={<PeopleOutlinedIcon/>}> Pelanggan</Navlink>
                <Navlink to="/transaksi" sidebarOpen={sidebarOpen} icon={<ReceiptOutlinedIcon/>}> Transaksi</Navlink>
                <Navlink to="/invoice" sidebarOpen={sidebarOpen} icon={<ReceiptLongOutlinedIcon/>}> Invoice</Navlink>

            </div>
        </div>
    </aside>
  )
}

export default Sidebar