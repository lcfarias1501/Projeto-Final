import React from 'react'
import { LuFlame } from 'react-icons/lu'

const dishes = [
  {
    id: 1,
    name: 'Margherita Pizza',
    restaurant: 'Bella Napoli',
    price: '€12.50',
    orders: 234,
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Salmon Sushi',
    restaurant: 'Tokyo Dreams',
    price: '€18.00',
    orders: 189,
    imageUrl: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    name: 'Wagyu Burger',
    restaurant: 'Burger King',
    price: '€15.90',
    orders: 312,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
  },
  {
    id: 4,
    name: 'Pad Thai',
    restaurant: 'Thai Spice',
    price: '€11.50',
    orders: 156,
    imageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=200&h=200&fit=crop',
  },
  {
    id: 5,
    name: 'Caesar Salad',
    restaurant: 'Green Bowl',
    price: '€9.90',
    orders: 142,
    imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop',
  },
  {
    id: 6,
    name: 'Tiramisu',
    restaurant: 'Dolce Vita',
    price: '€6.50',
    orders: 267,
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop',
  },
]

export default function PopularDishesSection() {
  return (
    <section className="container">
      <div className="section_header">
        <div>
          <h2 className='Section_Title'>Pratos Populares</h2>
          <p className='Section_Subtitle'>Os favoritos dos nossos clientes</p>
        </div>
        <button className='view_all_button'>Ver Todos</button>
      </div>

      <div className="dishes_scroll">
        {dishes.map((dish) => (
          <div key={dish.id} className="dish_card">
            <img src={dish.imageUrl} alt={dish.name} className="dish_image" />
            <div className="dish_info">
              <h3 className="dish_name">{dish.name}</h3>
              <p className="dish_restaurant">{dish.restaurant}</p>
              <div className="dish_footer">
                <p className="dish_price">{dish.price}</p>
                <p className="dish_orders">
                  <LuFlame size={14} />
                  {dish.orders}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}