
import React from 'react';

interface SearchHistoryProps {
  searchHistory: any[];
}

const SearchHistory = ({ searchHistory }: SearchHistoryProps) => {
  if (searchHistory.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium mb-2 text-gray-300">Recent Searches</h3>
      <div className="space-y-2 max-h-[150px] overflow-y-auto">
        {searchHistory.slice(0, 5).map((search, index) => (
          <div key={index} className="p-2 bg-gray-700/50 rounded-md text-xs">
            <div className="flex justify-between">
              <span className="font-medium">{search.type}: {search.query}</span>
              <span className="text-gray-400">{new Date(search.timestamp).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-400 mt-1">
              Found {search.results.length} breach{search.results.length !== 1 ? 'es' : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
