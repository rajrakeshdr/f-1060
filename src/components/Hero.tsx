
import React from 'react';
import Button from './Button';
import TransitionEffect from './TransitionEffect';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(250,250,252,1)_0%,rgba(250,250,252,0)_100%)]"></div>
      
      <div className="container mx-auto px-4 text-center">
        <TransitionEffect animation="fade-up" delay={100}>
          <span className="inline-block mb-4 px-3 py-1 text-xs font-medium bg-secondary rounded-full">
            Simplicity is the ultimate sophistication
          </span>
        </TransitionEffect>
        
        <TransitionEffect animation="fade-up" delay={300}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl mx-auto text-balance">
            Designed with precision, built for purpose
          </h1>
        </TransitionEffect>
        
        <TransitionEffect animation="fade-up" delay={500}>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Where form meets function in perfect harmony. Experience design that respects your intelligence and elevates your experience.
          </p>
        </TransitionEffect>
        
        <TransitionEffect animation="fade-up" delay={700}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg">
              Explore
            </Button>
            <Button variant="outlined" size="lg">
              Learn More
            </Button>
          </div>
        </TransitionEffect>
      </div>
    </section>
  );
};

export default Hero;
