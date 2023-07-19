import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { createContext, useEffect, useState } from 'react'
import { NextResponse, NextRequest } from 'next/server'
import Router, { useRouter } from 'next/router'
import Split from 'split.js'



const inter = Inter({ subsets: ['latin'] })
export const ApplicationState = createContext()
export const SupabaseProvider = createContext()


import { createClient } from '@supabase/supabase-js'
import ViewerCanvas from '@/components/viewer/ViewerCanvas'
import Navbar from '@/components/navigation/navbar'
import Notepad from '@/components/editor/notepad'


// Create a single supabase client for interacting with your database
const supabase = createClient('https://pwyxrszihhunhhpvbdzw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eXhyc3ppaGh1bmhocHZiZHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1NTE4NzMsImV4cCI6MjAwMzEyNzg3M30.WGaK2ZjIYXY0bgVKM0O13BF5qkmySt13dfaZnnZ5A4A')

 


export default function Home() {
  let router = useRouter()

  const [CurrentState, setCurrentState] = useState(2);
  const [Veiwing, setVeiwing] = useState({ content: "", title: "" });
  const [allNotes, setallNotes] = useState(null);
  const [Lightmode, setLightmode] = useState(false)
  const [Loading, setLoading] = useState(true);

  async function GetNotes(userid) {
    const { data: notes, error:noteError } = await supabase
      .from('Notes')
      .select('id, user, title, x, y, content')
      .eq("user", userid)

    const { data: nodes, error:nodeError } = await supabase
      .from('Nodes')
      .select('*, user')
      .eq("user",userid)


  setallNotes({"nodes":nodes,"notes":notes})
  }



  async function update(Criteria, value, column, data) {
    const { error } = await supabase
      .from('Notes')
      .update(JSON.parse("{" + String(column) + ":" + String(data) + "}"))
      .eq(Criteria, value)
    console.log(error)
  }

  if (!((CurrentState > 3) & (CurrentState < 1))) { () => (setCurrentState(2)) }

  async function CheckAuth() {

    let cookie = null
    if (typeof window !== "undefined") {
      cookie = JSON.parse(localStorage.getItem("sb-pwyxrszihhunhhpvbdzw-auth-token"))
    }

    if ((typeof window !== "undefined")) {
      const { data: session, error: sessionError } = await supabase.auth.getSession()
      if (!sessionError) {
        GetNotes(String(cookie.user.id))
      }
      else if (sessionError) {
        router.push("/auth/login")
      }
      setLoading(false)
    }
    else {
      router.push("/auth/login")
    }

  }

  if (Loading) {
    CheckAuth()
    return (
      <div className='to-red-200 w-screen h-screen' ></div>
    )
  }
  else {
    return (
      <SupabaseProvider.Provider value={supabase}>
      <ApplicationState.Provider value={{ CurrentState, setCurrentState, Veiwing, setVeiwing, Lightmode, setLightmode }}>
        <main className={`${inter.className} flex flex-col w-screen h-screen overflow-hidden`}>
          <Navbar />
          <div className='w-[100vw] h-full flex flex-row'>
            <Notepad Notes={allNotes}/>
            <ViewerCanvas Notes={allNotes} />
          </div>
        </main>
      </ApplicationState.Provider>
      </SupabaseProvider.Provider>
    )
  }
}
