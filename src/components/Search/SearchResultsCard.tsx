import { Restaurant } from '@/types/Restaurant'
import Link from 'next/link'
import React from 'react'
import '@/styles/SearchPage/SearchResultsCard.css'

export default function SearchResultsCard(restaurant: Restaurant) {
  // Helper to format cuisine type
  const formatCuisineType = (type: string) => {
    return type.charAt(0) + type.slice(1).toLowerCase()
  }

  // Helper to get rating stars
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="SearchResultsCard_Rating">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="SearchResultsCard_Star">★</span>
        ))}
        {hasHalfStar && <span className="SearchResultsCard_Star">½</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="SearchResultsCard_Star--empty">★</span>
        ))}
        <span className="SearchResultsCard_RatingNumber">
          {rating.toFixed(1)}
        </span>
      </div>
    )
  }

  return (
    <Link 
      href={`/restaurants/${restaurant.id}`}
      className="SearchResultsCard"
    >
      <div className="SearchResultsCard_Container">
        
        {/* Image Section */}
        <div className="SearchResultsCard_Image">
          {restaurant.imageUrl ? (
            <img 
              src={restaurant.imageUrl} 
              alt={restaurant.name}
            />
          ) : (
            <div className="SearchResultsCard_ImagePlaceholder">
              <span>🍽️</span>
            </div>
          )}
          
          {/* Cuisine Badge */}
          <div className="SearchResultsCard_Badge">
            {formatCuisineType(restaurant.cuisineType)}
          </div>
        </div>

        {/* Content Section */}
        <div className="SearchResultsCard_Content">
          
          {/* Restaurant Name */}
          <h3 className="SearchResultsCard_Name">
            {restaurant.name}
          </h3>

          {/* Rating */}
          {renderStars(restaurant.rating)}

          {/* Description */}
          {restaurant.description && (
            <p className="SearchResultsCard_Description">
              {restaurant.description}
            </p>
          )}

          {/* Location & Phone */}
          <div className="SearchResultsCard_InfoSection">
            <div className="SearchResultsCard_InfoItem">
              <span>📍</span>
              <span>{restaurant.address}, {restaurant.city}</span>
            </div>
            
            {restaurant.phoneNumber && (
              <div className="SearchResultsCard_InfoItem">
                <span>📞</span>
                <span>{restaurant.phoneNumber}</span>
              </div>
            )}
          </div>

          {/* Hours */}
          {restaurant.openHour && restaurant.closeHour && (
            <div className="SearchResultsCard_Hours">
              <div className="SearchResultsCard_HoursContent">
                <span>🕒</span>
                <span className="SearchResultsCard_HoursTime">
                  {restaurant.openHour} - {restaurant.closeHour}
                </span>
                {restaurant.openDays && (
                  <span className="SearchResultsCard_HoursDays">
                    {restaurant.openDays}
                  </span>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </Link>
  )
}