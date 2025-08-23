import Button from "../../components/elements/Button"
import Input from "../../components/elements/Input"
import AuthLayout from "../../components/layouts/AuthLayout"
import { logo } from "../../assets/RegisterAsset"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import { api, CurrentToken, throttle, updateToastToError, updateToastToSuccess } from "../../utils/helper/helper"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {throttle(async () => {
        const toastId = toast.loading('Login process');
        try {
            const res = await api.post('/login', {
                credentials: email,
                password: password
            })
            updateToastToSuccess(toastId, "Login berhasil")                 
            CurrentToken.set(res.data.token)
            localStorage.setItem('role', res.data?.role)
            setTimeout(function() {
                window.location.reload()
            }, 1500);
        } catch (error) {
            const error_message = error.response.data.message
            updateToastToError(toastId, error_message)
        }
    },2000)}
    
    
    

    return (
        <AuthLayout>
            <ToastContainer position="top-center"></ToastContainer>
            <div className="w-full flex justify-center flex-col gap-y-[24px] mb-12">
                <div className="w-full flex justify-center">
                    <img src={logo} alt="" width={"180px"} />
                </div>
                <div className="w-full flex justify-center items-center flex-col">
                    <p className="font-semibold text-(length:--size-header) w-full text-center">Welcome Back</p>
                    <p className="font-(--font-weight-3) text-(length:--size-text-2) w-full text-center">Enter your email and password</p>
                </div>
            </div>
            <div className="w-full flex flex-col gap-[18px] mb-6">
                <Input name="email" label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input name="password" type="password" label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="w-full flex justify-end">
                    <p className="text-(--text-color) text-(length:--size-text-2) cursor-pointer" id="forgetPassword"><Link to="/forget-password/confirm-email">Forget Password?</Link></p>
                </div>
            </div>
            <Button onClick={() => handleLogin()} className="!outline-none">Sign In</Button>
        </AuthLayout>
    )
}

export default Login