import React from 'react'

const categories = [
  { id: 1, name: 'Pizza', icon: '🍕', count: 245 },
  { id: 2, name: 'Sushi', icon: '🍣', count: 128 },
  { id: 3, name: 'Burger', icon: '🍔', count: 312 },
  { id: 4, name: 'Italiana', icon: '🍝', count: 189 },
  { id: 5, name: 'Chinesa', icon: '🥡', count: 156 },
  { id: 6, name: 'Mexicana', icon: '🌮', count: 98 },
  { id: 7, name: 'Sobremesas', icon: '🍰', count: 267 },
  { id: 8, name: 'Vegetariana', icon: '🥗', count: 142 },
]

export default function CategoriesSection() {
  return (
    <section className="container">
      <div className="section_header">
        <div>
          <h2 className='Section_Title'>Explorar por Categoria</h2>
          <p className='Section_Subtitle'>Encontre o que você está procurando</p>
        </div>
      </div>

      <div className="categories_grid">
        {categories.map((category) => (
          <div key={category.id} className="category_card">
            <div className="category_icon">{category.icon}</div>
            <h3 className="category_name">{category.name}</h3>
            <p className="category_count">{category.count} locais</p>
          </div>
        ))}
      </div>
    </section>
  )
}