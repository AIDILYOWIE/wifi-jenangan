
const GuestMiddleware = (props) => {
     if (CurrentToken.get()) {
        return <Navigate to={'/'}/>
    } else {
        return props.children
    }
    
}

export default GuestMiddleware