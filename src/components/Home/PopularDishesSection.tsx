import React, { useEffect, useState } from 'react'
import { LuDollarSign, LuEuro, LuFlame } from 'react-icons/lu'


export default function PopularDishesSection() {

  const [topDishes, setTopDishes] = useState<any>([])

  useEffect(() => {
  
      if (topDishes.length > 0) return
  
      async function fetchTopRated() {
        try {
          const response = await fetch(`/api/restaurants/getTopDishesRestaurants?take=6`);
          const data = await response.json();
          setTopDishes(data);
        } catch (error) {
          console.error('Error fetching top rated restaurants:', error);
        }
      }
  
      fetchTopRated();
    }, []);

  return (
    <section className="container">
      <div className="section_header">
        <div>
          <h2 className='Section_Title'>Pratos Populares</h2>
          <p className='Section_Subtitle'>Os favoritos dos nossos clientes</p>
        </div>

      </div>

      <div className="dishes_scroll">

        {topDishes.map((dish: any) => (
          <a key={dish.id} className="dish_card" href={`/restaurants/${dish.restaurantId}`}>
            <img src={dish.imageUrl} alt={dish.name} className="dish_image" />
            <div className="dish_info">
              <h3 className="dish_name">{dish.name}</h3>
              <div className="dish_footer">
                <p className="dish_orders">
                  <LuEuro size={14} />
                  {dish.price}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}