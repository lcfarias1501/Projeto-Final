import React from 'react'
import Image from 'next/image'
import '@/styles/Home/HeroSection.css'
import { redirect } from 'next/navigation';


const imageURL = 'https://images.pexels.com/photos/3184195/pexels-photo-3184195.jpeg'

export default function HeroSection() {

    const handleExploreClick = () => {
        redirect('/restaurants');
    }

    return (
        <section className='Hero_Section'>
            <div className='Hero_Section_Image_Wrapper'>
                <Image
                    src={imageURL}
                    alt="Restaurant ambiance with delicious food"
                    fill
                    priority
                    className='Hero_Section_Image'
                    sizes="100vw"
                    quality={90}
                />
            </div>

            <div className="Hero_Section_Layer">
                <div className='Hero_Section_Content container'>
                    <h1>Encontre Restaurantes Perto de Si</h1>
                    <p>Procure lugares por culinária, preço e distância. Confira avaliações reais, horários e fotos. Escolha onde quer comer sem confusão.</p>
                    <button className='Hero_CTA_Button' onClick={handleExploreClick}>
                        Explorar Restaurantes
                    </button>
                </div>
            </div>
        </section>
    )
}