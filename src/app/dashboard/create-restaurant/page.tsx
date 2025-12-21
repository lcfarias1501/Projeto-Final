'use client'

import { useState } from 'react'
import { CuisineType } from '@/types/Restaurant'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { LuUpload, LuX } from 'react-icons/lu'

export default function CreateRestaurant() {

  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

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
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }))
  }

  // Selecionar imagem (apenas preview local, SEM upload)
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setMessage('❌ Tipo de arquivo inválido. Use JPG, PNG ou WEBP')
      return
    }

    // Validar tamanho (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setMessage('❌ Arquivo muito grande. Máximo 5MB')
      return
    }

    // Guardar arquivo e criar preview local
    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    setMessage('') // Limpar mensagens de erro
  }

  // Remover imagem
  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview('')
  }

  // Upload da imagem para Cloudinary
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/uploads/upload-image', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao fazer upload da imagem')
    }

    return data.imageUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!imageFile) {
      setMessage('❌ Por favor, adicione uma imagem do restaurante')
      return
    }

    setLoading(true)
    setMessage('⏳ Fazendo upload da imagem...')

    try {
      // 1. PRIMEIRO: Upload da imagem
      const imageUrl = await uploadImage(imageFile)
      
      setMessage('⏳ Criando restaurante...')

      // 2. DEPOIS: Criar restaurante com a URL da imagem
      const response = await fetch('/api/restaurants/createRestaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imageUrl
        }),
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
          cuisineType: CuisineType.OTHER,
          rating: 0,
          openHour: '',
          closeHour: '',
          openDays: '',
        })
        setImageFile(null)
        setImagePreview('')
      } else {
        setMessage('❌ Erro ao criar restaurante')
      }
    } catch (error: any) {
      setMessage(`❌ ${error.message || 'Erro ao processar'}`)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Criar Novo Restaurante
        </h1>

        {message && (
          <div className={`p-4 mb-6 rounded-lg ${
            message.includes('✅') 
              ? 'bg-green-100 text-green-800' 
              : message.includes('⏳')
              ? 'bg-blue-100 text-blue-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={`${theme === 'light' ? 'shadow-gray' : 'shadow-gray-800'} shadow-md rounded-lg p-6 space-y-6`}>

          {/* SELEÇÃO DE IMAGEM */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem do Restaurante *
            </label>
            
            {!imagePreview ? (
              <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                theme === 'light' ? 'border-gray-300' : 'border-gray-600'
              }`}>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                  disabled={loading}
                />
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer flex flex-col items-center gap-2 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <LuUpload size={40} className="text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Clique para selecionar imagem
                  </p>
                  <p className="text-xs text-gray-500">
                    JPG, PNG ou WEBP (máx. 5MB)
                  </p>
                </label>
              </div>
            ) : (
              <div className={`relative w-full h-64 rounded-lg overflow-hidden border ${
                theme === 'light' ? 'border-gray-300' : 'border-gray-600'
              }`}>
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={loading}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition disabled:opacity-50"
                  aria-label="Remover imagem"
                >
                  <LuX size={20} />
                </button>
              </div>
            )}
          </div>

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
              disabled={loading}
              className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
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
              disabled={loading}
              rows={4}
              className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
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
                disabled={loading}
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
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
                disabled={loading}
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
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
              disabled={loading}
              className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
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
                disabled={loading}
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
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
                disabled={loading}
                min="0"
                max="5"
                step="0.1"
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
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
                disabled={loading}
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
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
                disabled={loading}
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
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
                disabled={loading}
                placeholder="Ex: Seg-Dom"
                className={`w-full px-3 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Processando...' : 'Criar Restaurante'}
          </button>
        </form>
      </div>
    </div>
  )
}