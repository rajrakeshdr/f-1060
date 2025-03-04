
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import TransitionEffect from './TransitionEffect';
import Button from './Button';

const SearchSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // Here you would typically handle the search functionality
  };

  return (
    <section className="pb-24">
      <div className="container mx-auto px-4">
        <TransitionEffect animation="fade-up" delay={700}>
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-muted-foreground" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask any question..."
                  className="w-full py-4 pl-12 pr-36 rounded-full border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-lg"
                />
                <div className="absolute right-2">
                  <Button type="submit" className="rounded-full px-6">
                    Search
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              <span>Try asking:</span>
              <button 
                onClick={() => setSearchQuery("How do neural networks work?")}
                className="text-primary hover:underline"
              >
                How do neural networks work?
              </button>
              <button 
                onClick={() => setSearchQuery("Explain quantum computing")}
                className="text-primary hover:underline"
              >
                Explain quantum computing
              </button>
              <button 
                onClick={() => setSearchQuery("What is the difference between AI and ML?")}
                className="text-primary hover:underline"
              >
                What is the difference between AI and ML?
              </button>
            </div>
          </div>
        </TransitionEffect>
      </div>
    </section>
  );
};

export default SearchSection;
