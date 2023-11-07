import React from 'react'
import { redirect } from 'react-router-dom'

export function fakeLogOut() {
    localStorage.removeItem("isAuthenticated")
    return redirect('/login')
}

