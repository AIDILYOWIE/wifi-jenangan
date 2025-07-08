import AuthMiddleware from "./middleware/AuthMiddleware.jsx";
import { createBrowserRouter } from "react-router-dom";
import GuestMiddleware from "./middleware/GuestMiddleware";
import Login from "../pages/Authentication/login.jsx";
import ForgetPassword from "../pages/Authentication/forget_password/ForgetPassword.jsx";

const router = createBrowserRouter([
    {
        path : '/',
        element : <AuthMiddleware> <h1>tess midd</h1> </AuthMiddleware>
    },
    {
        path : '/login',
        element : <GuestMiddleware> <Login/></GuestMiddleware>
    },
    {
        path : '/forget-password/confirm-email',
        element : <GuestMiddleware> <ForgetPassword/></GuestMiddleware>
    },
])

export default router