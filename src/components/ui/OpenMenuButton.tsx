"use client"

import { Dispatch, SetStateAction }from 'react'
import { LuMenu } from 'react-icons/lu'
import '@/styles/ui/OpenMenuButton.css'

interface props {
    isOpen: boolean
    onToggle: Dispatch<SetStateAction<boolean>>
}

export default function OpenMenuButton({ isOpen, onToggle }: props) {

    const handleClick = () => {
        onToggle(!isOpen)
    }

    return (
        <button id='OpenMenuButton' className='OpenMenuButton' onClick={handleClick} >
            <LuMenu size={20} className='theme_icons' />
        </button>
    )
}
