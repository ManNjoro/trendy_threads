import React from 'react'
import { redirect } from 'react-router-dom'

export default function Logout() {
    function fakeLogOut() {
        localStorage.removeItem("loggedin")
        return redirect('/login')
    }
    fakeLogOut()
  return
}
