
import React from 'react'
import { LuPanelRightClose } from 'react-icons/lu'
import '@/styles/NavBar/MenuContent.css'

interface MenuDrawerContentProps {
    setIsMenuOpen: (isOpen: boolean) => void
}
    
export default function MenuDrawerContent({ setIsMenuOpen }: MenuDrawerContentProps) {
  return (
    <div className='menu_drawer_content'>

        <div className='content_container w-full'>
            {/* CLOSE BUTTON */}
            <button type='button' onClick={() => setIsMenuOpen(false)} className='close_menu_button text-black'>
                <LuPanelRightClose size={24} className='theme_icons' />
            </button>

            <h3 className='SectionTitle'>Páginas</h3>
            <ul className='w-full'>
                <li><a href='/'>Home</a></li>
                <li><a href='/about'>Sobre</a></li>
                <li><a href='/map'>Mapa</a></li>
                <li><a href='/checkout'>Carrinho</a></li>
            </ul>
        </div>

        <div className='w-full'>
            <button className='Login_Button'>
                Entre com sua conta
            </button>
        </div>

    </div>
  )
}

