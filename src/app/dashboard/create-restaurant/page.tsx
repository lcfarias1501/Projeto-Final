'use client'

import { useState } from 'react'
import { CuisineType } from '@/types/Restaurant'
import { useTheme } from 'next-themes'

export default function Dashboard() {

  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    phoneNumber: '',
    cuisineType: CuisineType.OTHER,
    rating: 0,
    openHour: '',
    closeHour: '',
    openDays: '',
    imageUrl: '', // vazio por enquanto
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/restaurants/createRestaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const restaurant = await response.json()
        setMessage(`✅ Restaurante "${restaurant.name}" criado com sucesso!`)
        // Limpar formulário
        setFormData({
          name: '',
          description: '',
          address: '',
          city: '',
          phoneNumber: '',
          cuisineType: CuisineType.ITALIAN,
          rating: 0,
          openHour: '',
          closeHour: '',
          openDays: '',
          imageUrl: '',
        })
      } else {
        setMessage('❌ Erro ao criar restaurante')
      }
    } catch (error) {
      setMessage('❌ Erro ao conectar com a API')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screenpy-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Criar Novo Restaurante
        </h1>

        {message && (
          <div className={`p-4 mb-6 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={`${theme === 'light' ? 'shadow-gray' : 'shadow-gray-800'} shadow-md rounded-lg p-6 space-y-6`}>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Restaurante *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Endereço *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Cozinha *
              </label>
              <select
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {Object.values(CuisineType).map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avaliação (0-5) *
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                min="0"
                max="5"
                step="0.1"
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora de Abertura *
              </label>
              <input
                type="time"
                name="openHour"
                value={formData.openHour}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora de Fecho *
              </label>
              <input
                type="time"
                name="closeHour"
                value={formData.closeHour}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dias Abertos *
              </label>
              <input
                type="text"
                name="openDays"
                value={formData.openDays}
                onChange={handleChange}
                required
                placeholder="Ex: Seg-Dom"
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Criando...' : 'Criar Restaurante'}
          </button>
        </form>
      </div>
    </div>
  )
}