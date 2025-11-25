import React from 'react'
import { trendingRestaurants } from '@/types/TrendingRestaurants'
import { LuStar, LuMapPin } from 'react-icons/lu'


export default function TrendingRestaurantsCard(props: trendingRestaurants) {
  return (
    <div className='TrendingCard' key={props.id}>
      
      <img src={props.imageUrl} alt={props.name} className='TrendingCard__image' />

      <div className='TrendingCard__info'>
        <h3 className='TrendingCard__name'>{props.name}</h3>
        
        <div className='TrendingCard__details'>
          <p className='TrendingCard__rating'>
            {props.rating}
            <LuStar size={16} color='gold' />
          </p>
          
          <p className='TrendingCard__location'>
            <LuMapPin size={16} />
            {props.location}
          </p>
        </div>
      </div>

    </div>
  )
}