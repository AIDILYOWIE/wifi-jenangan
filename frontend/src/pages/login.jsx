import Button from "../components/elements/Button"
import Input from "../components/elements/Input"
import AuthLayout from "../components/layouts/AuthLayout"
import logo from "../../public/icon/logo.png"

const Login = () => {
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
                <Input label="Email" placeholder="Enter your email..." />
                <Input label="Password" placeholder="Enter your password..." />
                <div className="w-full flex justify-end">
                    <p className="text-(--text-color) text-(length:--size-text-2) cursor-pointer" id="forgetPassword"><a href="">Forget Password?</a></p>
                </div>
            </div>
            <Button/>
        </AuthLayout>
    )
}

export default Login