
import React from 'react';
import TransitionEffect from './TransitionEffect';
import { Lightbulb, Shield, Zap, Layers } from 'lucide-react';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, delay }) => {
  return (
    <TransitionEffect animation="fade-up" delay={delay} className="flex flex-col items-center">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </TransitionEffect>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: 'Intentional Design',
      description: 'Every element has a purpose, carefully considered and precisely implemented.',
      icon: <Lightbulb size={24} />,
      delay: 100,
    },
    {
      title: 'Refined Performance',
      description: 'Optimized for speed and efficiency without sacrificing quality or user experience.',
      icon: <Zap size={24} />,
      delay: 300,
    },
    {
      title: 'Timeless Quality',
      description: 'Built to last with materials and code that withstand the test of time.',
      icon: <Shield size={24} />,
      delay: 500,
    },
    {
      title: 'Intuitive Interface',
      description: 'Simple, clear interactions that respect your intelligence and enhance productivity.',
      icon: <Layers size={24} />,
      delay: 700,
    },
  ];

  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <TransitionEffect animation="fade-up">
          <div className="text-center mb-16">
            <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-background rounded-full">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Crafted with attention to detail
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each feature is designed with purpose, focusing on what matters most to provide a seamless experience.
            </p>
          </div>
        </TransitionEffect>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
