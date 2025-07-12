import { NavLink } from "react-router-dom"

const Navlink = (props) => {

    const sidebarOpen = props.sidebarOpen
    const sidebarOpenClass = sidebarOpen ? 'px-5' : 'px-0 flex justify-center'
    const sidebarOpenColor = sidebarOpen ? 'bg-[rgba(25,41,124,30%)]' : 'text-[var(--text-primary-color)]'

  return (
    <NavLink to={props.to} className={({ isActive }) => `py-2.5 ${sidebarOpenClass} rounded-[10px] flex items-center gap-x-2.5
            ${isActive ? sidebarOpenColor : 'text-[var(--text-color)]'
        }`}>
        {props.icon}
        {sidebarOpen &&
            props.children
        }
    </NavLink>
  )
}

export default Navlink