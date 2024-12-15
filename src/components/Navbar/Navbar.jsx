// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
  
const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const homeSection = document.getElementById('home');
        const popularSection = document.getElementById('popular');
        const upcomingSection = document.getElementById('upcoming');

        const popularOffset = popularSection.offsetTop - 300;
        const upcomingOffset = upcomingSection.offsetTop - 300;
        

        if (homeSection && 
            scrollPosition >= homeSection.offsetTop && 
            scrollPosition < popularOffset) {
            setActiveSection('home');
        } else if (popularSection && 
            scrollPosition >= popularOffset && 
            scrollPosition < upcomingOffset) {
            setActiveSection('popular');
        } else if (upcomingSection && 
            scrollPosition > upcomingOffset) {
            setActiveSection('upcoming');
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  return (
    <div className='navbar'>
      <div className="navbar-items">
        <div className="left">
            <img src={assets.film_icon} alt="" />
            <p>Database Film</p>
        </div>
        <div className='right'>  
        <button className='right-toggle' onClick={toggleMenu}>☰</button>
        <ul className={`right-menu ${isOpen ? "" : "open"}`}>
            <li><a href="#home" className={activeSection === 'home' ? "active" : ""}>Home</a></li>
            <li><a href="#popular" className={activeSection === 'popular' ? "active" : ""}>Popular</a></li>
            <li><a href="#upcoming" className={activeSection === 'upcoming' ? "active" : ""}>Upcoming</a></li>            <li><a href="https://portofolio-fanja.netlify.app/" target='_blank' rel='noopener noreferrer'>Developer</a></li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
