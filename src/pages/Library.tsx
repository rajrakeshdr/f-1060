
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock thread data
  const threads = [
    {
      id: 1,
      title: "Context: You are a cybersecurity expert",
      date: "2 days ago",
      preview: "I'm starting a new security project and need advice on..."
    },
    {
      id: 2,
      title: "What is the open format for SOAR playbooks",
      date: "1 week ago",
      preview: "I'm looking for information about standardized formats for Security Orchestration..."
    },
    {
      id: 3,
      title: "Explain zero trust architecture",
      date: "2 weeks ago",
      preview: "I need to understand the core principles of zero trust security models..."
    }
  ];

  const filteredThreads = searchQuery
    ? threads.filter(thread => thread.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : threads;

  return (
    <div className="min-h-screen bg-[#2D2F3A] text-white">
      {/* Header with back button */}
      <header className="sticky top-0 z-10 bg-[#2D2F3A]/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">Library</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Search bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search your threads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 bg-[#1e202f] border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Thread list */}
          <div className="space-y-3">
            {filteredThreads.map(thread => (
              <div key={thread.id} className="p-4 bg-[#1e202f] rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors cursor-pointer">
                <h3 className="text-lg font-medium text-white">{thread.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{thread.preview}</p>
                <p className="text-xs text-gray-500 mt-2">{thread.date}</p>
              </div>
            ))}
          </div>

          {/* Add new thread button */}
          <button className="fixed bottom-6 right-6 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors">
            <Plus size={24} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Library;
