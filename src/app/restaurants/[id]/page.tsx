"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { LuLayoutGrid, LuLayoutList, LuStar, LuMapPin, LuClock, LuPhone, LuUtensils } from 'react-icons/lu'
import '@/styles/Restaurants/RestaurantDetails.css'
import { Restaurant, CuisineType } from "@/types/Restaurant"
import Image from "next/image"

export default function RestaurantDetailsPage() {
    const params = useParams()
    const restaurantId = params.id as string

    const [loading, setLoading] = useState(false)
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    useEffect(() => {
        async function fetchRestaurantDetails() {
            setLoading(true)
            try {
                const response = await fetch(`/api/restaurants/getRestaurantById?restaurantId=${restaurantId}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch restaurant details")
                }
                const data = await response.json()
                setRestaurant(data)
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchRestaurantDetails()
    }, [restaurantId])

    // Format cuisine type for display
    const formatCuisineType = (cuisine: CuisineType) => {
        return cuisine.charAt(0) + cuisine.slice(1).toLowerCase().replace('_', ' ')
    }

    // Format hours for display
    const formatHours = (openHour: string, closeHour: string) => {
        return `${openHour} - ${closeHour}`
    }

    if (loading) {
        return (
            <div className="loading-state">
                <p>Loading restaurant details...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-state">
                <p>Error: {error}</p>
            </div>
        )
    }

    if (!restaurant) {
        return (
            <div className="empty-state">
                <p>No restaurant data available.</p>
            </div>
        )
    }

    return (
        <section>
            <div className="container">
                
                {/* Hero Image */}
                {restaurant.imageUrl && (
                    <div className="restaurant-hero">
                        <Image
                            src={restaurant.imageUrl}
                            alt={restaurant.name}
                            fill
                            className="restaurant-hero-image"
                            priority
                        />
                        <div className="restaurant-hero-overlay" />
                    </div>
                )}

                {/* Restaurant Header */}
                <div className="restaurant-header">
                    <h1 className="restaurant-title">{restaurant.name}</h1>
                    
                    <div className="restaurant-meta">
                        <div className="restaurant-rating">
                            <LuStar />
                            <span>{restaurant.rating.toFixed(1)}</span>
                        </div>
                        
                        <div className="restaurant-location">
                            <LuMapPin />
                            <span>{restaurant.address}, {restaurant.city}</span>
                        </div>
                    </div>

                    <div className="restaurant-categories">
                        <span className="category-badge">
                            {formatCuisineType(restaurant.cuisineType)}
                        </span>
                    </div>
                </div>

                {/* Description */}
                {restaurant.description && (
                    <div className="restaurant-description">
                        <h2>Descrição</h2>
                        <p>{restaurant.description}</p>
                    </div>
                )}

                {/* Info Cards */}
                <div className="restaurant-info-grid">
                    <div className="info-card">
                        <h3><LuClock style={{ display: 'inline', marginRight: '0.5rem' }} /> Horários</h3>
                        <p>{formatHours(restaurant.openHour, restaurant.closeHour)}</p>
                        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>{restaurant.openDays}</p>
                    </div>
                    
                    <div className="info-card">
                        <h3><LuPhone style={{ display: 'inline', marginRight: '0.5rem' }} /> Contactos</h3>
                        <p>{restaurant.phoneNumber}</p>
                    </div>
                    
                    <div className="info-card">
                        <h3><LuUtensils style={{ display: 'inline', marginRight: '0.5rem' }} /> Tipo de cozinha</h3>
                        <p>{formatCuisineType(restaurant.cuisineType)}</p>
                    </div>
                </div>

                {/* Gallery Section (if images exist) */}
                {restaurant.images && restaurant.images.length > 0 && (
                    <div className="restaurant-gallery">
                        <h2>Gallery</h2>
                        <div className="gallery-grid">
                            {restaurant.images.map((img) => (
                                <div key={img.id} className="gallery-item">
                                    <Image
                                        src={img.imageUrl}
                                        alt={`${restaurant.name} - Image ${img.id}`}
                                        fill
                                        className="gallery-image"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Menu Section (will be added later) */}
                {restaurant.menuItems && restaurant.menuItems.length > 0 && (
                    <div className="restaurant-menu">
                        <div className="menu-header">
                            <h2>Menu</h2>
                            <div className="view-toggle">
                                <button
                                    className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                    aria-label="Grid view"
                                >
                                    <LuLayoutGrid />
                                </button>
                                <button
                                    className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                    aria-label="List view"
                                >
                                    <LuLayoutList />
                                </button>
                            </div>
                        </div>

                        <div className={viewMode === 'grid' ? 'menu-grid' : 'menu-list'}>
                            {restaurant.menuItems.map((item) => (
                                <div key={item.id} className="menu-item">
                                    <div className="menu-item-content">
                                        <div className="menu-item-header">
                                            <h3 className="menu-item-name">{item.name}</h3>
                                            <span className="menu-item-price">
                                                ${item.price.toFixed(2)}
                                            </span>
                                        </div>
                                        
                                        {item.description && (
                                            <p className="menu-item-description">{item.description}</p>
                                        )}
                                        
                                        <div className="menu-item-footer">
                                            <div className="menu-item-tags">
                                                <span className="menu-item-tag">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}