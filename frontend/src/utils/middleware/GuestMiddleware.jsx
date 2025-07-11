import { Navigate } from "react-router-dom"
import { CurrentToken } from "../helper/helper"

const GuestMiddleware = (props) => {
     if (CurrentToken.get()) {
        return <Navigate to={'/'}/>
    } else {
        return props.children
    }
    
}

export default GuestMiddleware