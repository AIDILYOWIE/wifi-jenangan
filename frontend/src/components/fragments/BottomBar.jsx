import logo from '../../assets/icon/logo.png'
import { arrow_down, Home, PeopleOutlinedIcon, ReceiptLongOutlinedIcon, ReceiptOutlinedIcon } from '../../assets/RegisterAsset'
import Navlink from '../elements/Navlink'

const BottomBar = () => {

  return (
    <footer className={`fixed border-t-[1px] border-[var(--border-color)] duration-200 bottom-0 w-full p-3 min-[800px]:hidden bg-white`}>
        <div className="w-full h-full ">
            <div className="body flex justify-around gap-y-1.5">
                <Navlink to="/" icon={<Home/>}>  Dashboard</Navlink>
                <Navlink to="/pelanggan" icon={<PeopleOutlinedIcon/>}> Pelanggan</Navlink>
                <Navlink to="/transaksi" icon={<ReceiptOutlinedIcon/>}> Transaksi</Navlink>
                <Navlink to="/invoice" icon={<ReceiptLongOutlinedIcon/>}> Invoice</Navlink>
            </div>
        </div>
    </footer>
  )
}

export default BottomBar