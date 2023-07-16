// eslint-disable-next-line [RULE]
import React, { useContext, useRef } from 'react'
import NoteNode from './items/nodes'
import { ApplicationState } from '@/pages'

export default function ViewerCanvas(props) {

  let Notes = props.Notes
  const nodeConstraints = useRef(null)


  var { CurrentState, setCurrentState, Veiwing, setVeiwing, Lightmode, setLightmode } = useContext(ApplicationState)





 


  if (Notes) {
    return (
      <div className={`h-full bg-border/70 origin-center flex overflow-hidden transition-all ${(CurrentState == 1) ? "w-0" : "w-full"}`}>
        <div className='w-[800px] h-[800px]' ref={nodeConstraints}>
          <div className='w-0 h-0 py-[400px] px-[400px] relative' >
            {
              Notes.notes.map((note, index) => (
                <NoteNode item={note} container={nodeConstraints}/>
              ))
            }
            {
              Notes.nodes.map((node, index) => (
                <NoteNode item={node} container={nodeConstraints} />
              ))
            }
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='w-screen h-screen bg-slate-800 flex'>
        <p className='mx-auto justify-center my-auto w-max text-centre text-white'>Nothing to show</p>
      </div>)
  }
}
