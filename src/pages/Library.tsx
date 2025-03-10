
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Library = () => {
  return (
    <div className="min-h-screen bg-[#1a1c2e] text-white">
      {/* Header with back button */}
      <header className="sticky top-0 z-10 bg-[#1a1c2e]/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">Library</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Your Library</h2>
          <p className="text-gray-300 mb-8">This is a placeholder for the Library page.</p>
          
          <div className="flex flex-col gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
              <p className="text-lg">Library feature coming soon</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Library;
