'use client'

import { useState, useEffect, use } from 'react'
import { CuisineType, Restaurant } from '@/types/Restaurant'
import { MenuItemCategory } from '@prisma/client' // Importe o Enum do Prisma
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { LuUpload, LuX, LuArrowLeft, LuPlus, LuTrash2 } from 'react-icons/lu'
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

  // Estado para o Menu
  const [menuItems, setMenuItems] = useState<any[]>([])

  useEffect(() => {
    async function loadRestaurant() {
      try {
        const res = await fetch(`/api/restaurants/getRestaurantById?restaurantId=${id}`)
        if (!res.ok) throw new Error('Restaurante não encontrado')
        const data: Restaurant = await res.json()
        
        setFormData({
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
        })
        
        setImagePreview(data.imageUrl || '')
        // Carregar pratos existentes com um preview inicial
        setMenuItems(data.menuItems?.map(item => ({ ...item, preview: item.imageUrl })) || [])
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
    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? parseFloat(value) : value }))
  }

  // Funções do Menu
  const handleMenuChange = (index: number, field: string, value: any) => {
    const updated = [...menuItems]
    updated[index][field] = field === 'price' ? parseFloat(value) : value
    setMenuItems(updated)
  }

  const handleMenuItemImage = (index: number, file: File) => {
    const updated = [...menuItems]
    updated[index].newImageFile = file
    updated[index].preview = URL.createObjectURL(file)
    setMenuItems(updated)
  }

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: '', description: '', price: 0, category: MenuItemCategory.MAIN_COURSE, preview: '', isNew: true }])
  }

  const removeMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index))
  }

  const uploadImage = async (file: File) => {
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)
    const res = await fetch('/api/uploads/upload-image', { method: 'POST', body: uploadFormData })
    const data = await res.json()
    return data.imageUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setMessage('⏳ Processando atualizações...')

    try {
      // 1. Upload imagem principal se mudou
      let finalImageUrl = imagePreview
      if (imageFile) finalImageUrl = await uploadImage(imageFile)

      // 2. Processar imagens do Menu (apenas as que mudaram)
      const processedMenuItems = await Promise.all(menuItems.map(async (item) => {
        let currentUrl = item.imageUrl
        if (item.newImageFile) {
          currentUrl = await uploadImage(item.newImageFile)
        }
        return {
          id: item.id, // Se for novo, será undefined
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          imageUrl: currentUrl
        }
      }))

      // 3. Enviar para o Backend
      const response = await fetch(`/api/restaurants/updateRestaurant/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          imageUrl: finalImageUrl,
          menuItems: processedMenuItems 
        }),
      })

      if (!response.ok) throw new Error('Erro ao salvar')
      setMessage('✅ Restaurante e Menu atualizados!')
      router.refresh()
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
        <button onClick={() => router.back()} className="back-button"><LuArrowLeft /> Voltar</button>
        <h1 className="title">Editar Restaurante</h1>

        {message && <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-info'}`}>{message}</div>}

        <form onSubmit={handleSubmit} className={`edit-form ${theme}`}>
          
          {/* SEÇÃO IMAGEM PRINCIPAL */}
          <div className="form-group">
            <label>Imagem Principal</label>
            <div className="image-preview-container">
               <Image src={imagePreview} alt="Preview" fill className="preview-img" />
               <label htmlFor="image-edit" className="upload-overlay">
                  <LuUpload size={24} />
                  <input type="file" id="image-edit" className="hidden-input" onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)) }
                  }} />
               </label>
            </div>
          </div>

          {/* DADOS BÁSICOS (MANTIDOS) */}
          <div className="form-group">
            <label>Nome *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Descrição *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} />
          </div>

          <div className="form-row">
            <div className="form-group">
                <label>Cidade</label>
                <input name="city" value={formData.city} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Telefone</label>
                <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
          </div>

          {/* SEÇÃO MENU ITEMS */}
          <div className="menu-edit-section">
            <div className="menu-header">
                <h2>Cardápio / Menu</h2>
                <button type="button" onClick={addMenuItem} className="add-menu-btn">
                    <LuPlus /> Adicionar Prato
                </button>
            </div>

            <div className="menu-items-list">
                {menuItems.map((item, index) => (
                    <div key={index} className="menu-item-edit-card">
                        <div className="menu-item-img-box">
                            {item.preview ? (
                                <Image src={item.preview} alt="Prato" fill className="object-cover rounded" />
                            ) : <LuUpload size={20} />}
                            <input type="file" className="hidden-file-input" onChange={(e) => e.target.files?.[0] && handleMenuItemImage(index, e.target.files[0])} />
                        </div>
                        
                        <div className="menu-item-inputs">
                            <input placeholder="Nome do prato" value={item.name} onChange={(e) => handleMenuChange(index, 'name', e.target.value)} />
                            <div className="row">
                                <input type="number" placeholder="Preço" value={item.price} onChange={(e) => handleMenuChange(index, 'price', e.target.value)} />
                                <select value={item.category} onChange={(e) => handleMenuChange(index, 'category', e.target.value)}>
                                    {Object.values(MenuItemCategory).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <button type="button" onClick={() => removeMenuItem(index)} className="delete-item-btn">
                            <LuTrash2 />
                        </button>
                    </div>
                ))}
            </div>
          </div>

          <button type="submit" disabled={updating} className="submit-button">
            {updating ? 'A guardar alterações...' : 'Salvar Tudo'}
          </button>
        </form>
      </div>
    </div>
  )
}