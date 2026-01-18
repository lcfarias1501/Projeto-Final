"use client"

import { useState } from "react"
import { LuLayoutGrid, LuLayoutList, LuStar, LuMapPin, LuClock, LuPhone, LuUtensils, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { Restaurant, CuisineType } from "@/types/Restaurant"
import Image from "next/image"
import '@/styles/Restaurants/RestaurantDetails.css'

interface RestaurantDetailsViewProps {
  restaurant: Restaurant
}

export default function RestaurantDetailsCard({ restaurant }: RestaurantDetailsViewProps) {

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Format cuisine type for display
  const formatCuisineType = (cuisine: CuisineType) => {
    return cuisine.charAt(0) + cuisine.slice(1).toLowerCase().replace('_', ' ')
  }

  // Format hours for display
  const formatHours = (openHour: string, closeHour: string) => {
    return `${openHour} - ${closeHour}`
  }

  // Gallery navigation
  const nextImage = () => {
    if (restaurant.images) {
      setCurrentImageIndex((prev) => 
        prev === restaurant.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (restaurant.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? restaurant.images!.length - 1 : prev - 1
      )
    }
  }

  // Group menu items by category
  const groupedMenuItems = restaurant.menuItems?.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof restaurant.menuItems>)

  return (
    <div className="RestaurantDetails">
      
      {/* Hero Section with Parallax Effect */}
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
        
        {/* Floating Info Card */}
        <div className="RestaurantDetails_HeroCard">
          <h1 className="RestaurantDetails_Title">{restaurant.name}</h1>
          
          <div className="RestaurantDetails_HeroMeta">
            <div className="RestaurantDetails_Rating">
              <LuStar className="RestaurantDetails_Icon--star" />
              <span className="RestaurantDetails_RatingValue">{restaurant.rating.toFixed(1)}</span>
              <span className="RestaurantDetails_RatingText">Excelente</span>
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

      {/* Main Content Container */}
      <div className="RestaurantDetails_Container">
        
        {/* About Section */}
        {restaurant.description && (
          <section className="RestaurantDetails_Section RestaurantDetails_About">
            <div className="RestaurantDetails_SectionHeader">
              <h2 className="RestaurantDetails_SectionTitle">Sobre o Restaurante</h2>
              <div className="RestaurantDetails_SectionDivider" />
            </div>
            <p className="RestaurantDetails_Description">{restaurant.description}</p>
          </section>
        )}

        {/* Quick Info Cards - Modern Glass Morphism Style */}
        <section className="RestaurantDetails_Section">
          <div className="RestaurantDetails_InfoGrid">
            
            <div className="RestaurantDetails_InfoCard">
              <div className="RestaurantDetails_InfoIcon RestaurantDetails_InfoIcon--clock">
                <LuClock />
              </div>
              <div className="RestaurantDetails_InfoContent">
                <h3 className="RestaurantDetails_InfoTitle">Horário de Funcionamento</h3>
                <p className="RestaurantDetails_InfoValue">{formatHours(restaurant.openHour, restaurant.closeHour)}</p>
                <p className="RestaurantDetails_InfoSubtext">{restaurant.openDays}</p>
              </div>
            </div>

            <div className="RestaurantDetails_InfoCard">
              <div className="RestaurantDetails_InfoIcon RestaurantDetails_InfoIcon--phone">
                <LuPhone />
              </div>
              <div className="RestaurantDetails_InfoContent">
                <h3 className="RestaurantDetails_InfoTitle">Contacto</h3>
                <p className="RestaurantDetails_InfoValue">{restaurant.phoneNumber}</p>
                <p className="RestaurantDetails_InfoSubtext">Ligue para reservar</p>
              </div>
            </div>

            <div className="RestaurantDetails_InfoCard">
              <div className="RestaurantDetails_InfoIcon RestaurantDetails_InfoIcon--location">
                <LuMapPin />
              </div>
              <div className="RestaurantDetails_InfoContent">
                <h3 className="RestaurantDetails_InfoTitle">Localização</h3>
                <p className="RestaurantDetails_InfoValue">{restaurant.address}</p>
                <p className="RestaurantDetails_InfoSubtext">{restaurant.city}</p>
              </div>
            </div>

          </div>
        </section>

        {/* Gallery Section with Carousel */}
        {restaurant.images && restaurant.images.length > 0 && (
          <section className="RestaurantDetails_Section RestaurantDetails_Gallery">
            <div className="RestaurantDetails_SectionHeader">
              <h2 className="RestaurantDetails_SectionTitle">Galeria</h2>
              <div className="RestaurantDetails_SectionDivider" />
            </div>

            <div className="RestaurantDetails_Carousel">
              <button 
                className="RestaurantDetails_CarouselBtn RestaurantDetails_CarouselBtn--prev"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <LuChevronLeft />
              </button>

              <div className="RestaurantDetails_CarouselMain">
                <Image
                  src={restaurant.images[currentImageIndex].imageUrl}
                  alt={`${restaurant.name} - Image ${currentImageIndex + 1}`}
                  fill
                  className="RestaurantDetails_CarouselImage"
                />
              </div>

              <button 
                className="RestaurantDetails_CarouselBtn RestaurantDetails_CarouselBtn--next"
                onClick={nextImage}
                aria-label="Next image"
              >
                <LuChevronRight />
              </button>

              {/* Thumbnail Navigation */}
              <div className="RestaurantDetails_CarouselThumbs">
                {restaurant.images.map((img, index) => (
                  <button
                    key={img.id}
                    className={`RestaurantDetails_CarouselThumb ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={img.imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="RestaurantDetails_CarouselThumbImg"
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Menu Section with Categories */}
        {restaurant.menuItems && restaurant.menuItems.length > 0 && (
          <section className="RestaurantDetails_Section RestaurantDetails_Menu">
            <div className="RestaurantDetails_MenuHeader">
              <div className="RestaurantDetails_SectionHeader">
                <h2 className="RestaurantDetails_SectionTitle">Menu</h2>
                <div className="RestaurantDetails_SectionDivider" />
              </div>
              
              <div className="RestaurantDetails_ViewToggle">
                <button
                  className={`RestaurantDetails_ViewBtn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <LuLayoutGrid />
                  <span>Grid</span>
                </button>
                <button
                  className={`RestaurantDetails_ViewBtn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <LuLayoutList />
                  <span>Lista</span>
                </button>
              </div>
            </div>

            {/* Menu Items by Category */}
            {groupedMenuItems && Object.entries(groupedMenuItems).map(([category, items]) => (
              <div key={category} className="RestaurantDetails_MenuCategory">
                <h3 className="RestaurantDetails_CategoryTitle">{category}</h3>
                
                <div className={`RestaurantDetails_MenuItems ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
                  {items.map((item) => (
                    <div key={item.id} className="RestaurantDetails_MenuItem">
                      <div className="RestaurantDetails_MenuItemContent">
                        <div className="RestaurantDetails_MenuItemHeader">
                          <h4 className="RestaurantDetails_MenuItemName">{item.name}</h4>
                          <span className="RestaurantDetails_MenuItemPrice">€{item.price.toFixed(2)}</span>
                        </div>
                        
                        {item.description && (
                          <p className="RestaurantDetails_MenuItemDescription">{item.description}</p>
                        )}
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