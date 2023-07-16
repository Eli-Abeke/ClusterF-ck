import React from 'react'
import Toolbar from '../editor/toolbar'

export default function Navbar() {
  return (
    <div>
        <div className='flex w-full bg-dark border-b-border border-b-2 justify-between px-20 h-[4rem]'>
            <p className='my-auto'>Mindspace</p>
            <form className='my-auto'>
            <input placeholder='search' className='my-auto bg-transparent border-[1px] w-[28rem] rounded-full placeholder:text-white p-2 px-5'/>
            </form>
        </div>
        <Toolbar/> 
    </div>
  )
}
