import { useState } from "react"
import Input from "../../../components/elements/Input"
import { useNavigate } from "react-router-dom"
import Button from "../../../components/elements/Button"
import { api } from "../../../utils/api/api"
import ForgetPasswordLayout from "./layouts/ForgetPasswordLayout"

const ForgetPassword = () => {

  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const handleConfirmEmail = () => {
    const confirm = async () => {
        try {
            const res = await api.post('/confirm-email', {
              email : email
            })
            sessionStorage.setItem('email', email)
            navigate('/forget-password/change-password')
        } catch (error) {
            console.log(error)
        }
    }
    confirm()
}
  
  return (
    <ForgetPasswordLayout title="Konfirmasi Email" deskripsi="Ups! Silahkan konfirmasi email dulu agar kami dapat mengenalimu😉">
      <Input placeholder="Masukkan email" type="email" onChange={(e) => {setEmail(e.target.value)}} value={email}></Input>
      <Button onClick={() => {handleConfirmEmail()}} className="!py-2 !w-fit px-3 ml-auto">Konfirmasi</Button>
    </ForgetPasswordLayout>
  )
}

export default ForgetPassword