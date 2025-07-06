import React from 'react'

const Button = (props) => {
  const {children, type = "button", variant = "primary", onClick = ""} = props
  const variantClass = variant == "primary" ? 'bg-(--primary-color)' : 'bg-(--secondary-background-color)'
  
  return (
    <button type={type} onClick={onClick} className={`w-full text-center ${variantClass} rounded-(--border-radius) text-(length:--size-text-2) py-[10px] text-(--background-color) cursor-pointer`} id='button'>
        {children}
    </button>
  )
}

export default Button