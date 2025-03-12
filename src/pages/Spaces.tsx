
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Plus } from 'lucide-react';

const Spaces = () => {
  const spaces = [
    {
      name: "Cybersecurity Updates",
      members: 128,
      description: "Daily updates on cybersecurity threats and vulnerabilities"
    },
    {
      name: "Tech News",
      members: 256,
      description: "Latest developments in technology and AI"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#2D2F3A] text-white">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Spaces</h1>
            <button
              className="px-4 py-2 bg-[#6B46C1] rounded-lg flex items-center gap-2 hover:bg-[#5B3AAE] transition-colors"
            >
              <Plus size={20} />
              Create Space
            </button>
          </div>

          <div className="grid gap-4">
            {spaces.map((space, index) => (
              <div
                key={index}
                className="p-6 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/50 transition-colors"
              >
                <h3 className="text-xl font-medium mb-2">{space.name}</h3>
                <p className="text-gray-400 mb-4">{space.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{space.members} members</span>
                  <button className="text-sm text-purple-400 hover:text-purple-300">Join Space</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spaces;
