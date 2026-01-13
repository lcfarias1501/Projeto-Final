"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LuLayoutGrid, LuLayoutList, LuStar, LuMapPin } from 'react-icons/lu'
import { RestaurantCategories } from "@/constants/RestaurantCategories"
import '@/styles/SearchByCategoryPage/SearchByCategoryPage.css'
import { Restaurant } from "@/types/Restaurant"
import Image from "next/image"
import Link from "next/link"

export default function CategoryPage() {

    // PARAMS FROM URL
    const params = useParams()
    const slug = params.slug as string

    // ROUTER
    const router = useRouter()

    // STATES
    const [listType, setListType] = useState<'grid' | 'list'>('grid')
    const [categoryForSearch, setCategoryForSearch] = useState(slug)
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [loading, setLoading] = useState(true)

    // constants
    const translatedCategory = RestaurantCategories.find(category => category.slug === categoryForSearch)?.label || slug

    // USE EFFECTS
    useEffect(() => {
        // set category for search based on slug from URL
        setCategoryForSearch(slug)
    }, [slug])

    useEffect(() => {
        // fetch data based on categoryForSearch
        async function fetchRestaurantsByCategory() {
            setLoading(true)
            try {
                const response = await fetch(`/api/restaurants/getRestaurantsByCategory?slug=${categoryForSearch.toUpperCase()}`)
                const data = await response.json()
                setRestaurants(data)
            } catch (error) {
                console.error("Error fetching restaurants by category:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchRestaurantsByCategory()
    }, [categoryForSearch])

    function handleCategoryChange(newCategory: string) {
        setCategoryForSearch(newCategory)
        router.push(`/category/${newCategory}`)
    }

    function handleRestaurantClick(restaurantId: number) {
        router.push(`/restaurant/${restaurantId}`)
    }

    return (
        <section className="container Restaurant_List_Page">

            {/* CATEGORIES LIST */}
            <div className="Categories_List">
                {RestaurantCategories.map((category) => (
                    <button
                        key={category.slug}
                        className={`Category_Item ${category.slug === categoryForSearch ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(category.slug)}
                    >
                        <span className="Category_Name">{category.icon} {category.label}</span>
                    </button>
                ))}
            </div>

            {/* LIST HEADER */}
            <div className="ListHeader">
                <h1>Resultados para comida {translatedCategory}</h1>

                <div className="ListHeader_Options">
                    <button 
                        type="button" 
                        className={listType === 'grid' ? 'active' : ''} 
                        onClick={() => setListType('grid')}
                        aria-label="Visualização em grade"
                    >
                        <LuLayoutGrid size={20}/>
                    </button>
                    <button 
                        type="button" 
                        className={listType === 'list' ? 'active' : ''} 
                        onClick={() => setListType('list')}
                        aria-label="Visualização em lista"
                    >
                        <LuLayoutList size={20}/>
                    </button>
                </div>
            </div>

            {/* RESTAURANT LIST */}
            {loading ? (
                <div className={`Restaurant_List ${listType}`}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="Restaurant_Card loading">
                            <div className="Restaurant_Image" />
                            <div className="Restaurant_Info">
                                <div style={{ height: '24px', background: 'hsl(var(--muted))', borderRadius: '4px', width: '70%' }} />
                                <div style={{ height: '16px', background: 'hsl(var(--muted))', borderRadius: '4px', width: '100%' }} />
                                <div style={{ height: '16px', background: 'hsl(var(--muted))', borderRadius: '4px', width: '90%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : restaurants.length === 0 ? (
                <div className="Restaurant_List_Empty">
                    <h3>Nenhum restaurante encontrado</h3>
                    <p>Não há restaurantes disponíveis nesta categoria no momento.</p>
                </div>
            ) : (
                <div className={`Restaurant_List ${listType}`}>
                    {restaurants.map((restaurant) => (
                        <Link
                            key={restaurant.id} 
                            href={`/restaurants/${restaurant.id}`}
                            className="Restaurant_Card"
                            onClick={() => handleRestaurantClick(restaurant.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleRestaurantClick(restaurant.id)
                                }
                            }}
                        >
                            <Image 
                                src={restaurant.imageUrl || '/placeholder-restaurant.jpg'} 
                                alt={restaurant.name} 
                                className="Restaurant_Image"
                                width={400}
                                height={200}
                            />
                            <div className="Restaurant_Info">
                                <h2 className="Restaurant_Name">{restaurant.name}</h2>
                                <p className="Restaurant_Description">{restaurant.description}</p>
                                <p className="Restaurant_Category">{translatedCategory}</p>
                                
                                {/* META INFO (opcional - adicione se quiser mostrar rating e cidade) */}
                                <div className="Restaurant_Meta">
                                    <span className="Restaurant_Rating">
                                        <LuStar size={16} color="gold"/>
                                        {restaurant.rating.toFixed(1)}
                                    </span>
                                    <span className="Restaurant_City">
                                        <LuMapPin size={16} />
                                        {restaurant.city}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

        </section>
    )
}


