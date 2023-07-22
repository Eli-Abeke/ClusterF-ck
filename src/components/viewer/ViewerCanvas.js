// eslint-disable-next-line [RULE]
import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteNode from './items/nodes'
import { ApplicationState } from '@/pages'
import Connectors from './items/connectors'

export default function ViewerCanvas(props) {

  let Notes = props.Notes
  const nodeConstraints = useRef(null)


  var { CurrentState, setCurrentState, Veiwing, setVeiwing, Lightmode, setLightmode } = useContext(ApplicationState)

  const [NodeConnection, setNodeConnection] = useState([])

  const [increment, setincrement] = useState(0);
  useEffect(() => {
    setincrement(increment+1)
  },[NodeConnection]);


  if (Notes) {
    return (
      <div className={`h-full bg-border/70 origin-center flex overflow-hidden relative transition-all ${(CurrentState == 1) ? "w-0" : "w-full"}`}>
        <div className='w-[800px] h-[800px]' ref={nodeConstraints} tabIndex={10}>
        
          <div className='w-0 h-0 py-[400px] px-[400px] relative' >
            <div className='absolute top-0 left-0'>
            {
              NodeConnection.map((item,index) => (
                <div className=''>
                  <p>item</p>
                
                </div>
              ))
            }
            </div>
            {
              Notes.notes.map((note, index) => (
                <NoteNode connections={NodeConnection} updateConnections={setNodeConnection} item={note} container={nodeConstraints} />
              ))
            }
            {
              Notes.nodes.map((node, index) => (
                <NoteNode connections={NodeConnection} updateConnections={setNodeConnection} item={node} container={nodeConstraints} />
              ))
            }
          </div>
        </div>
        <div className='absolute bottom-0 right-0 p-5 space-y-2 flex flex-col text-xs'>
          <button className='flex space-x-4 text-white/30'><div className='flex space-x-4 border-[1px] p-3 px-8 rounded-sm border-white/30'><p className=''>ENTER</p> 
          <svg className='my-auto' width="19" height="9" viewBox="0 0 19 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.646446 4.64645C0.451184 4.84171 0.451184 5.15829 0.646446 5.35355L3.82843 8.53553C4.02369 8.7308 4.34027 8.7308 4.53553 8.53553C4.7308 8.34027 4.7308 8.02369 4.53553 7.82843L1.70711 5L4.53553 2.17157C4.7308 1.97631 4.7308 1.65973 4.53553 1.46447C4.34027 1.2692 4.02369 1.2692 3.82843 1.46447L0.646446 4.64645ZM18 5L18 5.5L18.5 5.5L18.5 5L18 5ZM17.5 -2.18557e-08L17.5 5L18.5 5L18.5 2.18557e-08L17.5 -2.18557e-08ZM18 4.5L1 4.5L1 5.5L18 5.5L18 4.5Z" fill="rgb(255,255,255,03)" />
          </svg>
          </div>
            <p className='my-auto text-base'>to create a note</p>
          </button>
          <button className='flex space-x-4 text-white/30'><div className='flex space-x-4 border-[1px] p-3 px-8 rounded-sm border-white/30'><p className=''>DEL</p>
          </div>
            <p className='my-auto text-base'>to delete the selected note</p>
          </button>

        </div>
      </div>
    )
  }
  else {
    return (
      <div className='w-screen h-screen bg-border/70 flex'>
        <p className='mx-auto justify-center my-auto w-max text-centre text-white'>Nothing to show</p>
      </div>)
  }
}
