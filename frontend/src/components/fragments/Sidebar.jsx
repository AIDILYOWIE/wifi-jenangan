import { useEffect, useState } from 'react'
import logo from '../../assets/icon/logo.png'
import { arrow_down, Home, PeopleOutlinedIcon, Person4Icon, ReceiptLongOutlinedIcon, ReceiptOutlinedIcon } from '../../assets/RegisterAsset'
import Navlink from '../elements/Navlink'
import { getRole } from '../../utils/helper/helper'

const Sidebars = ({ setSidebarIsOpen }) => {

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showContent, setShowContent] = useState(true)

  const sidebarOpenClass = sidebarOpen ? 'w-[250px]' : 'w-19'


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
    setSidebarIsOpen(!sidebarOpen)

    setTimeout(function () {
      setShowContent(!showContent)
    }, 100);

  }

  return (
    <aside className={`${sidebarOpenClass} fixed top-0 z-90 bg-white min-h-svh overflow-hidden border-r-[1px] border-[var(--border-color)] p-5 duration-200 max-[800px]:hidden`}>
      <div className="w-full h-full ">
        <div className="header sticky min-h-18 flex items-center justify-between pb-3.5 border-b-[1px] border-[var(--border-color)]">
          {sidebarOpen &&
            <img src={logo} alt="logo" width={120} />
          }
          <img src={arrow_down} alt="icon" className={` ${sidebarOpen ? 'rotate-90' : '-rotate-90'}  cursor-pointer`} width={36} onClick={() => { toggleSidebar() }} />
        </div>
        <div className="body pt-7 flex flex-col gap-y-1.5">
          <Navlink to="/" sidebarOpen={sidebarOpen} icon={<Home />}>  Dashboard</Navlink>
          {sidebarOpen &&
            <h1 className='ps-3 text-[10px] font-medium text-gray-500 mt-3'>MENU UTAMA</h1>
          }
          {getRole.get() == "admin" &&
            <>
              <Navlink to="/kolektor" sidebarOpen={sidebarOpen} icon={<Person4Icon />}> Kolektor</Navlink>
              <Navlink to="/pelanggan" sidebarOpen={sidebarOpen} icon={<PeopleOutlinedIcon />}> Pelanggan</Navlink>
              <Navlink to="/transaksi" sidebarOpen={sidebarOpen} icon={<ReceiptOutlinedIcon />}> Transaksi</Navlink>
            </>
          }
          <Navlink to="/invoice" sidebarOpen={sidebarOpen} icon={<ReceiptLongOutlinedIcon />}> Invoice</Navlink>

        </div>
      </div>
    </aside>
  )
}

export default Sidebars