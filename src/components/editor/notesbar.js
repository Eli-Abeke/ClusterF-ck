import { ApplicationState } from '@/pages'
import React, { useContext } from 'react'

export default function NotesBar() {
  var {CurrentState, setCurrentState, Veiwing, setVeiwing, Lightmode, setLightmode} = useContext(ApplicationState)
  return (
    <div className={`h-full border-r-2 border-r-zinc-700 flex p-5 min-w-[20%] `}><span class="material-symbols-rounded">
    save 
    </span></div>
    
  )
}
