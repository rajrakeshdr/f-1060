
import React, { useState } from 'react';
import { Paperclip, ArrowRight } from 'lucide-react';
import TransitionEffect from './TransitionEffect';
import { searchHuggingFace } from '@/services/searchService';
import SearchResults from './SearchResults';
import { toast } from "@/components/ui/use-toast";

const SearchSection: React.FC<{ isFullPage?: boolean; onSearchStart?: () => void }> = ({ 
  isFullPage = false,
  onSearchStart 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a search query",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setError(undefined);
    
    // Notify parent component that search has started (to hide overlay)
    if (onSearchStart) {
      onSearchStart();
    }
    
    try {
      const response = await searchHuggingFace(searchQuery);
      
      if (response.error) {
        setError(response.error);
        toast({
          title: "Search error",
          description: response.error,
          variant: "destructive"
        });
      } else {
        setResults(response.response);
      }
      setHasSearched(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      toast({
        title: "Search error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {hasSearched && (
        <SearchResults isLoading={isLoading} results={results} error={error} />
      )}
    
      <section className="fixed bottom-0 left-0 right-0 z-20 pb-6 pt-4 bg-[#17182a] border-t border-gray-700/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <TransitionEffect animation="fade-up" delay={300}>
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center rounded-lg bg-[#1e202f] shadow-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full py-4 px-5 rounded-lg border border-gray-700/50 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-lg text-gray-200"
                  disabled={isLoading}
                />
                <div className="absolute right-3 flex space-x-1">
                  <button 
                    className="p-2 text-gray-400 hover:text-gray-200 transition-colors" 
                    type="button"
                    disabled={isLoading}
                  >
                    <Paperclip size={20} />
                  </button>
                  <button 
                    className={`p-2 ${isLoading ? 'bg-purple-800' : 'bg-purple-600'} rounded-lg text-white hover:bg-purple-700 transition-colors`} 
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
                    ) : (
                      <ArrowRight size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 px-2 py-0.5 rounded bg-gray-800/50 border border-gray-700/50">Phind-70B</span>
                </div>
                {!isLoading && (
                  <button className="text-xs text-gray-400 hover:text-gray-300 px-2 py-0.5 rounded border border-gray-700/50">
                    Advanced
                  </button>
                )}
              </div>
            </form>
          </TransitionEffect>
        </div>
      </section>
    </>
  );
};

export default SearchSection;
