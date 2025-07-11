import { Navigate } from "react-router-dom"
import { CurrentToken } from '../helper/helper'
const AuthMiddleware = (props) => {

    if (!CurrentToken.get()) {
        return <Navigate to={'/login'}/>
    } else {
        return props.children
    }
    
  
}

export default AuthMiddleware