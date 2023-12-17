import React from 'react'

function Header() {
  return (
    <div className='flex fixed w-full top-0 z-50 bg-slate-500 items-center '>
        <div className='flex-1'>logo</div>
        <div className='bg-red-500 m-2 p-2'><input type="text" /></div>
        {/* <div>login</div> */}
        <div className='font-bold text-5xl'>0</div>
    </div>
  )
}

export default Header