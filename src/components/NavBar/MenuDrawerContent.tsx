'use client'

import React, { useEffect, useRef, useState } from 'react'
import { LuChevronLast, LuSearch, LuUser, LuMail, LuX, LuChevronDown } from 'react-icons/lu'
import { usePathname } from 'next/navigation'
import '@/styles/NavBar/MenuContent.css'
import menuItems from '@/constants/menuItems'
import Link from 'next/link'

interface MenuDrawerContentProps {
  isMenuOpen: boolean
  onCloseMenu: () => void
}

export default function MenuDrawerContent({ isMenuOpen, onCloseMenu }: MenuDrawerContentProps) {
  const pathname = usePathname()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisible, setIsVisible] = useState(isMenuOpen)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  // Sync visibility with prop (trigger animation on open/close)
  useEffect(() => {
    setIsVisible(isMenuOpen)
  }, [isMenuOpen])

  // Auto-focus close button when drawer opens (accessibility)
  useEffect(() => {
    if (isMenuOpen) closeButtonRef.current?.focus()
  }, [isMenuOpen])

  // Close drawer when user clicks a link
  const handleLinkClick = () => {
    setIsVisible(false)
    setTimeout(() => onCloseMenu(), 200)
  }

  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false)
        setTimeout(() => onCloseMenu(), 200)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onCloseMenu])

  // Toggle submenu expansion
  const toggleSubmenu = (itemName: string) => {
    setExpandedMenus(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  // Filter menu items based on search
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={`menu_drawer_content ${isVisible ? 'visible' : ''}`} role="navigation" aria-label="Menu principal">

      <div className='content_container w-full'>
        {/* CLOSE BUTTON */}
        <button
          ref={closeButtonRef}
          type='button'
          onClick={() => {
            setIsVisible(false)
            setTimeout(() => onCloseMenu(), 200)
          }}
          className='close_menu_button'
          aria-label="Fechar menu"
        >
          <LuX size={20} className='theme_icons' />
        </button>

        {/* MINI SEARCH BAR */}
        <div className='menu_search_container'>
          <LuSearch size={18} className='search_icon' />
          <input
            type='text'
            placeholder='Buscar páginas...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='menu_search_input'
          />
        </div>

        {/* LINKS DAS PÁGINAS */}
        <div>
          <h3 className='SectionTitle'>
            <span className='section_title_text pb-1'>Navegação</span>
          </h3>
          <div className='Divider'></div>
        </div>

        <nav>
          <ul className='w-full menu_list' role="list">
            {filteredItems.map((item, index) => {
              const isCurrentPage = pathname === item.path
              const isSubmenuExpanded = expandedMenus.includes(item.name)
              const hasSubmenu = Array.isArray(item.path)

              return (
                <li
                  key={item.name}
                  className={`menu_item ${isCurrentPage ? 'active' : ''}`}
                  style={{ '--item-index': index } as React.CSSProperties}
                >
                  {hasSubmenu ? (
                    <>
                      {/* MENU PRINCIPAL COM SUBMENU */}
                      <button
                        className='menu_link submenu_button'
                        type='button'
                        onClick={() => toggleSubmenu(item.name)}
                        aria-expanded={isSubmenuExpanded}
                      >
                        <span className='link_content'>{item.name}</span>
                        <LuChevronDown
                          size={18}
                          className={`submenu_icon ${isSubmenuExpanded ? 'expanded' : ''}`}
                        />
                      </button>

                      {/* SUBMENU */}
                      <ul className={`submenu_list ${isSubmenuExpanded ? 'expanded' : ''}`}>
                        {Array.isArray(item.path) && item.path.map((subItem) => {
                          const isSubItemActive = pathname === subItem.path
                          return (
                            <li key={subItem.name} className='submenu_item'>
                              <Link
                                href={subItem.path as string}
                                onClick={handleLinkClick}
                                aria-current={isSubItemActive ? 'page' : undefined}
                                className={`submenu_link ${isSubItemActive ? 'active' : ''}`}
                              >
                                <span className='link_content'>{subItem.name}</span>
                                <span className='submenu_dot'></span>
                                {isSubItemActive && <span className='active_indicator'></span>}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </>
                  ) : (
                    /* MENU NORMAL SEM SUBMENU */
                    <Link
                      href={item.path as string}
                      onClick={handleLinkClick}
                      aria-current={isCurrentPage ? 'page' : undefined}
                      className='menu_link'
                    >
                      <span className='link_content'>
                        {item.name}
                      </span>
                      {isCurrentPage && <span className='active_indicator'></span>}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* No results message */}
        {filteredItems.length === 0 && (
          <p className='no_results_message'>Nenhuma página encontrada</p>
        )}

      </div>

      {/* BOTTOM SECTION */}
      <div className='w-full menu_footer'>
        <p className='footer_text'>Versão 1.0.0</p>
      </div>

    </div>
  )
}