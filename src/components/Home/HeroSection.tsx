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
                    <h1>Find Restaurants Near You</h1>
                    <p>Search places by cuisine, price, and distance. Check real reviews, hours, and photos. Pick where you want to eat without confusion.</p>
                    <button className='Hero_CTA_Button' onClick={handleExploreClick}>
                        Explore Restaurants
                    </button>
                </div>
            </div>
        </section>
    )
}