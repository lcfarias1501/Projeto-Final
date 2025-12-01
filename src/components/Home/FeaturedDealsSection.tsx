import React from 'react'
import { LuClock } from 'react-icons/lu'

const deals = [
  {
    id: 1,
    title: '2 Pizzas por 20€',
    description: 'Compre 2 pizzas grandes e economize 30%',
    discount: '-30%',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    validUntil: 'Válido até 15 Dez',
  },
  {
    id: 2,
    title: 'Menu Executivo 12€',
    description: 'Entrada + Prato + Bebida de segunda a sexta',
    discount: '-40%',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    validUntil: 'Válido até 20 Dez',
  },
  {
    id: 3,
    title: 'Rodízio de Sushi 18€',
    description: 'Sushi ilimitado todos os dias após 18h',
    discount: '-25%',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    validUntil: 'Válido até 31 Dez',
  },
]

export default function FeaturedDealsSection() {
  return (
    <section className="container">
      <div className="section_header">
        <div>
          <h2 className='Section_Title'>Ofertas em Destaque</h2>
          <p className='Section_Subtitle'>Aproveite as melhores promoções</p>
        </div>
        <button className='view_all_button'>Ver Todas</button>
      </div>

      <div className="deals_grid">
        {deals.map((deal) => (
          <div key={deal.id} className="deal_card">
            <img src={deal.imageUrl} alt={deal.title} className="deal_image" />
            <div className="deal_badge">{deal.discount}</div>
            <div className="deal_content">
              <h3 className="deal_title">{deal.title}</h3>
              <p className="deal_description">{deal.description}</p>
              <p className="deal_validity">
                <LuClock size={14} />
                {deal.validUntil}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}