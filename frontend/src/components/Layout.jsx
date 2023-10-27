import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
    <div>
        <NavBar />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
    </div>
  )
}
