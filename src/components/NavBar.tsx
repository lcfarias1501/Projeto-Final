"use client"

import { } from 'react'
import Image from 'next/image'
import ToggleThemeButton from './ui/ToggleThemeButton'
import '@/styles/NavBar/NavBar.css'

export default function NavBar() {



  return (
    <header className='Header_Container'>
      <div className='container'>


        <Image src={'/images/logos/Logo.png'} alt='Logo' width={35} height={35} />

        <div className='buttons_container'>
          <ToggleThemeButton />

          
        </div>

      </div>
    </header>
  )
}
