import React, { useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import TransitionEffect from './TransitionEffect';
import { ExternalLink, ThumbsUp, ThumbsDown, Copy, Share2, Expand } from 'lucide-react';
import { cn } from "@/lib/utils";
import { supabase } from '@/integrations/supabase/client';

interface SearchHistoryItem {
  query: string;
  timestamp: string;
  id: string;
}

interface SearchResultsProps {
  isLoading: boolean;
  results: string;
  error?: string;
  query?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ isLoading, results, error, query }) => {
  
  useEffect(() => {
    if (query && results && !isLoading && !error) {
      saveSearchToHistory(query);
    }
  }, [query, results, isLoading, error]);

  const saveSearchToHistory = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const existingHistory = localStorage.getItem('searchHistory');
    let searchHistory: SearchHistoryItem[] = existingHistory 
      ? JSON.parse(existingHistory) 
      : [];
    
    const newItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query: searchQuery,
      timestamp: new Date().toISOString()
    };
    
    const updatedHistory = [
      newItem,
      ...searchHistory.filter(item => item.query !== searchQuery)
    ].slice(0, 50);
    
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="w-full md:w-72">
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-20 w-full mb-2 rounded-md" />
            <Skeleton className="h-20 w-full mb-2 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-24 px-4 py-6 bg-red-900/20 border border-red-700 rounded-lg">
        <h3 className="text-xl font-medium text-red-400 mb-2">Error</h3>
        <p className="text-white">{error}</p>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  const paragraphs = results.split('\n').filter(p => p.trim() !== '');
  
  const sources = [
    {
      id: 1,
      title: "Definition & Meaning",
      domain: "cybersecurity-guide.org",
      snippet: "A comprehensive overview of security concepts..."
    },
    {
      id: 2,
      title: "Best Practices for Security",
      domain: "infosec-institute.com",
      snippet: "Industry standard approaches to securing..."
    },
    {
      id: 3,
      title: "Recent Threats Analysis",
      domain: "threat-intel.net",
      snippet: "Latest information about emerging security threats..."
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-28 pt-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <TransitionEffect animation="fade-in" delay={300}>
            <div className="bg-[#1e202f] rounded-lg p-4 mb-5">
              <div className="flex items-center text-purple-400 text-sm font-medium mb-4">
                <span className="flex items-center px-2 py-1 rounded-full bg-purple-900/30 text-purple-400">
                  MODEL-ARIA
                </span>
              </div>
              
              <div className="p-2">
                <div className="text-white text-lg mb-4 font-heading">
                  {paragraphs.map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 pt-2 border-t border-gray-700/50">
                  <button className="p-2 hover:bg-gray-700/30 rounded-md flex items-center gap-1 transition-colors">
                    <ThumbsUp size={16} />
                  </button>
                  <button className="p-2 hover:bg-gray-700/30 rounded-md flex items-center gap-1 transition-colors">
                    <ThumbsDown size={16} />
                  </button>
                  <button className="p-2 hover:bg-gray-700/30 rounded-md flex items-center gap-1 transition-colors">
                    <Copy size={16} />
                  </button>
                  <button className="p-2 hover:bg-gray-700/30 rounded-md flex items-center gap-1 transition-colors">
                    <Share2 size={16} />
                  </button>
                  <button className="p-2 hover:bg-gray-700/30 rounded-md flex items-center gap-1 transition-colors ml-auto">
                    <Expand size={16} />
                  </button>
                </div>
              </div>
            </div>
          </TransitionEffect>

          <div className="mt-6">
            <h3 className="text-base font-medium text-gray-300 mb-3 font-heading">Dive deeper</h3>
            <div className="space-y-2">
              {["Tell me more about cybersecurity best practices", 
                "What are common security vulnerabilities?",
                "How to implement zero trust architecture?",
                "Explain the concept of defense in depth"
              ].map((suggestion, idx) => (
                <button 
                  key={idx}
                  className="block w-full text-left p-3 rounded-md bg-[#1e202f] hover:bg-gray-700/50 transition-colors text-sm text-gray-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-[#1e202f] rounded-lg p-4 sticky top-4">
            <h3 className="text-base font-medium text-gray-300 mb-3 font-heading">Sources</h3>
            <div className="space-y-3">
              {sources.map((source) => (
                <a 
                  key={source.id}
                  href={`https://${source.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-gray-800/30 rounded-md hover:bg-gray-700/50 transition-colors border border-gray-700/50"
                >
                  <div className="flex items-start">
                    <div className="bg-gray-700 text-white rounded w-6 h-6 flex items-center justify-center shrink-0 mr-2">
                      {source.id}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{source.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{source.domain}</p>
                      <p className="text-xs text-gray-300 mt-1 line-clamp-2 font-mono">{source.snippet}</p>
                    </div>
                  </div>
                </a>
              ))}
              <button className="w-full text-center text-xs text-gray-400 py-1 hover:text-gray-300">
                +3 more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
