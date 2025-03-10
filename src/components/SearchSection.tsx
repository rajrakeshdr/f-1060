
import React, { useState } from 'react';
import { Search, Paperclip, ArrowRight } from 'lucide-react';
import TransitionEffect from './TransitionEffect';
import Button from './Button';
import { searchHuggingFace } from '@/services/searchService';
import SearchResults from './SearchResults';
import { toast } from "@/components/ui/use-toast";

const SearchSection: React.FC<{ isFullPage?: boolean }> = ({ isFullPage = false }) => {
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

  const sectionClasses = isFullPage 
    ? "pb-4 pt-4" 
    : hasSearched ? "pb-4 pt-4" : "pb-8";

  return (
    <>
      <section className={sectionClasses}>
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
              </form>
              <div className="mt-3 flex items-center">
                <span className="text-xs text-gray-400 mr-2">Phind-70B</span>
                <button className="text-xs text-gray-400 hover:text-gray-300 ml-auto px-2 py-1 rounded-md border border-gray-700/50">Advanced</button>
              </div>
            </div>
          </TransitionEffect>
        </div>
      </section>

      {hasSearched && (
        <SearchResults isLoading={isLoading} results={results} error={error} />
      )}
    </>
  );
};

export default SearchSection;
