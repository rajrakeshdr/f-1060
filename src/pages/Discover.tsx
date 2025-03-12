
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { cn } from "@/lib/utils";

const categories = [
  "For You",
  "Top",
  "Tech & Science",
  "Finance",
  "Arts & Culture",
  "Sports"
];

const feedItems = [
  {
    title: "Bluesky CEO Trolls Zuckerberg",
    image: "/placeholder.svg",
    category: "Tech & Science"
  },
  {
    title: "Court Demands DOGE Records",
    image: "/placeholder.svg",
    category: "Finance"
  },
  // Add more items as needed
];

const Discover = () => {
  return (
    <div className="flex min-h-screen bg-[#2D2F3A] text-white">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={cn(
                  "px-4 py-2 rounded-full whitespace-nowrap",
                  "bg-gray-800/50 hover:bg-[#6B46C1] transition-colors",
                  "text-gray-300 hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#3A3C4A] rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500/50 transition-all cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-sm text-purple-400">{item.category}</span>
                <h3 className="text-lg font-medium mt-2">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
