
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { cn } from "@/lib/utils";
import { searchHuggingFace } from '@/services/searchService';
import { Skeleton } from "@/components/ui/skeleton";
import TransitionEffect from '@/components/TransitionEffect';

const categories = [
  "For You",
  "Top",
  "Tech & Science",
  "Finance",
  "Arts & Culture",
  "Sports"
];

// Define the FeedItem interface
interface FeedItem {
  title: string;
  image: string;
  category: string;
  description: string;
  source?: string;
}

const Discover = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("For You");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCybersecurityFeed = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Define queries for each category
        const queries: Record<string, string> = {
          "For You": "latest cybersecurity news and alerts",
          "Top": "top cybersecurity threats and vulnerabilities",
          "Tech & Science": "cybersecurity technology and research",
          "Finance": "financial cybersecurity threats and incidents",
          "Arts & Culture": "cybersecurity in media and entertainment",
          "Sports": "cybersecurity in sports industry"
        };
        
        const query = queries[selectedCategory] || queries["For You"];
        const result = await searchHuggingFace(query);
        
        if (result.error) {
          setError(result.error);
          setFeedItems([]);
        } else if (result.response) {
          // Parse the response into feed items
          const parsedItems = parseResponseToFeedItems(result.response, selectedCategory);
          setFeedItems(parsedItems);
        }
      } catch (err) {
        console.error("Error fetching cybersecurity feed:", err);
        setError("Failed to fetch cybersecurity feed. Please try again later.");
        setFeedItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCybersecurityFeed();
  }, [selectedCategory]);

  // Helper function to parse API response into feed items
  const parseResponseToFeedItems = (response: string, category: string): FeedItem[] => {
    // Split the response by paragraphs and create feed items
    const paragraphs = response.split('\n\n').filter(p => p.trim().length > 0);
    
    // Create at least 6 feed items from the response
    return paragraphs.slice(0, Math.min(paragraphs.length, 12)).map((paragraph, index) => {
      // Generate a somewhat relevant title from the paragraph
      const sentences = paragraph.split('. ');
      const title = sentences[0].length > 50 
        ? sentences[0].substring(0, 50) + '...' 
        : sentences[0];
        
      return {
        title: title.trim(),
        image: "/placeholder.svg",
        category: category,
        description: paragraph.substring(0, 120) + (paragraph.length > 120 ? '...' : ''),
        source: `Cybersecurity Alert #${index + 1}`
      };
    });
  };

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
                  category === selectedCategory 
                    ? "bg-[#6B46C1] text-white" 
                    : "bg-gray-800/50 hover:bg-[#6B46C1] transition-colors text-gray-300 hover:text-white"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(6).fill(0).map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-[#3A3C4A] rounded-lg overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))
          ) : error ? (
            // Error message
            <div className="col-span-full bg-red-900/20 border border-red-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-400 mb-2">Error</h3>
              <p className="text-white">{error}</p>
            </div>
          ) : (
            // Feed items
            feedItems.map((item, index) => (
              <TransitionEffect key={index} animation="fade-up" delay={100 * index}>
                <div
                  className="bg-[#3A3C4A] rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500/50 transition-all cursor-pointer h-full flex flex-col"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-sm text-purple-400">{item.category}</span>
                    <h3 className="text-lg font-medium mt-2 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300 mb-3 flex-grow">{item.description}</p>
                    {item.source && (
                      <div className="text-xs text-gray-400 mt-auto">Source: {item.source}</div>
                    )}
                  </div>
                </div>
              </TransitionEffect>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
