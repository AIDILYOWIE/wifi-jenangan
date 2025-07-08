import React from 'react'

const Input = React.memo(({label, placeholder, value, onChange, type = 'text'}) => {
  return (
    <div className='w-full flex flex-col gap-[7px]'>
      <label htmlFor="" className='w-full font-(--font-weight-1) text-(length:--size-text-1) '><p>{label}</p></label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} className='font-(--font-weight-2) text-(length:--size-text-2) w-full border-[1px] rounded-(--border-radius) border-(--border-color) px-[20px] py-[10px] '/>
    </div>
  )
})

export default Input