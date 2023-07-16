import React, { useEffect, useState } from 'react'
import Savebar from './notesbar'
import { useContext } from 'react'
import { ApplicationState, SupabaseProvider } from '@/pages'
import { Roboto_Mono } from 'next/font/google'


const roboto = Roboto_Mono({ subsets: ['latin'] })

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



export default function Notepad(props) {
  const supabase = useContext(SupabaseProvider)
  var { CurrentState, setCurrentState, Veiwing, setVeiwing, Lightmode, setLightmode } = useContext(ApplicationState)

  var cookie = null
  if (typeof window !== "undefined") {
    cookie = JSON.parse(localStorage.getItem("sb-pwyxrszihhunhhpvbdzw-auth-token"))
  }


  if (typeof window !== "undefined") {
    let noteBox = document.getElementById("noteBox")
    if (noteBox !== null) {
      noteBox.addEventListener("focusin", (event) => {
        if (noteBox === document.activeElement) {
          setCurrentState(1)
        }
      })
      noteBox.addEventListener("focusout", (event) => {
        if (noteBox) {
          setCurrentState(2)
        }
      })
    }
  }
  async function checkIfSave(Notes = props.Notes) {
    if (Veiwing) {
      if (!(Veiwing.hasOwnProperty('id'))) {
        const { data, error } = await supabase
          .from('Notes')
          .insert({ x: 0, y: 0, content: Veiwing.content, title: Veiwing.title, user: String(cookie.user.id) })
          .select('*')
          
          var temp = Veiwing
          temp.id = data.id
          setVeiwing(temp)
          console.log(props.Notes.notes)
          props.Notes.notes.push(data)
          console.log(props.Notes)

        console.log(error)
      }
      else {
        const { error } = await supabase
          .from('Notes')
          .update({ content: Veiwing.content, title: Veiwing.title })
          .eq("id", Veiwing.id)
        console.log(error)
      }
    }
  }



  useEffect(() => {

    if (typeof window !== "undefined") {
      let titleBox = document.getElementById("titleBox")
      let noteBox = document.getElementById("noteBox")
      if (Veiwing) {
        var temp = Veiwing
        temp.title = titleBox.value
        temp.content = noteBox.value

        if ((titleBox.value !== "") & (noteBox.value !== "")) {
          checkIfSave()
        }
      }

    }
  }, [CurrentState])


  useEffect(() => {
    console.log("change")
    if (typeof window !== "undefined") {
      let titleBox = document.getElementById("titleBox")
      let noteBox = document.getElementById("noteBox")
      if (Veiwing) {
        var temp = Veiwing
        titleBox.value = Veiwing.title
        noteBox.value = Veiwing.content

        if ((titleBox.value !== "") & (noteBox.value !== "")) {
        }
      }

    }
  }, [Veiwing])

  return (
    <div className={` h-full  border-r-2 border-border bg-dark flex resize-x transition-all ${(CurrentState == 3) ? "w-[0%]" : "w-[100%]"} `}>
      <Savebar />
      <div className='flex flex-col px-12 py-3 w-full'>
        <input className='notebox bg-transparent p-3 py-10 placeholder:opacity-50 text-4xl outline-none' placeholder='New note' name='title' id='titleBox' />
        <textarea
          spellCheck="true"
          name='note'
          placeholder='add a new note...'
          className={`notebox p-3 resize-none h-full ${roboto.className} bg-transparent container overflow-y-scroll w-full placeholder:text-opacity-25 placeholder:text-white transition-all focus:placeholder:text-opacity-50 outline-none`}
          id='noteBox'
        >

        </textarea>
      </div>
    </div>
  )
}
