import Button from "../../components/elements/Button"
import Input from "../../components/elements/Input"
import AuthLayout from "../../components/layouts/AuthLayout"
import logo from "../../../public/icon/logo.png"
import { useState } from "react"
import { CurrentToken } from "../../utils/helper/TokenService"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import { api } from "../../utils/helper/api"
import { updateToastToError, updateToastToSuccess } from "../../utils/helper/notification"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        const toastId = toast.loading('Login process');
        const login = async () => {
            try {
                const res = await api.post('/login', {
                    credentials: email,
                    password: password
                })
                updateToastToSuccess(toastId, "Login berhasil")                 
                CurrentToken.set(res.data.token)
                setTimeout(function() {
                    window.location.reload()
                }, 1500);
            } catch (error) {
                const error_message = error.response.data.message
                updateToastToError(toastId, error_message)
            }
        }
        login()
    }

    return (
        <AuthLayout>
            <ToastContainer position="top-center"></ToastContainer>
            <div className="w-full flex justify-center flex-col gap-[24px]">
                <div className="w-full flex justify-center">
                    <img src={logo} alt="" width={"180px"} />
                </div>
                <div className="w-full flex justify-center items-center flex-col">
                    <p className="font-semibold text-(length:--size-header) w-full text-center">Welcome Back</p>
                    <p className="font-(--font-weight-3) text-(length:--size-text-2) w-full text-center">Enter your email and password</p>
                </div>
            </div>
            <div className="w-full flex flex-col gap-[18px]">
                <Input label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="w-full flex justify-end">
                    <p className="text-(--text-color) text-(length:--size-text-2) cursor-pointer" id="forgetPassword"><Link to="/forget-password/confirm-email">Forget Password?</Link></p>
                </div>
            </div>
            <Button onClick={() => handleLogin()} className="!outline-none">Sign In</Button>
        </AuthLayout>
    )
}

export default Login