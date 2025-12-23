import React from 'react'
import Link from "next/link"
import { RestaurantCategories } from '@/constants/RestaurantCategories'

export default function CategoriesSection() {
  return (
    <section className="container">
      <div className="section_header">
        <div>
          <h2 className='Section_Title'>Explorar por Categoria</h2>
          <p className='Section_Subtitle'>Encontre o que você está procurando</p>
        </div>
      </div>

      <div className="categories_grid">
        {RestaurantCategories.map((category) => (
          <Link key={category.label} className="category_card" href={`/category/${category.slug}`}>
            <div className="category_icon">{category.icon}</div>
            <h3 className="category_name">{category.label}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}