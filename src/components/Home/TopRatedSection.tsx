import React from 'react'
import { LuStar, LuClock } from 'react-icons/lu'

const topRated = [
  {
    id: 1,
    name: 'Le Petit Bistro',
    cuisine: 'Francesa',
    rating: 4.9,
    deliveryTime: '25-30 min',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Sushi Master',
    cuisine: 'Japonesa',
    rating: 4.8,
    deliveryTime: '30-40 min',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Casa da Pizza',
    cuisine: 'Italiana',
    rating: 4.9,
    deliveryTime: '20-25 min',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    name: 'Burger Heaven',
    cuisine: 'Americana',
    rating: 4.7,
    deliveryTime: '15-20 min',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop',
  },
  {
    id: 5,
    name: 'Spice Garden',
    cuisine: 'Indiana',
    rating: 4.8,
    deliveryTime: '35-45 min',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100&h=100&fit=crop',
  },
  {
    id: 6,
    name: 'Taco Fiesta',
    cuisine: 'Mexicana',
    rating: 4.6,
    deliveryTime: '20-30 min',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop',
  },
]

export default function TopRatedSection() {
  return (
    <section className="container">
      <div className="section_header">
        <div>
          <h2 className='Section_Title'>Restaurantes Top Rated</h2>
          <p className='Section_Subtitle'>Os melhores avaliados pelos clientes</p>
        </div>
        <button className='view_all_button'>Ver Todos</button>
      </div>

      <div className="top_rated_list">
        {topRated.map((restaurant) => (
          <div key={restaurant.id} className="top_rated_card">
            <img 
              src={restaurant.imageUrl} 
              alt={restaurant.name} 
              className="top_rated_image" 
            />
            <div className="top_rated_info">
              <h3 className="top_rated_name">{restaurant.name}</h3>
              <p className="top_rated_cuisine">{restaurant.cuisine}</p>
              <div className="top_rated_stats">
                <div className="stat_item">
                  <LuStar size={16} color="gold" />
                  <span className="stat_value">{restaurant.rating}</span>
                </div>
                <div className="stat_item">
                  <LuClock size={16} />
                  <span className="stat_value">{restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}