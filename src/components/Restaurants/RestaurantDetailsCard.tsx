"use client"

import { useState } from "react"
import { LuLayoutGrid, LuLayoutList, LuStar, LuMapPin, LuClock, LuPhone, LuUtensils, LuChevronLeft, LuChevronRight, LuPencil } from 'react-icons/lu'
import { Restaurant, CuisineType } from "@/types/Restaurant"
import Image from "next/image"
import '@/styles/Restaurants/RestaurantDetails.css'
import Link from "next/link"

interface RestaurantDetailsViewProps {
  restaurant: Restaurant
}

export default function RestaurantDetailsCard({ restaurant }: RestaurantDetailsViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatCuisineType = (cuisine: CuisineType) => {
    return cuisine.charAt(0) + cuisine.slice(1).toLowerCase().replace('_', ' ')
  }

  const formatHours = (openHour: string, closeHour: string) => {
    return `${openHour} - ${closeHour}`
  }

  const nextImage = () => {
    if (restaurant.images && restaurant.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === restaurant.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (restaurant.images && restaurant.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? restaurant.images!.length - 1 : prev - 1
      )
    }
  }

  // Agrupar itens por categoria
  const groupedMenuItems = restaurant.menuItems?.reduce((acc, item) => {
    const category = item.category.replace('_', ' ') // Formata "MAIN_COURSE" para "MAIN COURSE"
    if (!acc[category]) acc[category] = []
    acc[category].push(item)
    return acc
  }, {} as Record<string, typeof restaurant.menuItems>)

  return (
    <div className="RestaurantDetails">
      <Link href={`/dashboard/edit-restaurant/${restaurant.id}`} className="EditRestaurant_Link">
        <LuPencil />
      </Link>

      {/* Hero Section */}
      <div className="RestaurantDetails_Hero">
        {restaurant.imageUrl && (
          <>
            <div className="RestaurantDetails_HeroImage">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="RestaurantDetails_HeroImg"
                priority
              />
            </div>
            <div className="RestaurantDetails_HeroOverlay" />
          </>
        )}

        <div className="RestaurantDetails_HeroCard">
          <h1 className="RestaurantDetails_Title">{restaurant.name}</h1>
          <div className="RestaurantDetails_HeroMeta">
            <div className="RestaurantDetails_Rating">
              <LuStar className="RestaurantDetails_Icon--star" />
              <span className="RestaurantDetails_RatingValue">{restaurant.rating.toFixed(1)}</span>
            </div>
            <div className="RestaurantDetails_Location">
              <LuMapPin className="RestaurantDetails_Icon" />
              <span>{restaurant.city}</span>
            </div>
            <div className="RestaurantDetails_CuisineBadge">
              <LuUtensils className="RestaurantDetails_Icon" />
              <span>{formatCuisineType(restaurant.cuisineType)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="RestaurantDetails_Container">
        {/* About & Quick Info */}
        <section className="RestaurantDetails_Section">
          <div className="RestaurantDetails_SectionHeader">
            <h2 className="RestaurantDetails_SectionTitle">Sobre o Restaurante</h2>
            <div className="RestaurantDetails_SectionDivider" />
          </div>
          <p className="RestaurantDetails_Description">{restaurant.description}</p>

          <div className="RestaurantDetails_InfoGrid mt-8">
            <div className="RestaurantDetails_InfoCard">
              <LuClock className="text-blue-500" size={24} />
              <div>
                <h3 className="font-bold">Horário</h3>
                <p>{formatHours(restaurant.openHour, restaurant.closeHour)}</p>
                <small>{restaurant.openDays}</small>
              </div>
            </div>
            <div className="RestaurantDetails_InfoCard">
              <LuPhone className="text-green-500" size={24} />
              <div>
                <h3 className="font-bold">Contacto</h3>
                <p>{restaurant.phoneNumber}</p>
              </div>
            </div>
            <div className="RestaurantDetails_InfoCard">
              <LuMapPin className="text-red-500" size={24} />
              <div>
                <h3 className="font-bold">Endereço</h3>
                <p>{restaurant.address}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        {restaurant.menuItems && restaurant.menuItems.length > 0 && (
          <section className="RestaurantDetails_Section RestaurantDetails_Menu">
            <div className="RestaurantDetails_MenuHeader">
              <div className="RestaurantDetails_SectionHeader">
                <h2 className="RestaurantDetails_SectionTitle">Menu / Cardápio</h2>
                <div className="RestaurantDetails_SectionDivider" />
              </div>

              <div className="RestaurantDetails_ViewToggle">
                <button
                  className={`RestaurantDetails_ViewBtn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LuLayoutGrid /> Grid
                </button>
                <button
                  className={`RestaurantDetails_ViewBtn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <LuLayoutList /> Lista
                </button>
              </div>
            </div>

            {/* Menu Items by Category */}
            {groupedMenuItems && Object.entries(groupedMenuItems).map(([category, items]) => (
              <div key={category} className="RestaurantDetails_MenuCategory">
                <h3 className="RestaurantDetails_CategoryTitle">{category}</h3>

                <div className={`RestaurantDetails_MenuItems ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
                  {items.map((item) => (
                    <div key={item.id} className="MenuCard">
                      {item.imageUrl && (
                        <div className="MenuCard_ImageWrapper">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="MenuCard_Image"
                          />
                          <div className="MenuCard_PriceBadge">
                            €{item.price.toFixed(2)}
                          </div>
                        </div>
                      )}

                      <div className="MenuCard_Content">
                        <div className="MenuCard_Header">
                          <h4 className="MenuCard_Title">{item.name}</h4>
                          {/* Se não houver imagem, o preço aparece aqui como fallback */}
                          {!item.imageUrl && <span className="MenuCard_PriceFallback">€{item.price.toFixed(2)}</span>}
                        </div>

                        {item.description && (
                          <p className="MenuCard_Description">{item.description}</p>
                        )}

                        <div className="MenuCard_Footer">
                          <span className="MenuCard_Tag">{category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}