"use client"

import { useState, useEffect } from 'react'
import { LuSearch } from 'react-icons/lu'
import '@/styles/NavBar/SearchComponent.css'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchComponentBig() {
    const [search, setSearch] = useState<string>('')
    const [results, setResults] = useState<Array<any>>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        // Se o input estiver vazio, limpa os resultados e não faz o fetch
        if (!search.trim()) {
            setResults([])
            return
        }

        const controller = new AbortController()

        // Definir Timer do Debounce
        const debounceTimer = setTimeout(async () => {
            setIsLoading(true)
            try {
                const response = await fetch(
                    `/api/homeSearch?search=${encodeURIComponent(search.trim())}`,
                    { signal: controller.signal }
                )

                if (!response.ok) throw new Error("Failed to fetch")

                const data = await response.json()
                setResults(data.restaurants || [])
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.error("Search error:", error)
                }
            } finally {
                setIsLoading(false)
            }
        }, 1000) // Aguarda 1000ms após a última tecla digitada

        // CLEANUP: Se o usuário digitar novamente antes de 1000ms, 
        // esse return limpa o timer anterior e aborta a requisição em curso.
        return () => {
            clearTimeout(debounceTimer)
            controller.abort()
        }
    }, [search]) // Roda sempre que o estado 'search' mudar

    function clearInput() {
        setSearch('')
        setResults([])
    }

    return (
        <section className='SearchResultsContainer'>
            <div 
                className={`SearchComponentBig_Container ${search.trim() !== '' ? 'active' : ''}`}
            >
                <input
                    type="text"
                    className='SearchComponentBig_Input'
                    placeholder='Pesquisar restaurantes...'
                    value={search}
                    
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className='SearchIcon_Wrapper'>
                    {isLoading ? (
                        <div className="spinner" />
                    ) : (
                        <LuSearch size={20} />
                    )}
                </div>
            </div>

            {search.trim() !== '' &&
                <div className='SearchResultsDropdown'>
                    {isLoading ?
                        <div className='inputResultItem noResults'>Carregando resultados...</div>
                        :
                        results.length > 0 ?
                            results.map((result) => (
                                <Link key={result.id} href={`/restaurants/${result.id}`} className='inputResultItem' onClick={clearInput}>
                                    <Image
                                        src={result.imageUrl}
                                        alt={result.name}
                                        width={40}
                                        height={40}
                                        className="resultImage"
                                    />
                                    <div className='details'>
                                        <span className="resultName">{result.name}</span>
                                        <span className="resultCity">{result.city} | {result.cuisineType}</span>
                                    </div>
                                </Link>
                            ))
                            :
                            search.trim() !== '' &&
                            <div className='inputResultItem noResults'>Nenhum resultado encontrado</div>

                    }
                </div>
            }

        </section>
    )
}