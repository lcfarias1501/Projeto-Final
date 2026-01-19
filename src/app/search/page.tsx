'use client'

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Restaurant } from "@/types/Restaurant"
import { RestaurantCategories } from "@/constants/RestaurantCategories"
import '@/styles/SearchPage/SearchPage.css'
import SearchResultsCard from "@/components/Search/SearchResultsCard"

// 1. Crie um componente interno com toda a lógica
function SearchContent() {
  const router = useRouter()
  const pathname = usePathname()
  const currentParams = useSearchParams()

  const [filters, setFilters] = useState({
    restaurantName: currentParams.get('restaurantName') || '',
    city: currentParams.get('city') || '',
    cuisineType: currentParams.get('cuisineType') || '',
  })

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    async function fetchData() {
      const query = currentParams.toString()
      if (!query) return

      setIsLoading(true)
      try {
        const res = await fetch(`/api/search?${query}`, { signal: controller.signal })
        const data = await res.json()
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

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function clearFilters() {
    setFilters({ restaurantName: '', city: '', cuisineType: '' })
    setRestaurants([])
    router.push(pathname)
  }

  return (
    <section className="container SearchPage">
      <div className="SearchPage_Header">
        <div className="InputContainer header_section ">
          <input
            type="text"
            value={filters.restaurantName}
            onChange={(e) => setFilters({ ...filters, restaurantName: e.target.value })}
            placeholder="Nome do restaurante..."
            style={{ border: 0, paddingLeft: 0 }}
          />
        </div>
        <div className="InputContainer header_section">
          <input
            type="text"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            placeholder="Localidade..."
          />
        </div>
        <div className="InputContainer header_section">
          <select
            value={filters.cuisineType}
            onChange={(e) => setFilters({ ...filters, cuisineType: e.target.value })}
          >
            <option value="">Todas as cozinhas</option>
            {RestaurantCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSearch} className="search_button">Pesquisar</button>
        <button onClick={clearFilters} className="clear_filters_button">Limpar</button>
      </div>
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

// 2. O componente principal (Página) apenas envolve o conteúdo no Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<div>Carregando busca...</div>}>
      <SearchContent />
    </Suspense>
  )
}