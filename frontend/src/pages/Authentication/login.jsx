import Button from "../../components/elements/Button"
import Input from "../../components/elements/Input"
import AuthLayout from "../../components/layouts/AuthLayout"
import logo from "../../../public/icon/logo.png"
import { useState } from "react"
import { api } from "../../utils/api/api"
import { CurrentToken } from "../../utils/helper/TokenService"
import { Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        const login = async () => {
            try {
                const res = await api.post('/login', {
                    credentials: email,
                    password: password
                })
                console.log(res)
                CurrentToken.set(res.data.token)
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
        login()
    }

    return (
        <AuthLayout>
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