import AuthMiddleware from "./middleware/authMiddleware";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path : '/',
        element : <h1>tes /</h1>
    },
    {
        path : '/tes',
        element : <AuthMiddleware> <h1>tess midd</h1> </AuthMiddleware>
    }
])

export default router