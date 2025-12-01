"use client"

import React from 'react';
// CORREÇÃO: Usando 'lucide-react' para evitar erro de compilação.
import { LuMapPin, LuMail, LuPhone, LuHeart, LuSend } from 'react-icons/lu';

// Dados Fictícios
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
 * Adaptado ao tema Fresh & Modern (Teal/Aqua).
 */
export default function Footer() {
  return (
    // O rodapé usa a cor de fundo 'card' para um ligeiro contraste (Soft Mint White vs Pure White)
    <footer className="w-full bg-card border-t border-border mt-16">
      
      {/* Container Centralizado - Usa a classe CSS '.container' (que já tem margin/padding auto) */}
      <div className="container py-12">
        
        {/* Layout Principal: Grid de 3 Colunas (no desktop) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Coluna 1: Informações de Contacto e Marca */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">
              Sabor Local
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Conectando você aos melhores sabores da cidade. Nosso paladar é o mapa.
            </p>

            {/* "Mesa de Informações" - Estrutura de lista */}
            <dl className="space-y-3 text-sm">
              <div className="flex items-start">
                {/* Ícone Aqua (Secondary) */}
                <LuMapPin className="shrink-0 w-5 h-5 text-secondary mt-0.5 mr-2" />
                <dd className="text-foreground">Rua Fictícia, 123, Lisboa, Portugal</dd>
              </div>
              <div className="flex items-start">
                {/* Ícone Aqua (Secondary) */}
                <LuPhone className="shrink-0 w-5 h-5 text-secondary mt-0.5 mr-2" />
                <dd>
                  <a href="tel:+351210000000" className="text-foreground hover:text-primary transition">
                    +351 210 000 000
                  </a>
                </dd>
              </div>
              <div className="flex items-start">
                {/* Ícone Aqua (Secondary) */}
                <LuMail className="shrink-0 w-5 h-5 text-secondary mt-0.5 mr-2" />
                <dd>
                  <a href="mailto:contato@saborlocal.pt" className="text-foreground hover:text-primary transition">
                    contato@saborlocal.pt
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Coluna 2: Navegação (Links) */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-1">
            {/* Secção Explorar */}
            <div>
              {/* Borda Teal (Primary/50) */}
              <h4 className="text-base font-semibold text-foreground mb-4 border-b-2 border-primary/50 pb-1 inline-block">
                Explorar Sabores
              </h4>
              <ul className="space-y-3">
                {navigation.explorar.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Secção Empresa */}
            <div>
              {/* Borda Teal (Primary/50) */}
              <h4 className="text-base font-semibold text-foreground mb-4 border-b-2 border-primary/50 pb-1 inline-block">
                Sabor & Companhia
              </h4>
              <ul className="space-y-3">
                {navigation.empresa.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coluna 3: Newsletter e CTA - Destaque em Aqua (Secondary) */}
          {/* Usa o Aqua (secondary/10) para dar um toque fresco e destacar esta secção */}
          <div className="p-6 rounded-xl shadow-xl bg-secondary/10 dark:bg-secondary/20 h-full flex flex-col justify-between">
              <div className="space-y-4">
                  <h4 className="text-xl font-bold text-primary">
                      Novidades na sua caixa de entrada
                  </h4>
                  <p className="text-sm text-foreground/80">
                      Receba as melhores ofertas e os novos restaurantes que acabaram de abrir.
                  </p>
                  
                  {/* Formulário de Subscrição */}
                  <form className="flex mt-4">
                      <input
                          type="email"
                          placeholder="Seu e-mail aqui"
                          // Borda Aqua (Secondary), Foco Teal (Primary)
                          className="grow p-3 rounded-l-lg border border-secondary focus:ring-2 focus:ring-primary focus:border-primary text-foreground bg-white dark:bg-background/50 outline-none"
                          aria-label="Email para subscrição da newsletter"
                          required
                      />
                      <button
                          type="submit"
                          // Botão Teal (Primary)
                          className="p-3 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition flex items-center justify-center space-x-2"
                      >
                          <LuSend className="w-5 h-5" />
                      </button>
                  </form>
              </div>
              <div className="mt-6 pt-4 border-t border-secondary/50">
                   <p className="text-xs text-foreground/60 italic">
                      Prometemos não encher a sua caixa de entrada com spam, apenas sabor!
                   </p>
              </div>
          </div>
        </div>

        {/* Secção de Direitos Autorais e Rodapé Final */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            {/* Coração Teal (Primary) */}
            Feito com <LuHeart className="w-4 h-4 mx-1 text-primary" /> para o Projeto Final de Faculdade.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            &copy; {new Date().getFullYear()} Sabor Local. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}