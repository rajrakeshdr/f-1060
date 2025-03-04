
import React from 'react';
import TransitionEffect from './TransitionEffect';
import { BookOpen, Code, ExternalLink, FileText } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <TransitionEffect animation="fade-up" delay={delay} className="flex flex-col">
      <div className="bg-secondary/30 rounded-lg p-6 h-full flex flex-col">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </TransitionEffect>
  );
};

const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: <Code size={28} />,
      title: "Code Understanding",
      description: "Analyze and explain code snippets from various programming languages with detailed insights.",
      delay: 100,
    },
    {
      icon: <BookOpen size={28} />,
      title: "Knowledge Base",
      description: "Access a vast repository of information from verified sources to ensure accuracy and reliability.",
      delay: 300,
    },
    {
      icon: <FileText size={28} />,
      title: "Detailed Explanations",
      description: "Receive comprehensive answers with context, examples, and relevant information to deepen understanding.",
      delay: 500,
    },
    {
      icon: <ExternalLink size={28} />,
      title: "Source References",
      description: "Every answer is backed by credible sources that you can explore for further reading and verification.",
      delay: 700,
    },
  ];

  return (
    <section id="features" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <TransitionEffect animation="fade-up">
          <div className="text-center mb-16">
            <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-background rounded-full">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Smarter AI. Better Answers.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI is designed to provide accurate, insightful responses by combining cutting-edge technology with reliable information sources.
            </p>
          </div>
        </TransitionEffect>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
