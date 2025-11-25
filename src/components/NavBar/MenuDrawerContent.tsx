'use client'

import React, { useEffect, useRef } from 'react'
import { LuChevronLast } from 'react-icons/lu'
import { usePathname } from 'next/navigation'
import '@/styles/NavBar/MenuContent.css'
import menuItems from '@/constants/menuItems'
import Link from 'next/link'

interface MenuDrawerContentProps {
  setIsMenuOpen: (isOpen: boolean) => void
}

export default function MenuDrawerContent({ setIsMenuOpen }: MenuDrawerContentProps) {
  const pathname = usePathname()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Auto-focus close button when drawer opens (accessibility)
  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  // Close drawer when user clicks a link
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [setIsMenuOpen])

  return (
    <div className='menu_drawer_content' role="navigation" aria-label="Menu principal">

      <div className='content_container w-full'>
        {/* CLOSE BUTTON */}
        <button
          ref={closeButtonRef}
          type='button'
          onClick={() => setIsMenuOpen(false)}
          className='close_menu_button'
          aria-label="Fechar menu"
        >
          <LuChevronLast size={24} className='theme_icons' />
        </button>

        {/* LINKS DAS PÁGINAS */}
        <div>
          <h3 className='SectionTitle'>Páginas</h3>
          <div className='Divider'></div>
        </div>

        <nav>
          <ul className='w-full' role="list">
            {menuItems.map((item) => {
              const isCurrentPage = pathname === item.path
              return (
                <li key={item.name} className={isCurrentPage ? 'active' : ''}>
                  <Link
                    href={item.path}
                    onClick={handleLinkClick}
                    aria-current={isCurrentPage ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* ÁREA DO USER */}
        {false &&
          <div>
            <h3 className='SectionTitle'>Perfil</h3>
            <div className='Divider'></div>
          </div>
        }


      </div>



      <div className='w-full'>
        <button className='Login_Button' onClick={() => setIsMenuOpen(false)}>
          Entre com sua conta
        </button>
      </div>

    </div>
  )
}