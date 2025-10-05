import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Layout(){
  return (
    <div>
      <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-10">
        <nav className="container py-3 flex gap-4">
          <NavLink to="/" className="font-semibold">Archive</NavLink>
          <NavLink to="/stories" className={({isActive})=>isActive?'underline':''}>Stories</NavLink>
          <NavLink to="/reflections" className={({isActive})=>isActive?'underline':''}>Contribute</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive?'underline':''}>About</NavLink>
        </nav>
      </header>
      <main className="container py-8">
        <Outlet />
      </main>
      <footer className="container py-8 text-sm text-zinc-500">© {new Date().getFullYear()} Volunteer Archive</footer>
    </div>
  )
}
