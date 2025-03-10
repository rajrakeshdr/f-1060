
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import TransitionEffect from './TransitionEffect';

interface SearchResultsProps {
  isLoading: boolean;
  results: string;
  error?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ isLoading, results, error }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 px-4 py-6">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 px-4 py-6 bg-red-900/20 border border-red-700 rounded-lg">
        <h3 className="text-xl font-medium text-red-400 mb-2">Error</h3>
        <p className="text-white">{error}</p>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <TransitionEffect animation="fade-up" delay={300}>
      <div className="w-full max-w-4xl mx-auto mt-8 px-4 py-6 bg-gray-800/30 border border-gray-700 rounded-lg">
        <h3 className="text-xl font-medium text-purple-400 mb-4">Search Results</h3>
        <div className="prose prose-invert max-w-none">
          {results.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-200">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </TransitionEffect>
  );
};

export default SearchResults;
