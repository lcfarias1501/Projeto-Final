'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { CuisineType, Restaurant } from "@/types/Restaurant"
import { RestaurantCategories } from "@/constants/RestaurantCategories"
import '@/styles/SearchPage/SearchPage.css'
import SearchResultsCard from "@/components/Search/SearchResultsCard"

export default function SearchPage() {
  const router = useRouter()
  const pathname = usePathname()
  const currentParams = useSearchParams()

  // 1. ESTADOS LOCAIS (Para os inputs)
  // Iniciamos com o que já está na URL para não perder o filtro ao dar refresh
  const [filters, setFilters] = useState({
    restaurantName: currentParams.get('restaurantName') || '',
    city: currentParams.get('city') || '',
    cuisineType: currentParams.get('cuisineType') || '',
  })

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 2. BUSCA NA API (Só dispara quando a URL muda)
  useEffect(() => {
    const controller = new AbortController()
    
    async function fetchData() {
      const query = currentParams.toString()
      // Se quiser que a página comece vazia sem filtros, mantenha o if abaixo
      // Se quiser que mostre tudo ao carregar, remova o if
      if (!query) return 

      setIsLoading(true)
      try {
        const res = await fetch(`/api/search?${query}`, { signal: controller.signal })
        const data = await res.json()
        console.log("Fetched Restaurants:", data)
        setRestaurants(data)
      } catch (err: any) {
        if (err.name !== 'AbortError') console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    return () => controller.abort()
  }, [currentParams])

  // 3. FUNÇÃO DO BOTÃO "PESQUISAR"
  const handleSearch = () => {
    const params = new URLSearchParams()

    // Percorre os filtros e só adiciona na URL o que não estiver vazio
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function clearFilters() {
    setFilters({restaurantName: '', city: '', cuisineType: ''})
    setRestaurants([])
    router.push(pathname)
  }

  return (
    <section className="container SearchPage">

      {/* BARRA DE PESQUISA / FILTROS */}
      <div className="SearchPage_Header">
        
        {/* Input Nome */}
        <div className="InputContainer header_section">
          <input 
            type="text" 
            value={filters.restaurantName}
            onChange={(e) => setFilters({...filters, restaurantName: e.target.value})}
            style={{ border: 0, paddingLeft: 0 }}
            placeholder="Nome do restaurante..."
          />
        </div>
        
        {/* Select Localidade */}
        <div className="InputContainer header_section">
          <input 
            type="text" 
            value={filters.city}
            onChange={(e) => setFilters({...filters, city: e.target.value})}
            className=""
            placeholder="Localidade..."
          />
        </div>

        {/* Select Cozinha */}
        <div className="InputContainer header_section">
          <select 
            value={filters.cuisineType}
            onChange={(e) => setFilters({...filters, cuisineType: e.target.value})}
            className=""
          >
            <option value="">Todas as cozinhas</option>
            {RestaurantCategories.map((category) => (
              <option key={category.value} value={category.slug}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* BOTÃO PESQUISAR */}
        <button 
          onClick={handleSearch}
          className="search_button"
        >
          Pesquisar
        </button>

        {/* Limpar Filtros */}
        <button 
          onClick={clearFilters}
          className="clear_filters_button" 
        >
          Limpar
        </button>
      </div>

      {/* RESULTADOS */}
      <div>
        {isLoading ? (
          <p>Carregando resultados...</p>
        ) : restaurants.length > 0 ? (
          <div className="SearchPage_Results">
            {restaurants.map((restaurant) => (
              <SearchResultsCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center my-12">
            <p>Os resultados da pesquisa aparecem aqui.</p>
          </div>
        )}
      </div>  
      
    </section>
  )
}