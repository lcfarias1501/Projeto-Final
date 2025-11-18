"use client"

import { useState } from 'react'
import Image from 'next/image'
import ToggleThemeButton from '../ui/ToggleThemeButton'
import '@/styles/NavBar/NavBar.css'
import OpenMenuButton from '../ui/OpenMenuButton'
import MenuDrawerContent from './MenuDrawerContent'
import SearchComponentBig from './SearchComponentBig'

export default function NavBar() {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <header className='Header_Container'>
      <div className='container Header_Wrapper'>

        <a href="/">
          <Image src={'/images/logos/Logo_Cyan.png'} alt='Logo' width={35} height={35} />
        </a>

        <SearchComponentBig />

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
      <div className={`Menu_Overlay ${isMenuOpen ? 'active' : ''}`} onClick={()=> setIsMenuOpen(false)}></div>

    </header>
  )
}
