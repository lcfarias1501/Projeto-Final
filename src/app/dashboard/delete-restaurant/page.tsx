"use client"

import { useState, useEffect } from 'react'
import '@/styles/Dashboard/DeleteRestaurant.css'

export default function DeleteRestaurant() {
  const [searchTerm, setSearchTerm] = useState('')
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Debounce para buscar enquanto digita
  useEffect(() => {
    if (!searchTerm.trim()) {
      setRestaurants([])
      return
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/search?restaurantName=${searchTerm}`)
        const data = await res.json()
        setRestaurants(data)
      } catch (error) {
        console.error("Erro ao buscar:", error)
      } finally {
        setIsLoading(false)
      }
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = confirm(`Tem certeza que deseja apagar o restaurante "${name}"? Esta ação não pode ser desfeita.`)

    if (confirmDelete) {
      try {
        const res = await fetch(`/api/restaurants/deleteRestaurantById/${id}`, { method: 'DELETE' })
        if (res.ok) {
          // Remove da lista local após deletar com sucesso
          setRestaurants(restaurants.filter(r => r.id !== id))
          alert("Restaurante removido com sucesso!")
        }
      } catch (error) {
        alert("Erro ao deletar restaurante.")
      }
    }
  }

  return (
    <section className="delete-container">
      <div className="delete-card">
        <h1>Apagar Restaurantes</h1>
        <p className="subtitle">Busque pelo nome para remover do sistema</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Digite o nome do restaurante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="results-list">
          {isLoading && <p className="status-text">Buscando...</p>}

          {!isLoading && searchTerm && restaurants.length === 0 && (
            <p className="status-text">Nenhum restaurante encontrado.</p>
          )}

          {restaurants.map((res) => (
            <div key={res.id} className="restaurant-item">
              <div className="restaurant-info">
                <strong>{res.name}</strong>
                <span>{res.city}</span>
              </div>
              <button
                onClick={() => handleDelete(res.id, res.name)}
                className="delete-btn"
              >
                Deletar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}