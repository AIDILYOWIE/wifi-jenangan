import { Navigate } from "react-router-dom"
import {CurrentToken} from "../helper/TokenService"

const AuthMiddleware = (props) => {

    if (!CurrentToken.get()) {
        return <Navigate to={'/'}/>
    } else {
        return props.children
    }
    
  
}

export default AuthMiddleware