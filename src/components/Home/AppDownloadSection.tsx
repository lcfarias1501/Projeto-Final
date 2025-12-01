import React from 'react'
import { LuSmartphone } from 'react-icons/lu'
import { FaApple, FaGooglePlay } from 'react-icons/fa'

export default function AppDownloadSection() {
  return (
    <section className="container">
      <div className="app_download_section">
        <div className="app_content">
          <LuSmartphone size={64} color="hsl(var(--primary))" style={{ margin: '0 auto' }} />
          <h2 className="app_title">Baixe Nosso App</h2>
          <p className="app_description">
            Faça pedidos mais rápido, acompanhe entregas em tempo real e aproveite 
            ofertas exclusivas direto do seu celular.
          </p>
        </div>
        <div className="app_buttons">
          <button className="app_store_button">
            <FaApple className="app_store_icon" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Baixar na</div>
              <div>App Store</div>
            </div>
          </button>
          <button className="app_store_button">
            <FaGooglePlay className="app_store_icon" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Disponível no</div>
              <div>Google Play</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}