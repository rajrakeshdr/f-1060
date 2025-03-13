
import React from 'react';
import TransitionEffect from './TransitionEffect';
import { Shield, Lock, Bug, AlertTriangle } from 'lucide-react';
import { searchHuggingFace } from '@/services/searchService';
import { toast } from "@/components/ui/use-toast";

interface SampleQueriesProps {
  onSearch?: (query: string) => void;
}

const SampleQueries: React.FC<SampleQueriesProps> = ({ onSearch }) => {
  const sampleQueries = [
    { 
      icon: <Shield className="h-5 w-5" />, 
      text: "Latest ransomware threats"
    },
    { 
      icon: <Lock className="h-5 w-5" />, 
      text: "Zero-day vulnerabilities" 
    },
    { 
      icon: <Bug className="h-5 w-5" />, 
      text: "Cybersecurity best practices" 
    },
    { 
      icon: <AlertTriangle className="h-5 w-5" />, 
      text: "Network security monitoring" 
    }
  ];

  const handleQueryClick = (query: string) => {
    if (onSearch) {
      onSearch(query);
    } else {
      toast({
        title: "Search initiated",
        description: `Searching for: ${query}`,
      });
    }
  };

  return (
    <section className="pb-16">
      <div className="container mx-auto px-4">
        <TransitionEffect animation="fade-up" delay={500}>
          <div className="flex flex-wrap justify-center gap-3">
            {sampleQueries.map((query, index) => (
              <button
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#292b3d] text-gray-300 text-sm hover:bg-[#6B46C1] transition-colors border border-gray-700/50"
                onClick={() => handleQueryClick(query.text)}
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
