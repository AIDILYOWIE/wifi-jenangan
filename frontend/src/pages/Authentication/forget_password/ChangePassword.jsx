import { useState } from "react"
import Input from "../../../components/elements/Input"
import ForgetPasswordLayout from "./layouts/ForgetPasswordLayout"
import { useNavigate } from "react-router-dom"
import Button from "../../../components/elements/Button"
import { api } from "../../../utils/helper/api"


export const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()

    const [confirmPasswordError, setconfirmPasswordError] = useState()

    const email = sessionStorage.getItem('email')
    const navigate = useNavigate()

    const handleChangePassword = () => {
        const submit = async () => {
            try {
                const res = await api.post('/change-password', {
                    email : email,
                    old_password : oldPassword,
                    new_password : newPassword,
                    confirm_new_password : confirmNewPassword
                })
                sessionStorage.removeItem('email')
                navigate('/login')
            } catch (error) {
                console.log(error)
            }
        }
        submit()
    }

    const handleKonfirmPassword = (e) => {
        setConfirmNewPassword(e.target.value)
        if (newPassword !== e.target.value) {
            return setconfirmPasswordError('Password tidak sama!')
        }
        setconfirmPasswordError('')
    }
    
  return (
    <ForgetPasswordLayout title="Ubah Password" deskripsi="Sebelum ubah password, pastikan password barumu aman dari siapapun🔐">
        <Input label="Password lama" placeholder="Masukkan password lama" onChange={(e) => {setOldPassword(e.target.value)}} value={oldPassword}></Input>
        <Input label="Password baru" placeholder="Masukkan password baru" onChange={(e) => {setNewPassword(e.target.value)}} value={newPassword}></Input>
        <Input label="Konfirmasi Password baru" placeholder="Konfirmasi password baru" onChange={(e) => {handleKonfirmPassword(e)}} value={confirmNewPassword}></Input>
        {confirmPasswordError &&
            <p className="text-xs text-red-700 ps-2">{confirmPasswordError}</p>
        }
        <Button onClick={() => {handleChangePassword()}} className="!w-fit px-5 ml-auto">Change</Button>
    </ForgetPasswordLayout>
  )
}
