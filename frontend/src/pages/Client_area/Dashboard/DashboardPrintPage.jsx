import React from 'react'

const DashboardPrintPage = (props) => {
  return (
    <div className='w-full flex flex-col items-center text-center max-w-md' ref={props.ref}>
        <h1 className='text-3xl font-semibold'>LAPORAN</h1>
        <p className='text-sm max-w-xs'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum nostrum repellat sunt?</p>
        <h2 className='text-sm mt-2'>*************************</h2>
        <h1 className='text-sm font-medium'>27-05-2025 <span>-</span> 27-06-2025</h1>
        <h2 className='text-sm'>*************************</h2>
        <div className="w-full flex items-center justify-between">
            <div className="title">
                <h1 className=' font-semibold'>Sudah Bayar</h1>
                <h1 className=' font-semibold'>Belum Bayar</h1>
            </div>
            <div className="value">
                <h1 className='text-green-600 font-semibold'>Rp. 4.567.818</h1>
                <h1 className='text-red-600 font-semibold'>Rp. 1.567.818</h1>
            </div>
        </div>
        <h1>-----------------</h1>
        <h1 className='-mt-5'>-----------------</h1>
        <div className="w-full flex items-center justify-between">
            <h1 className='text-xl font-semibold'>Total Selisih</h1>
            <h1 className='text-xl text-blue-600 font-semibold'>Rp. 9.283.028</h1>
        </div>
    </div>
  )
}

export default DashboardPrintPage