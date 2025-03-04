
import React, { useState } from 'react';
import { Search, Paperclip, ArrowRight } from 'lucide-react';
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
    <section className="pb-8">
      <div className="container mx-auto px-4">
        <TransitionEffect animation="fade-up" delay={300}>
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center rounded-2xl bg-[#292b3d] shadow-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full py-4 px-5 rounded-2xl border border-gray-700/50 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-lg text-gray-200"
                />
                <div className="absolute right-3 flex space-x-1">
                  <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors" type="button">
                    <Paperclip size={20} />
                  </button>
                  <button className="p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors" type="submit">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 flex items-center">
              <span className="text-xs text-gray-400 mr-2">Phind-70B</span>
              <button className="text-xs text-gray-400 hover:text-gray-300 ml-auto px-2 py-1 rounded-md border border-gray-700/50">Advanced</button>
            </div>
          </div>
        </TransitionEffect>
      </div>
    </section>
  );
};

export default SearchSection;
