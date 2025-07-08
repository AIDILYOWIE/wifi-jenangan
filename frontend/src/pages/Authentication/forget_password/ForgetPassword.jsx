import { useState } from "react"
import Input from "../../../components/elements/Input"
import { useNavigate } from "react-router-dom"
import Button from "../../../components/elements/Button"
import { api } from "../../../utils/api/api"

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
            navigate('/forget-password/change-email')
        } catch (error) {
            console.log(error)
        }
    }
    confirm()
}
  
  return (
    <div className="w-full h-screen grid place-items-center px-3">
      <div className="card w-full max-w-md border-1 border-neutral-400 shadow-xl rounded-(--border-radius) p-4 flex flex-col gap-y-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-700 mb-2">Konfirmasi Email</h1>
          <p className="text-xs text-gray-700 max-w-sm">Ups! Silahkan konfirmasi email dulu agar kami dapat mengenalimu😉</p>
        </div>

        <Input placeholder="Masukkan email" type="email" onChange={(e) => {setEmail(e.target.value)}} value={email}></Input>
        <Button onClick={() => {handleConfirmEmail()}} className="!py-2 !w-fit px-3 ml-auto">Konfirmasi</Button>
      </div>
    </div>
  )
}

export default ForgetPassword