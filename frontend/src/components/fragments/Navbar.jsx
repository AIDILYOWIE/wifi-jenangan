import { NotificationsOutlinedIcon } from "../../assets/RegisterAsset"
import Button from "../elements/Button"
import SearchBar from "../elements/SearchBar"

const Navbar = () => {
  return (
    <nav className="w-full px-5 py-3.5 border-b-[1px] border-[var(--border-color)] bg-(--background-color)">
        <div className="w-full flex items-center">
            <SearchBar/>
        </div>
    </nav>
  )
}

export default Navbar