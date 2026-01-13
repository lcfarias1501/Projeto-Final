"use client"

import React from 'react';
import { LuMapPin, LuMail, LuPhone, LuHeart, LuSend } from 'react-icons/lu';
import '@/styles/Footer/Footer.css';

const navigation = {
  explorar: [
    { name: 'Restaurantes em Destaque', href: '#' },
    { name: 'Cozinhas Populares', href: '#' },
    { name: 'Novidades', href: '#' },
    { name: 'Promoções', href: '#' },
  ],
  empresa: [
    { name: 'Sobre Nós', href: '#' },
    { name: 'Junte-se a Nós (Carreiras)', href: '#' },
    { name: 'Política de Privacidade', href: '#' },
    { name: 'Termos de Serviço', href: '#' },
  ],
}

/**
 * Rodapé Moderno e Temático "Sabor Local"
 * Totalmente integrado com o sistema de design (light/dark mode)
 */
export default function Footer() {
  return (
    <footer>
      <div className="container py-12">
        
        {/* Layout Principal: Grid de 3 Colunas */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Coluna 1: Informações de Contacto e Marca */}
          <div className="space-y-6">
            <h3 className="footer-brand">
              Sabor Local
            </h3>
            <p className="footer-description">
              Conectando você aos melhores sabores da cidade. Nosso paladar é o mapa.
            </p>

            {/* Informações de Contacto */}
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <LuMapPin className="footer-contact-icon" />
                <div className="text-sm text-foreground">
                  Rua Fictícia, 123, Lisboa, Portugal
                </div>
              </div>
              
              <div className="footer-contact-item">
                <LuPhone className="footer-contact-icon" />
                <div className="text-sm">
                  <a href="tel:+351210000000" className="footer-contact-link">
                    +351 210 000 000
                  </a>
                </div>
              </div>
              
              <div className="footer-contact-item">
                <LuMail className="footer-contact-icon" />
                <div className="text-sm">
                  <a href="mailto:contato@saborlocal.pt" className="footer-contact-link">
                    contato@saborlocal.pt
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Navegação (Links) */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-1">
            
            {/* Secção Explorar */}
            <div className="footer-nav-section">
              <h4 className="footer-nav-title">
                Explorar Sabores
              </h4>
              <ul className="footer-nav-list">
                {navigation.explorar.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="footer-nav-link">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Secção Empresa */}
            <div className="footer-nav-section">
              <h4 className="footer-nav-title">
                Sabor & Companhia
              </h4>
              <ul className="footer-nav-list">
                {navigation.empresa.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="footer-nav-link">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coluna 3: Newsletter */}
          <div className="footer-newsletter">
            
            {/* Efeito de brilho decorativo */}
            <div className="footer-newsletter-glow" />
            
            <div className="footer-newsletter-content">
              <h4 className="footer-newsletter-title">
                Novidades na sua caixa de entrada
              </h4>
              <p className="footer-newsletter-description">
                Receba as melhores ofertas e os novos restaurantes que acabaram de abrir.
              </p>
              
              {/* Formulário de Subscrição */}
              <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Seu e-mail aqui"
                  className="footer-newsletter-input"
                  aria-label="Email para subscrição da newsletter"
                  required
                />
                <button
                  type="submit"
                  className="footer-newsletter-button"
                  aria-label="Enviar subscrição"
                >
                  <LuSend />
                </button>
              </form>
            </div>
            
            {/* Nota de privacidade */}
            <div className="footer-newsletter-note">
              <p>
                Prometemos não encher a sua caixa de entrada com spam, apenas sabor!
              </p>
            </div>
          </div>
        </div>

        {/* Secção de Direitos Autorais */}
        <div className="footer-copyright">
          <p className="footer-copyright-text">
            Feito com 
            <LuHeart className="footer-heart-icon" /> 
            para o Projeto Final de Faculdade.
          </p>
          <p className="footer-copyright-year">
            &copy; {new Date().getFullYear()} Sabor Local. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}