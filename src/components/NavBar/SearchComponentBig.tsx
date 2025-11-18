"use client"

import { useState, useRef } from 'react'
import { LuSearch } from 'react-icons/lu'
import '@/styles/NavBar/SearchComponent.css'

export default function SearchComponentBig() {

    const [search, setSearch] = useState<string>('')
    const [results, setResults] = useState<Array<any>>([])
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <section className='SearchResultsContainer'>

            <div className='SearchComponentBig_Container'>
                <input
                    ref={inputRef}
                    type="text"
                    className='SearchComponentBig_Input'
                    placeholder='Search...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className='SearchComponentBig_Button'
                    disabled={search.trim() === ''}
                    onClick={() => {
                        // Implement search functionality here
                        console.log('Searching for:', search)
                        // Optionally, clear the input after search
                        // setSearch('')
                        // inputRef.current?.blur()
                    }}
                >
                    <LuSearch size={20} />
                </button>
            </div>

            {results.length > 0 && (
                <div className='inputResultsContainer'>
                    {results.map((result, index) => (
                        <div key={index} className='inputResultItem'>
                            {result.name}
                        </div>
                    ))}
                </div>
            )}     

        </section>
    )
}
