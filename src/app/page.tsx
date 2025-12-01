"use client"

import HeroSection from '@/components/Home/HeroSection'
import { useState } from 'react'
import '@/styles/Home/MainContent.css'
import '@/styles/ui/TrendingCards.css'
import { trendingRestaurants as TR, allRestaurants } from '@/constants/mockRestaurants'
import TrendingRestaurantsCard from '@/components/Home/TrendingRestaurantsCard'
import AppDownloadSection from '@/components/Home/AppDownloadSection'
import CategoriesSection from '@/components/Home/CategoriesSection'
import FeaturedDealsSection from '@/components/Home/FeaturedDealsSection'
import LocationsSection from '@/components/Home/LocationsSection'
import PopularDishesSection from '@/components/Home/PopularDishesSection'
import TopRatedSection from '@/components/Home/TopRatedSection'

export default function Home() {

  const [filters, setFilters] = useState<{ [key: string]: string[] }>({})
  const [trendingRestaurants, setTrendingRestaurants] = useState<any[]>(TR)

  return (
    <div>

      <HeroSection />

      <div className="HomeContent">

        {/* TRENDING RESTAURANTS */}
        <section className="container">
          <div className="section_header">
            <div>
              <h2 className='Section_Title'>Melhores Restaurantes Perto de Si</h2>
              <p className='Section_Subtitle'>Descubra os favoritos da sua região</p>
            </div>
            <button className='view_all_button'>Ver Todos</button>
          </div>

          {trendingRestaurants.length > 0 ? (
            <div className="TrendingRestaurants_List">
              {trendingRestaurants.map((restaurant) => (
                <TrendingRestaurantsCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          ) : (
            <p className="no_content_message">Nenhum restaurante em alta disponível no momento...</p>
          )}
        </section>

        {/* CATEGORIES */}
        <CategoriesSection />

        {/* FEATURED DEALS */}
        <FeaturedDealsSection />

        {/* POPULAR DISHES */}
        <PopularDishesSection />

        {/* TOP RATED */}
        <TopRatedSection />

        {/* EXPLORE BY LOCATION */}
        <LocationsSection />

        {/* APP DOWNLOAD CTA */}
        <AppDownloadSection />

      </div>

    </div>
  )
}