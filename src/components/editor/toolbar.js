import { ApplicationState } from '@/pages'
import React, { useContext } from 'react'

export default function Toolbar() {
  var {CurrentState, setCurrentState, Veiwing, setVeiwing, Lightmode, setLightmode} = useContext(ApplicationState)
  return (
    <div className={`flex justify-around  bg-dark  border-b-zinc-700 ${(CurrentState !== 3) ? "h-[3rem] border-b-2":"h-0 border-b-0"}`}>
        <div className='flex w-[20%] my-auto justify-between'>
        <button className='w-5 h-5 rounded-full bg-white '></button>
        <button className='w-5 h-5 rounded-full bg-white '></button>
        <button className='w-5 h-5 rounded-full bg-white '></button>
        <button className='w-5 h-5 rounded-full bg-white '></button>
        <button className='w-5 h-5 rounded-full bg-white '></button>
        </div>
    </div>
  ) 
}
