
import React from 'react';
import TransitionEffect from './TransitionEffect';
import { cn } from '@/lib/utils';

interface PrincipleProps {
  number: string;
  title: string;
  description: string;
  delay: number;
}

const Principle: React.FC<PrincipleProps> = ({ number, title, description, delay }) => {
  return (
    <TransitionEffect animation="fade-up" delay={delay}>
      <div className="flex gap-6">
        <div className="text-3xl font-light text-muted-foreground">{number}</div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </TransitionEffect>
  );
};

const About: React.FC = () => {
  const principles = [
    {
      number: "01",
      title: "Good design is innovative",
      description: "The possibilities for innovation are not exhausted. Technological development always offers new opportunities.",
      delay: 100,
    },
    {
      number: "02",
      title: "Good design is useful",
      description: "A product is bought to be used. It must satisfy certain criteria, not only functional, but also psychological and aesthetic.",
      delay: 300,
    },
    {
      number: "03",
      title: "Good design is aesthetic",
      description: "The aesthetic quality of a product is integral to its usefulness because products we use every day affect our well-being.",
      delay: 500,
    },
    {
      number: "04",
      title: "Good design is unobtrusive",
      description: "Products fulfilling a purpose are like tools. They are neither decorative objects nor works of art.",
      delay: 700,
    },
    {
      number: "05",
      title: "Good design is honest",
      description: "It does not make a product more innovative, powerful or valuable than it really is. It does not attempt to manipulate the consumer.",
      delay: 900,
    },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <TransitionEffect animation="fade-up">
              <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-secondary rounded-full">
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Design that respects its purpose
              </h2>
              <p className="text-muted-foreground mb-6">
                We believe that good design is not just about how something looks, but how it works. It is about creating products that serve their purpose with elegance and efficiency.
              </p>
              <p className="text-muted-foreground">
                Our approach is guided by timeless principles that emphasize clarity, purpose, and respect for the user's intelligence.
              </p>
            </TransitionEffect>
          </div>
          
          <div className="lg:w-2/3">
            <div className="space-y-12">
              {principles.map((principle, index) => (
                <Principle key={index} {...principle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
