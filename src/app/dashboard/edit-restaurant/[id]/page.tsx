'use client'

import { useState, useEffect, use } from 'react'
import { CuisineType, Restaurant } from '@/types/Restaurant'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { LuUpload, LuX, LuArrowLeft } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import '@/styles/Dashboard/EditRestaurant.css'

export default function EditRestaurant({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { theme } = useTheme()
  const router = useRouter()
  
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [message, setMessage] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [initialData, setInitialData] = useState<any>(null)

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

  useEffect(() => {
    async function loadRestaurant() {
      try {
        const res = await fetch(`/api/restaurants/getRestaurantById?restaurantId=${id}`)
        if (!res.ok) throw new Error('Restaurante não encontrado')
        const data: Restaurant = await res.json()
        
        const mappedData = {
          name: data.name,
          description: data.description,
          address: data.address,
          city: data.city,
          phoneNumber: data.phoneNumber,
          cuisineType: data.cuisineType,
          rating: data.rating,
          openHour: data.openHour,
          closeHour: data.closeHour,
          openDays: data.openDays,
        }
        
        setFormData(mappedData)
        setInitialData(mappedData)
        setImagePreview(data.imageUrl || '')
      } catch (err: any) {
        setMessage(`❌ ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
    loadRestaurant()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }))
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setMessage('⏳ Verificando alterações...')

    try {
      let imageUrl = undefined

      if (imageFile) {
        setMessage('⏳ Subindo nova imagem...')
        const uploadFormData = new FormData()
        uploadFormData.append('file', imageFile)
        const uploadRes = await fetch('/api/uploads/upload-image', { method: 'POST', body: uploadFormData })
        const uploadData = await uploadRes.json()
        imageUrl = uploadData.imageUrl
      }

      const changedFields: any = {}
      Object.keys(formData).forEach(key => {
        if (formData[key as keyof typeof formData] !== initialData[key]) {
          changedFields[key] = formData[key as keyof typeof formData]
        }
      })

      if (imageUrl) changedFields.imageUrl = imageUrl

      if (Object.keys(changedFields).length === 0) {
        setMessage('ℹ️ Nenhuma alteração detectada.')
        setUpdating(false)
        return
      }

      const response = await fetch(`/api/restaurants/updateRestaurant/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changedFields),
      })

      if (response.ok) {
        setMessage('✅ Atualizado com sucesso!')
        setInitialData({ ...formData })
      } else {
        throw new Error('Erro ao atualizar')
      }
    } catch (error: any) {
      setMessage(`❌ ${error.message}`)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <div className="loading-state">Carregando dados...</div>

  return (
    <div className="edit-page-container">
      <div className="edit-card">
        <button onClick={() => router.back()} className="back-button">
          <LuArrowLeft /> Voltar
        </button>
        
        <h1 className="title">Editar Restaurante</h1>

        {message && (
          <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-info'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={`edit-form ${theme}`}>
          
          {/* IMAGE SECTION */}
          <div className="form-group">
            <label>Imagem do Restaurante</label>
            <div className="image-preview-container">
               <Image src={imagePreview} alt="Preview" fill className="preview-img" />
               <label htmlFor="image-edit" className="upload-overlay">
                  <LuUpload size={24} color='white' />
                  <input type="file" id="image-edit" className="hidden-input" onChange={handleImageSelect} />
               </label>
            </div>
          </div>

          {/* NAME */}
          <div className="form-group">
            <label>Nome do Restaurante *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label>Descrição *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} />
          </div>

          {/* CITY & PHONE */}
          <div className="form-row">
            <div className="form-group">
              <label>Cidade *</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Telefone *</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="form-group">
            <label>Endereço *</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>

          {/* CUISINE & RATING */}
          <div className="form-row">
            <div className="form-group">
              <label>Cozinha *</label>
              <select name="cuisineType" value={formData.cuisineType} onChange={handleChange} required>
                {Object.values(CuisineType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Avaliação (0-5) *</label>
              <input type="number" name="rating" value={formData.rating} onChange={handleChange} required min="0" max="5" step="0.1" />
            </div>
          </div>

          {/* HOURS & DAYS */}
          <div className="form-row-three">
            <div className="form-group">
              <label>Abertura</label>
              <input type="time" name="openHour" value={formData.openHour} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Fecho</label>
              <input type="time" name="closeHour" value={formData.closeHour} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Dias</label>
              <input type="text" name="openDays" value={formData.openDays} onChange={handleChange} required placeholder="Ex: Seg-Sex" />
            </div>
          </div>

          <button type="submit" disabled={updating} className="submit-button">
            {updating ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  )
}