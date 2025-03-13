
import React, { useState, useEffect } from 'react';
import { Search, Plus, History, Clock, Trash2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { cn } from '@/lib/utils';
import TransitionEffect from '@/components/TransitionEffect';

interface SearchHistoryItem {
  query: string;
  timestamp: string;
  id: string;
}

const Library = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Simulate loading search history
  useEffect(() => {
    // In a real app, this would come from localStorage or a database
    const mockHistory: SearchHistoryItem[] = [
      {
        id: '1',
        query: "Latest ransomware threats",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
      {
        id: '2',
        query: "Zero-day vulnerabilities in Windows",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },
      {
        id: '3',
        query: "Cybersecurity best practices for remote work",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
      },
      {
        id: '4',
        query: "Network security monitoring tools",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
      }
    ];
    
    setSearchHistory(mockHistory);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // Add search to history
    const newItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query: searchTerm,
      timestamp: new Date().toISOString()
    };
    
    setSearchHistory([newItem, ...searchHistory]);
    setSearchTerm('');
  };

  const deleteHistoryItem = (id: string) => {
    setSearchHistory(searchHistory.filter(item => item.id !== id));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffMins < 24 * 60) {
      return `${Math.floor(diffMins / 60)} hours ago`;
    } else {
      return `${Math.floor(diffMins / (60 * 24))} days ago`;
    }
  };

  const filteredHistory = searchTerm
    ? searchHistory.filter(item => 
        item.query.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : searchHistory;

  return (
    <div className="flex min-h-screen bg-[#2D2F3A] text-white">
      <Sidebar />
      <div className="flex-1 ml-20 p-6"> {/* Adjusted margin for collapsed sidebar */}
        <div className="max-w-4xl mx-auto">
          <TransitionEffect animation="fade-down" delay={100}>
            <h1 className="text-2xl font-bold mb-6">Search History</h1>
          </TransitionEffect>
          
          {/* Search Bar */}
          <TransitionEffect animation="fade-up" delay={200}>
            <form onSubmit={handleSearch} className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search your history..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </TransitionEffect>

          {/* History List */}
          <div className="space-y-3">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <History className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No search history found</p>
              </div>
            ) : (
              filteredHistory.map((item, index) => (
                <TransitionEffect key={item.id} animation="fade-up" delay={100 * index}>
                  <div className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors border border-gray-700/30 group relative">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white mb-1 pr-8">{item.query}</h3>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{formatTimestamp(item.timestamp)}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteHistoryItem(item.id)}
                        className={cn(
                          "text-gray-500 hover:text-red-400 transition-opacity",
                          "opacity-0 group-hover:opacity-100 focus:opacity-100"
                        )}
                        aria-label="Delete search history item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </TransitionEffect>
              ))
            )}
          </div>

          {/* Add New Search Button */}
          <button
            className="fixed right-8 bottom-8 p-4 bg-[#6B46C1] text-white rounded-full shadow-lg hover:bg-[#5B3AAE] transition-colors"
            aria-label="New search"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Library;
