
import { trendingRestaurants as TR } from "@/types/TrendingRestaurants"

export const trendingRestaurants: TR[] = [
  {
    id: 1,
    name: "Urban Grill",
    imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/28/70/94/caption.jpg?w=900&h=-1&s=1",
    rating: 4.6,
    location: "Lisbon"
  },
  {
    id: 2,
    name: "Sea Breeze Sushi",
    imageUrl: "https://cafeviagem.com/wp-content/uploads/2022/08/restaurantes-em-Lisboa-Rocco-7.jpg",
    rating: 4.3,
    location: "Porto"
  },
  {
    id: 3,
    name: "La Piazza",
    imageUrl: "https://media.timeout.com/images/106048134/750/562/image.jpg",
    rating: 4.8,
    location: "Coimbra"
  },
  {
    id: 4,
    name: "Taco District",
    imageUrl: "https://media.timeout.com/images/105626436/750/562/image.jpg",
    rating: 4.2,
    location: "Faro"
  },
  {
    id: 5,
    name: "Prime Steakhouse",
    imageUrl: "https://www.sanahotels.com/media/bdhp2jqm/epicsanamarques-allorarestaurant2.jpg",
    rating: 4.7,
    location: "Braga"
  },
  {
    id: 6,
    name: "Green Bowl",
    imageUrl: "https://www.lisbonlux.com/images/restaurantes/belcanto.jpg",
    rating: 4.4,
    location: "Aveiro"
  },
  {
    id: 7,
    name: "Spice Route",
    imageUrl: "https://offloadmedia.feverup.com/lisboasecreta.co/wp-content/uploads/2023/03/08083158/restaurante-erva-%40vleandro-_13-scaled.jpeg",
    rating: 4.5,
    location: "Guimarães"
  },
  {
    id: 8,
    name: "Nordic Kitchen",
    imageUrl: "https://www.lisbonlux.com/images/restaurantes/bahr.jpg",
    rating: 4.3,
    location: "Viseu"
  },
  {
    id: 9,
    name: "Ocean Grill House",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Abu_Nawas_Beach_restaurant_-_Flickr_-_Al_Jazeera_English_%281%29.jpg/1200px-Abu_Nawas_Beach_restaurant_-_Flickr_-_Al_Jazeera_English_%281%29.jpg",
    rating: 4.6,
    location: "Setúbal"
  },
  {
    id: 10,
    name: "Bistro Central",
    imageUrl: "https://www.sanahotels.com/media/qxlhyxdy/epic-sana-marques-hotel-lisboa-allora-restaurant-5.jpg",
    rating: 4.1,
    location: "Leiria"
  }
]

export const allRestaurants: TR[] = [...trendingRestaurants, ...trendingRestaurants, ...trendingRestaurants]
