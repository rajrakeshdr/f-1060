
import React from 'react';
import { Search, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const Library = () => {
  const threads = [
    {
      title: "Context: You are a cybersecurity expert",
      date: "2024-02-28",
    },
    {
      title: "What is the open format for SOAR playbooks",
      date: "2024-02-27",
    },
    // Add more threads as needed
  ];

  return (
    <div className="flex min-h-screen bg-[#2D2F3A] text-white">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search your threads..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Thread List */}
          <div className="space-y-2">
            {threads.map((thread, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer border border-gray-700/30"
              >
                <h3 className="text-white mb-1">{thread.title}</h3>
                <p className="text-sm text-gray-400">{thread.date}</p>
              </div>
            ))}
          </div>

          {/* Add New Thread Button */}
          <button
            className="fixed right-8 bottom-8 p-4 bg-[#6B46C1] text-white rounded-full shadow-lg hover:bg-[#5B3AAE] transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Library;
