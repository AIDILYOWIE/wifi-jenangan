import { CurrentToken } from "../helper/TokenService"
import { Navigate } from "react-router-dom"

const GuestMiddleware = (props) => {
     if (CurrentToken.get()) {
        return <Navigate to={'/'}/>
    } else {
        return props.children
    }
    
}

export default GuestMiddleware