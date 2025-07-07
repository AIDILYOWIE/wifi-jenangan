import Login from "../pages/login";
import AuthMiddleware from "./middleware/AuthMiddleware.jsx";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path : '/login',
        element :<Login/>
    },
    {
        path : '/tes',
        element : <AuthMiddleware> <h1>tess midd</h1> </AuthMiddleware>
    }
])

export default router