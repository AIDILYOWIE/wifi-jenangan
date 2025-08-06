import { useState } from "react"
import Input from "../../../components/elements/Input"
import ForgetPasswordLayout from "./layouts/ForgetPasswordLayout"
import { useNavigate } from "react-router-dom"
import Button from "../../../components/elements/Button"
import { toast, ToastContainer } from "react-toastify"
import { api, throttle, updateToastToError, updateToastToSuccess } from "../../../utils/helper/helper"


export const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()

    const [confirmPasswordError, setconfirmPasswordError] = useState()

    const email = sessionStorage.getItem('email')
    const navigate = useNavigate()

    const handleChangePassword = () => {throttle(async () => {
        const toastId = toast.loading('Mengupdate password')
        try {
            const res = await api.post('/change-password', {
                email : email,
                old_password : oldPassword,
                new_password : newPassword,
                confirm_new_password : confirmNewPassword
            })
            const success_message = res.data.message
            sessionStorage.removeItem('email')
            updateToastToSuccess(toastId, success_message)
            setTimeout(function() {
                navigate('/login')
            }, 1500);
        } catch (error) {
            const error_message = error.response.data.errors
            updateToastToError(toastId, error_message)
        }
    },2000)}

    const handleKonfirmPassword = (e) => {
        setConfirmNewPassword(e.target.value)
        if (newPassword !== e.target.value) {
            return setconfirmPasswordError('Password tidak sama!')
        }
        setconfirmPasswordError('')
    }
    
  return (
    <ForgetPasswordLayout title="Ubah Password" deskripsi="Sebelum ubah password, pastikan password barumu aman dari siapapun🔐">
        <ToastContainer position="top-center"/>
        <Input type="password" label="Password lama" placeholder="Masukkan password lama" onChange={(e) => {setOldPassword(e.target.value)}} value={oldPassword}></Input>
        <Input type="password" label="Password baru" placeholder="Masukkan password baru" onChange={(e) => {setNewPassword(e.target.value)}} value={newPassword}></Input>
        <Input type="password" label="Konfirmasi Password baru" placeholder="Konfirmasi password baru" onChange={(e) => {handleKonfirmPassword(e)}} value={confirmNewPassword}></Input>
        {confirmPasswordError &&
            <p className="text-xs text-red-700 ps-2">{confirmPasswordError}</p>
        }
        <Button onClick={() => {handleChangePassword()}} className="!w-fit px-5 ml-auto">Change</Button>
    </ForgetPasswordLayout>
  )
}
