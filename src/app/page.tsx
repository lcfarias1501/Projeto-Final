"use client"

import HeroSection from '@/components/Home/HeroSection'
import { useState } from 'react'
import '@/styles/Home/MainContent.css'
import '@/styles/ui/TrendingCards.css'
import { trendingRestaurants as TR } from '@/constants/trendingRestaurants'
import TrendingRestaurantsCard from '@/components/Home/TrendingRestaurantsCard'

export default function Home() {

  const [filters, setFilters] = useState<{ [key: string]: string[] }>({})
  const [trendingRestaurants, setTrendingRestaurants] = useState<any[]>(TR)

  return (
    <div>

      <HeroSection />

      <div className="HomeContent">

        <section className="container">
          <h2 className='Section_Title '>Melhores Restaurantes Perto de Si</h2>

          {trendingRestaurants.length > 0 ? (
            <div className="TrendingRestaurants_List">
              {trendingRestaurants.map((restaurant) => (
                <TrendingRestaurantsCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          ) : (
            <p className="container">Nenhum restaurante em alta disponível no momento...</p>
          )}
        </section>


      </div>

    </div>
  )
}
