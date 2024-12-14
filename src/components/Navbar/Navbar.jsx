// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-items">
        <div className="left">
            <img src={assets.film_icon} alt="" />
            <p>Database Film</p>
        </div>
        <div className="right">
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#popular">Popular</a></li>
            <li><a href="#upcoming">Upcoming</a></li>
            <li><a href="#">Information</a></li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
