import Link from 'next/link'
import React from 'react'

const locations = [
  {
    id: 1,
    name: 'Lisboa',
    count: 128,
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Porto',
    count: 95,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Algarve',
    count: 67,
    imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Coimbra',
    count: 112,
    imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop',
  },
]

export default function LocationsSection() {
  return (
    <section className="container">
      <div className="section_header">
        <div>
          <h2 className='Section_Title'>Explorar por Localização</h2>
          <p className='Section_Subtitle'>Descubra restaurantes perto de você</p>
        </div>
      </div>

      <div className="locations_grid">
        {locations.map((location) => (
          <Link href={`/search?city=${location.name}`} key={location.id} className="location_card">
            <img 
              src={location.imageUrl} 
              alt={location.name} 
              className="location_image" 
            />
            <div className="location_overlay">
              <h3 className="location_name">{location.name}</h3>
              <p className="location_count">{location.count} restaurantes</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}