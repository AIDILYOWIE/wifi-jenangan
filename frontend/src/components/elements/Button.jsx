import React, { useContext } from 'react'

const Button = React.memo((props) => {
  const {children, type = "button", variant = "primary", className, width = 'w-full', onClick, icon} = props
  const variantClass = variant == "primary" ? 'primary' : 'secondary'
  
  return (

    <button type={type} onClick={onClick} className={`${width} text-center ${variantClass} rounded-(--border-radius) text-(length:--size-text-2) py-[10px] text-(--background-color) cursor-pointer flex justify-center items-center ${className}`} id='button'>
        {icon}
        {children}
    </button>
  )
})


export const ButtonAction = React.memo(({children, style, onClick}) => {

  return (
    <button onClick={onClick} className={`w-max p-2.5 rounded-[10px] flex justify-center items-center cursor-pointer ${style}`}>
      {children}
    </button>
  )
})

export default Button