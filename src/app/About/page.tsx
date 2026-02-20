import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { trendingRestaurants } from '@/constants/mockRestaurants'
import '@/styles/About/About.css'

export default function About() {
  // Calcular estatísticas dinamicamente
  const restaurantCount = trendingRestaurants.length

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="absolute inset-0">
          <Image
            src="/images/others/hero-section.jpeg"
            alt="Sobre Sabor Local"
            fill
            priority
            className="about-hero-image"
            sizes="100vw"
            quality={90}
          />
        </div>
        <div className="about-hero-overlay">
          <div className="container mx-auto px-4">
            <div className="about-hero-content">
              <h1 className="about-hero-title">Sobre o <span className="highlight">Sabor Local</span></h1>
              <p className="about-hero-description">
                Descubra uma nova forma de explorar a gastronomia da sua região. Conectamos você aos melhores restaurantes locais com informações reais e experiências autênticas.
              </p>
              <button className="about-cta-button">
                Explorar Restaurantes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container mx-auto px-4">
          <div className="about-stats-grid">
            <div className="about-stat-item">
              <div className="about-stat-number">{restaurantCount}</div>
              <p className="about-stat-label">Restaurantes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container mx-auto px-4">
          <div className="about-mission-grid">
            <div className="about-mission-content">
              <h2>Nossa <span className="highlight">Missão</span></h2>
              <p>
                No Sabor Local, acreditamos que a comida é mais do que nutrição - é uma ponte para culturas, comunidades e memórias.
                Nossa missão é democratizar o acesso à gastronomia local, permitindo que você explore, descubra e se conecte com
                restaurantes incríveis na sua região de forma simples e intuitiva.
              </p>
              <p>
                Combinamos tecnologia avançada com paixão pela culinária para criar uma plataforma que valoriza tanto os
                estabelecimentos quanto os apreciadores de boa comida.
              </p>
            </div>
            <div className="about-mission-visual">
              <div className="about-mission-logo">
                <Image
                  src="/images/logos/Logo_Cyan.png"
                  alt="Sabor Local Logo"
                  width={200}
                  height={200}
                  className="about-logo-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="about-benefits">
        <div className="container mx-auto px-4">
          <div className="about-benefits-header">
            <h2>Por que Escolher o <span className="highlight">Sabor Local</span>?</h2>
            <p>Descubra as vantagens que fazem da nossa plataforma a escolha perfeita para sua jornada gastronômica</p>
          </div>
          <div className="about-benefits-grid">
            <div className="about-benefit-card">
              <div className="about-benefit-icon-container">
                <div className="about-benefit-icon">🍽️</div>
              </div>
              <h3>Descoberta Local</h3>
              <p>Explore restaurantes na sua região com filtros por culinária, preço e avaliações reais.</p>
            </div>
            <div className="about-benefit-card">
              <div className="about-benefit-icon-container">
                <div className="about-benefit-icon">⭐</div>
              </div>
              <h3>Avaliações Autênticas</h3>
              <p>Confira opiniões reais de outros usuários para tomar decisões informadas.</p>
            </div>
            <div className="about-benefit-card">
              <div className="about-benefit-icon-container">
                <div className="about-benefit-icon">📍</div>
              </div>
              <h3>Localização Precisa</h3>
              <p>Encontre estabelecimentos próximos com mapas integrados e direções.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container mx-auto px-4">
          <div className="about-values-header">
            <h2>Nossos <span className="highlight">Valores</span></h2>
            <p>Os princípios que guiam cada decisão e inovação na Sabor Local</p>
          </div>
          <div className="about-values-grid">
            <div className="about-value-item">
              <h3>Autenticidade</h3>
              <p>Valorizamos experiências reais e conexões genuínas com a gastronomia local.</p>
            </div>
            <div className="about-value-item">
              <h3>Inovação</h3>
              <p>Usamos tecnologia para simplificar sua jornada gastronômica.</p>
            </div>
            <div className="about-value-item">
              <h3>Comunidade</h3>
              <p>Construímos uma comunidade de amantes da boa comida e apoiadores de negócios locais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container mx-auto px-4">
          <div className="about-cta-content">
            <h2>Pronto para Explorar?</h2>
            <p>Junte-se aos amantes da boa comida que já descobriram seus restaurantes favoritos conosco.</p>
            <Link href="/">
              <button className="about-cta-button">
                Começar Agora
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
