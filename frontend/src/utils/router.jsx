import AuthMiddleware from "./middleware/AuthMiddleware.jsx";
import { createBrowserRouter } from "react-router-dom";
import GuestMiddleware from "./middleware/GuestMiddleware";
import Login from "../pages/Authentication/login.jsx";
import ForgetPassword from "../pages/Authentication/forget_password/ForgetPassword.jsx";
import { ChangePassword } from "../pages/Authentication/forget_password/ChangePassword.jsx";
import Pelanggan from "../pages/Client_area/Pelanggan/Index.jsx";
import Dashboard from "../pages/Client_area/Dashboard/Index.jsx";
import Invoice from "../pages/Invoice/Index.jsx";
import Transaksi from "../pages/Client_area/Transaksi/Index.jsx";
import AddPelanggan from "../pages/Client_area/Pelanggan/Action/AddPelanggan.jsx";

const router = createBrowserRouter([
    {
        path : '/login',
        element : <GuestMiddleware> <Login/></GuestMiddleware>
    },
    {
        path : '/forget-password/confirm-email',
        element : <GuestMiddleware> <ForgetPassword/></GuestMiddleware>
    },
    {
        path : '/forget-password/change-password',
        element : <GuestMiddleware> <ChangePassword/></GuestMiddleware>
    },
    {
        path : '/',
        element : <AuthMiddleware> <Dashboard/> </AuthMiddleware>
    },
    {
        path : '/pelanggan',
        children: [
            {
                index: true,
                element: <AuthMiddleware><Pelanggan/></AuthMiddleware> 
            },
            {
                path: 'add',
                element: <AuthMiddleware> <AddPelanggan/></AuthMiddleware>
            }
        ]
    },
    {
        path : '/transaksi',
        element : <AuthMiddleware> <Transaksi/> </AuthMiddleware>
    },
    {
        path : '/invoice',
        element : <AuthMiddleware> <Invoice/> </AuthMiddleware>
    },
])

export default router