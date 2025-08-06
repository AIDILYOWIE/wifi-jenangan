import React from "react"
import { NavLink } from "react-router-dom"

const Navlink = React.memo((props) => {

    const sidebarOpen = props.sidebarOpen
    const sidebarOpenClass = sidebarOpen ? 'px-3 min-[800px]:hover:ps-5 duration-400 ease-in-out' : 'px-0 flex justify-center '
    const sidebarOpenColor = sidebarOpen ? 'bg-[rgba(25,41,124,30%)] shadow shadow-md' : 'text-[var(--text-primary-color)]'

  return (
    <NavLink to={props.to} className={({ isActive }) => `py-2.5 ${sidebarOpenClass} text-sm rounded-[10px] flex max-[800px]:flex-col items-center gap-x-2.5 
            ${isActive ? sidebarOpenColor : 'text-[var(--text-color)]'
        }`}>
        {props.icon}
        
        <p className="text-[9px] min-[800px]:hidden" id="menu-mobile">{props.children}</p>
        {sidebarOpen &&
          props.children
        }
    </NavLink>
  )
})


export default Navlink