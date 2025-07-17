import React from "react"
import { NavLink } from "react-router-dom"

const Navlink = React.memo((props) => {

    const sidebarOpen = props.sidebarOpen
    const sidebarOpenClass = sidebarOpen ? 'px-5' : 'px-0 flex justify-center'
    const sidebarOpenColor = sidebarOpen ? 'bg-[rgba(25,41,124,30%)]' : 'text-[var(--text-primary-color)]'

  return (
    <NavLink to={props.to} className={({ isActive }) => `py-2.5 ${sidebarOpenClass} rounded-[10px] flex max-[800px]:flex-col items-center gap-x-2.5
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