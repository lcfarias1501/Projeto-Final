'use client'

import { useState } from 'react'
import { CuisineType } from '@/types/Restaurant'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { LuUpload, LuX, LuPlus, LuTrash2 } from 'react-icons/lu'
import { MenuItemCategory } from '@prisma/client'

export default function CreateRestaurant() {
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const [restaurantImage, setRestaurantImage] = useState<File | null>(null)
  const [restaurantPreview, setRestaurantPreview] = useState('')

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
    menuItems: [
      { name: '', description: '', price: 0, category: MenuItemCategory.MAIN_COURSE, imageFile: null as File | null, preview: '' }
    ]
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'rating' ? parseFloat(value) : value 
    }))
  }

  const handleMenuChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newItems = [...formData.menuItems]
    // @ts-ignore
    newItems[index][name] = name === 'price' ? parseFloat(value) : value
    setFormData({ ...formData, menuItems: newItems })
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0]
    if (!file) return
    const previewUrl = URL.createObjectURL(file)

    if (index !== undefined) {
      const newItems = [...formData.menuItems]
      newItems[index].imageFile = file
      newItems[index].preview = previewUrl
      setFormData({ ...formData, menuItems: newItems })
    } else {
      setRestaurantImage(file)
      setRestaurantPreview(previewUrl)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const data = new FormData()
    data.append('file', file)
    const res = await fetch('/api/uploads/upload-image', { method: 'POST', body: data })
    if (!res.ok) throw new Error('Falha no upload')
    const json = await res.json()
    return json.imageUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!restaurantImage) return setMessage('❌ Adicione a imagem do restaurante')
    
    setLoading(true)
    setMessage('⏳ Processando imagens e dados...')

    try {
      const restaurantUrl = await uploadImage(restaurantImage)

      const menuItemsWithUrls = await Promise.all(
        formData.menuItems.map(async (item) => {
          let itemUrl = ''
          if (item.imageFile) itemUrl = await uploadImage(item.imageFile)
          return {
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            imageUrl: itemUrl
          }
        })
      )

      const response = await fetch('/api/restaurants/createRestaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, imageUrl: restaurantUrl, menuItems: menuItemsWithUrls }),
      })

      if (response.ok) {
        setMessage('✅ Restaurante e Menu criados com sucesso!')
      } else {
        throw new Error('Erro ao salvar no servidor')
      }
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const inputStyles = `w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${
    theme === 'dark' ? 'border-gray-700 text-white' : 'border-gray-300'
  }`

  return (
    <div className="min-h-screen py-8 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Novo Restaurante</h1>
      
      {message && (
        <div className={`p-4 mb-4 rounded border ${
          message.includes('✅') ? 'bg-green-100 border-green-200 text-green-800' : 'bg-blue-100 border-blue-200 text-blue-800'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* DADOS DO RESTAURANTE */}
        <section className={`p-6 rounded-xl shadow-sm border ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        } space-y-4`}>
          
          <div className="flex flex-col items-center border-2 border-dashed p-4 rounded-lg border-gray-400">
            {restaurantPreview ? (
              <div className="relative w-full h-48">
                <Image src={restaurantPreview} alt="Preview" fill className="rounded-lg object-cover" />
                <button onClick={() => {setRestaurantImage(null); setRestaurantPreview('')}} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"><LuX /></button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center py-6">
                <LuUpload size={32} className="text-gray-400" />
                <span className="text-gray-500">Foto Principal do Restaurante</span>
                <input type="file" className="hidden" onChange={(e) => handleImageSelect(e)} />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Nome *</label>
              <input name="name" placeholder="Ex: Cantina do Chef" onChange={handleChange} className={inputStyles} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Tipo de Cozinha *</label>
              <select name="cuisineType" onChange={handleChange} className={inputStyles} required>
                {Object.values(CuisineType).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Descrição *</label>
            <textarea name="description" placeholder="Sobre o restaurante..." onChange={handleChange} className={inputStyles} rows={3} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Cidade *</label>
              <input name="city" placeholder="Lisboa" onChange={handleChange} className={inputStyles} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Telefone *</label>
              <input name="phoneNumber" placeholder="+351 ..." onChange={handleChange} className={inputStyles} required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Endereço Completo *</label>
            <input name="address" placeholder="Rua, número..." onChange={handleChange} className={inputStyles} required />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="space-y-1">
                <label className="text-sm font-medium">Avaliação</label>
                <input type="number" name="rating" step="0.1" min="0" max="5" placeholder="0-5" onChange={handleChange} className={inputStyles} />
             </div>
             <div className="space-y-1">
                <label className="text-sm font-medium">Abertura</label>
                <input type="time" name="openHour" onChange={handleChange} className={inputStyles} required />
             </div>
             <div className="space-y-1">
                <label className="text-sm font-medium">Fecho</label>
                <input type="time" name="closeHour" onChange={handleChange} className={inputStyles} required />
             </div>
             <div className="space-y-1">
                <label className="text-sm font-medium">Dias</label>
                <input name="openDays" placeholder="Seg-Sex" onChange={handleChange} className={inputStyles} required />
             </div>
          </div>
        </section>

        {/* SEÇÃO DO MENU */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Menu Items</h2>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, menuItems: [...formData.menuItems, { name: '', description: '', price: 0, category: MenuItemCategory.MAIN_COURSE, imageFile: null, preview: '' }]})} 
              className="flex items-center gap-2 text-blue-500 font-medium"
            >
              <LuPlus /> Adicionar Prato
            </button>
          </div>

          {formData.menuItems.map((item, index) => (
            <div key={index} className={`p-4 border rounded-lg relative ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, menuItems: formData.menuItems.filter((_, i) => i !== index)})} 
                className="absolute -top-2 -right-2 text-white bg-red-500 rounded-full p-1 shadow-lg"
              >
                <LuTrash2 size={16}/>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center border rounded border-gray-400 h-32 relative overflow-hidden ">
                  {item.preview ? (
                    <Image src={item.preview} alt="Prato" fill className="object-cover" />
                  ) : (
                    <label className="cursor-pointer text-xs flex flex-col items-center p-2 text-center">
                      <LuUpload size={20}/>
                      <span>Foto do Prato</span>
                      <input type="file" className="hidden" onChange={(e) => handleImageSelect(e, index)} />
                    </label>
                  )}
                </div>
                <div className="col-span-2 space-y-2">
                  <input placeholder="Nome do prato" name="name" value={item.name} onChange={(e) => handleMenuChange(index, e)} className={inputStyles} required />
                  <div className="flex gap-2">
                    <input type="number" placeholder="Preço (€)" name="price" onChange={(e) => handleMenuChange(index, e)} className={inputStyles} required />
                    <select name="category" onChange={(e) => handleMenuChange(index, e)} className={inputStyles}>
                      {Object.values(MenuItemCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <textarea placeholder="Pequena descrição do prato..." name="description" onChange={(e) => handleMenuChange(index, e)} className={inputStyles} rows={1} />
                </div>
              </div>
            </div>
          ))}
        </section>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-500">
          {loading ? 'A criar restaurante...' : 'Finalizar e Criar Restaurante'}
        </button>
      </form>
    </div>
  )
}