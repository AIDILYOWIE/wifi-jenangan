import React from 'react'


const AuthLayout = React.memo(({children}) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-[410px] flex flex-col min-[576px]:border-[1px] min-[576px]:border-(--border-color) rounded-(--border-radius) min-[576px]:shadow-(--box-shadow) h-max px-[30px] py-[40px] gap-[38px]'>
            {children}
        </div>
    </div>
  )
})

export default AuthLayout
