import { useState } from "react"
import Input from "../../../components/elements/Input"
import { useNavigate } from "react-router-dom"
import Button from "../../../components/elements/Button"
import ForgetPasswordLayout from "./layouts/ForgetPasswordLayout"
import { toast, ToastContainer } from "react-toastify"
import { api, throttle, updateToastToError, updateToastToSuccess } from "../../../utils/helper/helper"

const ForgetPassword = () => {

  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const handleConfirmEmail = () => {throttle(async () => {
    const toastId = toast.loading('Mengkonfirmasi Email')
    try {
        const res = await api.post('/confirm-email', {
          email : email
        })
        const success_message = res.data.message
        sessionStorage.setItem('email', email)
        updateToastToSuccess(toastId, success_message)
        setTimeout(function() {
          navigate('/forget-password/change-password')
        }, 1500); 
    } catch (error) {
      const error_message = error.response.data.message
      updateToastToError(toastId, error_message)
    }
  },2000)}
  
  return (
    <ForgetPasswordLayout title="Konfirmasi Email" deskripsi="Ups! Silahkan konfirmasi email dulu agar kami dapat mengenalimu😉">
      <ToastContainer position="top-center"/>
      <Input id="email" placeholder="Masukkan email" type="email" onChange={(e) => {setEmail(e.target.value)}} value={email}></Input>
      <Button onClick={() => {handleConfirmEmail()}} className="!py-2 !w-fit px-3 ml-auto">Konfirmasi</Button>
    </ForgetPasswordLayout>
  )
}

export default ForgetPassword