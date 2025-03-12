
import React from 'react';
import TransitionEffect from './TransitionEffect';
import { ImageIcon, FileBadge, Box, Timer } from 'lucide-react';

const SampleQueries: React.FC = () => {
  const sampleQueries = [
    { 
      icon: <ImageIcon className="h-5 w-5" />, 
      text: "Generate me an image of a cat"
    },
    { 
      icon: <FileBadge className="h-5 w-5" />, 
      text: "Quicksort in Rust" 
    },
    { 
      icon: <Box className="h-5 w-5" />, 
      text: "Best omakase in NYC" 
    },
    { 
      icon: <Timer className="h-5 w-5" />, 
      text: "Waymo expanding to highways" 
    }
  ];

  return (
    <section className="pb-16">
      <div className="container mx-auto px-4">
        <TransitionEffect animation="fade-up" delay={500}>
          <div className="flex flex-wrap justify-center gap-3">
            {sampleQueries.map((query, index) => (
              <button
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#292b3d] text-gray-300 text-sm hover:bg-[#6B46C1] transition-colors border border-gray-700/50"
              >
                {query.icon}
                <span>{query.text}</span>
              </button>
            ))}
          </div>
        </TransitionEffect>
      </div>
    </section>
  );
};

export default SampleQueries;
