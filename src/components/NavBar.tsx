"use client"

import { useState } from 'react'
import Image from 'next/image'
import ToggleThemeButton from './ui/ToggleThemeButton'
import '@/styles/NavBar/NavBar.css'
import OpenMenuButton from './ui/OpenMenuButton'

export default function NavBar() {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <header className='Header_Container'>
      <div className='container'>


        <Image src={'/images/logos/Logo.png'} alt='Logo' width={35} height={35} />

        <div className='buttons_container'>
          <ToggleThemeButton />
          <OpenMenuButton isOpen={isMenuOpen} onToggle={setIsMenuOpen} />
        </div>

      </div>

      {/* MENU CONTAINER */}
      <div className={`Menu_Container ${isMenuOpen ? 'active' : ''}`}>
        <nav className='menu_nav'>
          <button type='button' onClick={() => setIsMenuOpen(false)} className='close_menu_button text-black'>
            Fechar Menu
          </button>
          <ul>
            <li><a href='#'>Home</a></li>
            <li><a href='#'>About</a></li>
            <li><a href='#'>Services</a></li>
            <li><a href='#'>Contact</a></li>
          </ul>
        </nav>
      </div>
      {/* MENU OVERLAY */}
      <div className={`Menu_Overlay ${isMenuOpen ? 'active' : ''}`}></div>

    </header>
  )
}
