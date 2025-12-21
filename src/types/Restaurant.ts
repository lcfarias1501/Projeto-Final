export enum CuisineType {
  ITALIAN = "ITALIAN",
  BRAZILIAN = "BRAZILIAN",
  PORTUGUESE = "PORTUGUESE",
  CHINESE = "CHINESE",
  INDIAN = "INDIAN",
  MEXICAN = "MEXICAN",
  AMERICAN = "AMERICAN",
  JAPANESE = "JAPANESE",
  FRENCH = "FRENCH",
  THAI = "THAI",
  MEDITERRANEAN = "MEDITERRANEAN",
  OTHER = "OTHER",
}

export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  restaurantId: number
}

export interface RestaurantImages {
  id: number
  imageUrl: string
  restaurantId: number
}

export interface Restaurant {
  id: number
  name: string
  description: string
  address: string
  rating: number
  city: string
  phoneNumber: string
  cuisineType: CuisineType
  imageUrl: string

  openHour: string
  closeHour: string
  openDays: string

  menuItems?: MenuItem[]
  images?: RestaurantImages[]

  createdAt?: Date
  updatedAt?: Date
}
