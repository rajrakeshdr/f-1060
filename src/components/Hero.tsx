
import React from 'react';
import TransitionEffect from './TransitionEffect';

const Hero: React.FC = () => {
  return (
    <section className="pt-20 pb-4 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <TransitionEffect animation="fade-up" delay={100}>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
            phind
          </h1>
        </TransitionEffect>
      </div>
    </section>
  );
};

export default Hero;
