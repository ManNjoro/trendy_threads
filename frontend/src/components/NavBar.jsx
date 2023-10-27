import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='nav-container'>
        <Link className="logo" to='/'></Link>
        <div className="nav-links">
            <NavLink className={({isActive})=> isActive ? "active" : null} to='/'>Home</NavLink>
            <NavLink to='/products'>Products</NavLink>
            <NavLink to='/cart'>Cart</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>SignUp</NavLink>
            <NavLink to='/logout'>Logout</NavLink>
        </div>
    </div>
  )
}
