"use client"

import HeroSection from '@/components/Home/HeroSection'
import { useState } from 'react'
import '@/styles/Home/MainContent.css'
import '@/styles/ui/TrendingCards.css'
import CategoriesSection from '@/components/Home/CategoriesSection'
import FeaturedDealsSection from '@/components/Home/FeaturedDealsSection'
import LocationsSection from '@/components/Home/LocationsSection'
import PopularDishesSection from '@/components/Home/PopularDishesSection'
import TopRatedSection from '@/components/Home/TopRatedSection'
import TrendingRestaurants from '@/components/Home/TrendingRestaurants/TrendingRestaurants'

export default function Home() {

  const [filters, setFilters] = useState<{ [key: string]: string[] }>({})

  return (
    <div>

      <HeroSection />

      <div className="HomeContent">

        {/* TRENDING RESTAURANTS */}
        <TrendingRestaurants />

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

      </div>

    </div>
  )
}