import { useTheme } from "next-themes"
import { LuStar, LuMapPin } from "react-icons/lu"

export default function TrendingRestaurantsCard(props: any) {

  const { theme } = useTheme()

  return (
    <div className="TrendingCard">
      <img
        src={props.imageUrl ? props.imageUrl : theme === "dark" ? "/images/others/Default_Restaurant_White.png" : "/images/others/Default_Restaurant_Black.png"}
        alt={props.name}
        className="TrendingCard__image"
        style={{
          objectFit: props.imageUrl ? "cover" : "contain"
        }}
      />

      <div className="TrendingCard__info">
        <h3 className="TrendingCard__name">{props.name}</h3>

        <div className="TrendingCard__details">
          <p className="TrendingCard__rating">
            {props.rating}
            <LuStar size={16} color="gold" />
          </p>

          <p className="TrendingCard__location">
            <LuMapPin size={16} />
            {props.city}
          </p>
        </div>
      </div>
    </div>
  )
}
