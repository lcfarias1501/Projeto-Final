"use client"

import { useEffect, useState } from "react"
import TrendingRestaurantsCard from "./TrendingRestaurantsCard"

export default function TrendingRestaurants() {

    const [restaurants, setRestaurants] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRestaurants() {
            try {
                const res = await fetch("/api/restaurants/getTrendingRestaurants")
                const data = await res.json()
                setRestaurants(data)
            } catch (error) {
                console.error("Erro ao buscar restaurantes", error)
            } finally {
                setLoading(false)
            }
        }

        fetchRestaurants()
    }, [])


    return (
        <section className="container">
            <div className="section_header">
                <div>
                    <h2 className='Section_Title'>Melhores Restaurantes Perto de Si</h2>
                    <p className='Section_Subtitle'>Descubra os favoritos da sua região</p>
                </div>
                {restaurants.length > 0  && (<button className='view_all_button'>Ver Todos</button>)}
            </div>

            {loading ?
                <p className="text-center">Carregando restaurantes...</p>

                : restaurants.length === 0 ?
                (
                    <p className="no_content_message">Nenhum restaurante em alta disponível no momento...</p>
                ) 
                :
                (
                    <div className="TrendingRestaurants_List">
                        {restaurants.map((restaurant) => (
                            <TrendingRestaurantsCard key={restaurant.id} {...restaurant} />
                        ))}
                    </div>
                )
            }

        </section>
    )
}
