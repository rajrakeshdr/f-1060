
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SearchSection from '@/components/SearchSection';
import FeatureHighlights from '@/components/FeatureHighlights';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <NavBar />
      <Hero />
      <SearchSection />
      <FeatureHighlights />
      <Footer />
    </div>
  );
};

export default Index;
