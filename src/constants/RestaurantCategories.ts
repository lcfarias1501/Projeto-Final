enum CuisineType {
    ITALIAN = "Italiano",
    BRAZILIAN = "Brasileira",
    PORTUGUESE = "Portuguesa",
    CHINESE = "Chinesa",
    INDIAN = "Indiana",
    MEXICAN = "Mexicana",
    AMERICAN = "Americana",
    JAPANESE = "Japonesa",
    FRENCH = "Francesa",
    THAI = "Tailandesa",
    MEDITERRANEAN = "Mediterrânea",
    OTHER = "OTHER",
}

enum EnglishCuisineType {
    ITALIAN = "Italian",
    BRAZILIAN = "Brazilian",
    PORTUGUESE = "Portuguese",
    CHINESE = "Chinese",
    INDIAN = "Indian",
    MEXICAN = "Mexican",
    AMERICAN = "American",
    JAPANESE = "Japanese",
    FRENCH = "French",
    THAI = "Thai",
    MEDITERRANEAN = "Mediterranean",
    OTHER = "OTHER",
}

interface RestaurantCategory {
  label: string
  value: CuisineType
  icon: string
  slug: string
}


export const RestaurantCategories: RestaurantCategory[] = [
  { label: "Italiana", value: CuisineType.ITALIAN, icon: "🍕", slug: "italian" },
  { label: "Japonesa", value: CuisineType.JAPANESE, icon: "🍣", slug: "japanese" },
  { label: "Francesa", value: CuisineType.FRENCH, icon: "🥖", slug: "french" },
  { label: "Americana", value: CuisineType.AMERICAN, icon: "🍔", slug: "american" },
  { label: "Chinesa", value: CuisineType.CHINESE, icon: "🥡", slug: "chinese" },
  { label: "Mexicana", value: CuisineType.MEXICAN, icon: "🌮", slug: "mexican" },
  { label: "Tailandesa", value: CuisineType.THAI, icon: "🍛", slug: "thai" },
  { label: "Brasileira", value: CuisineType.BRAZILIAN, icon: "🥩", slug: "brazilian" },
  { label: "Mediterrânea", value: CuisineType.MEDITERRANEAN, icon: "🐟", slug: "mediterranean" },
  { label: "Portuguesa", value: CuisineType.PORTUGUESE, icon: "🦞", slug: "portuguese" },
]
