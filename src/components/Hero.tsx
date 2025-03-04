
import React from 'react';
import TransitionEffect from './TransitionEffect';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-28 pb-16 flex items-center justify-center min-h-[65vh]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(250,250,252,1)_0%,rgba(250,250,252,0)_100%)]"></div>
      
      <div className="container mx-auto px-4 text-center">
        <TransitionEffect animation="fade-up" delay={100}>
          <span className="inline-block mb-4 px-3 py-1 text-xs font-medium bg-secondary rounded-full">
            AI-powered knowledge explorer
          </span>
        </TransitionEffect>
        
        <TransitionEffect animation="fade-up" delay={300}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl mx-auto text-balance">
            Get smarter answers to your questions
          </h1>
        </TransitionEffect>
        
        <TransitionEffect animation="fade-up" delay={500}>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            An intelligent search and reasoning engine that combines the power of AI with the reliability of verified sources.
          </p>
        </TransitionEffect>
      </div>
    </section>
  );
};

export default Hero;
