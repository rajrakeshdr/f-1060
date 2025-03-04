
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SearchSection from '@/components/SearchSection';
import SampleQueries from '@/components/SampleQueries';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-[#1a1c2e] text-white relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="w-full h-full grid grid-cols-12 grid-rows-[repeat(30,1fr)]">
          {Array.from({ length: 12 * 30 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-gray-500/20"></div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10">
        <NavBar />
        <Hero />
        <SearchSection />
        <SampleQueries />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
