import React from 'react'

const Input = React.memo(({label, placeholder}) => {
  return (
    <div className='w-full flex flex-col gap-[7px]'>
      <label htmlFor="" className='w-full font-(--font-weight-1) text-(length:--size-text-1) '><p>{label}</p></label>
      <input type="text" placeholder={placeholder} className='font-(--font-weight-2) text-(length:--size-text-2) w-full border-[1px] rounded-(--border-radius) border-(--border-color) px-[20px] py-[10px] '/>
    </div>
  )
})

export default Input