import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { createClient } from "@supabase/supabase-js"

    const supabase = createClient('https://pwyxrszihhunhhpvbdzw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eXhyc3ppaGh1bmhocHZiZHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1NTE4NzMsImV4cCI6MjAwMzEyNzg3M30.WGaK2ZjIYXY0bgVKM0O13BF5qkmySt13dfaZnnZ5A4A')


export default function index() {

  let router = useRouter()

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          const target = e.target

          const { data, error } = await supabase.auth.signInWithPassword({
            email: target.email.value,
            password: target.password.value
          })

          if (!data.user) {
            window.location.href = mfaUrl
          } else {
            router.push('/')
          }
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" required />
        <button type="submit">Sign in</button>
      </form>
      <div>
        {"Don't have an account? "}
        <Link href="sign-up">
          <p>Sign up</p>
        </Link>
      </div>
    </div>
  )
}
