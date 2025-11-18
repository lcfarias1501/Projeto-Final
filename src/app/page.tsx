"use client"

import HeroSection from '@/components/Home/HeroSection';
import { useState } from 'react';

export default function Home() {

  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});

  return (
    <div >

      <HeroSection />

      <h1>Restaurant Trending Near You</h1>

    </div>
  );
}
