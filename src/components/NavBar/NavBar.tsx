"use client"

import { useState } from 'react'
import Image from 'next/image'
import ToggleThemeButton from '../ui/ToggleThemeButton'
import '@/styles/NavBar/NavBar.css'
import OpenMenuButton from '../ui/OpenMenuButton'
import MenuDrawerContent from './MenuDrawerContent'

export default function NavBar() {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <header className='Header_Container'>
      <div className='container Header_Wrapper'>

        <Image src={'/images/logos/Logo.png'} alt='Logo' width={40} height={40} />

        <div className='buttons_container'>
          <ToggleThemeButton />
          <OpenMenuButton isOpen={isMenuOpen} onToggle={setIsMenuOpen} />
        </div>

      </div>

      {/* MENU CONTAINER */}
      <section className={`Menu_Container ${isMenuOpen ? 'active' : ''}`}>
          <MenuDrawerContent setIsMenuOpen={setIsMenuOpen} />
      </section>
      {/* MENU OVERLAY */}
      <div className={`Menu_Overlay ${isMenuOpen ? 'active' : ''}`}></div>

    </header>
  )
}
