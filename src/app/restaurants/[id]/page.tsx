"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Restaurant, CuisineType } from "@/types/Restaurant"
import RestaurantDetailsCard from "@/components/Restaurants/RestaurantDetailsCard"

export default function RestaurantDetailsPage() {
    const params = useParams()
    const restaurantId = params.id as string

    const [loading, setLoading] = useState(false)
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
    const [error, setError] = useState<string | null>(null)

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

    if (loading) {
        return (
            <div className="pre-rendering-container container">
                <p>Loading restaurant details...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="pre-rendering-container container">
                <p>Error: {error}</p>
            </div>
        )
    }

    if (!restaurant) {
        return (
            <div className="pre-rendering-container container">
                <p>No restaurant data available.</p>
            </div>
        )
    }

    return (
        <section>
            <div className="container">
                <RestaurantDetailsCard restaurant={restaurant} />
            </div>
            
        </section>
    )
}