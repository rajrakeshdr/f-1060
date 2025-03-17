
import React, { useState, useEffect } from 'react';
import { Paperclip, ArrowRight } from 'lucide-react';
import TransitionEffect from './TransitionEffect';
import { searchHuggingFace } from '@/services/searchService';
import SearchResults from './SearchResults';
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from 'react-router-dom';
import { getConversationsByThread, saveConversation } from '@/services/conversationService';
import { supabase } from '@/integrations/supabase/client';

interface SearchSectionProps {
  isFullPage?: boolean;
  onSearchStart?: () => void;
  initialQuery?: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({ 
  isFullPage = false,
  onSearchStart,
  initialQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [searchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check for thread parameter in URL
  const threadId = searchParams.get('thread');
  
  // Check auth status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      
      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setIsLoggedIn(!!session);
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    checkAuth();
  }, []);

  // Load conversation history if a thread ID is provided
  useEffect(() => {
    if (threadId && isLoggedIn) {
      const loadConversation = async () => {
        try {
          const conversations = await getConversationsByThread(threadId);
          
          if (conversations.length > 0) {
            // Get the most recent query and response
            const latestConversation = conversations[conversations.length - 1];
            setCurrentQuery(latestConversation.query);
            setResults(latestConversation.response);
            setSearchQuery(latestConversation.query);
            setHasSearched(true);
          }
        } catch (error) {
          console.error("Failed to load conversation:", error);
          toast({
            title: "Error loading conversation",
            description: "Failed to load the conversation thread",
            variant: "destructive"
          });
        }
      };
      
      loadConversation();
    }
  }, [threadId, isLoggedIn]);

  useEffect(() => {
    // Update search query when initialQuery changes
    if (initialQuery && initialQuery !== searchQuery) {
      setSearchQuery(initialQuery);
      // Auto-search if we get a new initial query
      if (initialQuery.trim()) {
        performSearch(initialQuery);
      }
    }
  }, [initialQuery]);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a search query",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setError(undefined);
    setCurrentQuery(query);
    
    // Notify parent component that search has started
    if (onSearchStart) {
      onSearchStart();
    }
    
    try {
      console.log("Starting search with query:", query);
      const response = await searchHuggingFace(query);
      
      if (response.error) {
        setError(response.error);
        toast({
          title: "Search error",
          description: response.error,
          variant: "destructive"
        });
      } else if (response.response) {
        setResults(response.response);
        setHasSearched(true);
        
        // Save conversation if user is logged in
        if (isLoggedIn) {
          console.log("Attempting to save conversation");
          const savedThreadId = await saveConversation(query, response.response, threadId);
          if (!savedThreadId) {
            console.error("Failed to save conversation");
          } else {
            console.log("Conversation saved with thread ID:", savedThreadId);
          }
        } else {
          console.log("User not logged in, skipping conversation save");
        }
      } else {
        setError("Received empty response from search API");
        toast({
          title: "Search error",
          description: "Received empty response from search API",
          variant: "destructive"
        });
      }
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSearch(searchQuery);
  };

  return (
    <>
      {hasSearched && (
        <SearchResults 
          isLoading={isLoading} 
          results={results} 
          error={error} 
          query={currentQuery}
        />
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
                  placeholder="Ask anything..."
                  className="w-full py-4 px-5 rounded-lg border border-gray-700/50 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-lg text-gray-200 font-sans"
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
                  <span className="text-xs text-gray-400 px-2 py-0.5 rounded bg-gray-800/50 border border-gray-700/50 font-mono">model-aria</span>
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
