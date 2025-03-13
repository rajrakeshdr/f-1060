
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import TransitionEffect from '@/components/TransitionEffect';
import { toast } from "@/components/ui/use-toast";

const categories = [
  "Breaking News",
  "Data Breaches",
  "Cyber Attacks",
  "Vulnerabilities",
  "Threat Intel",
  "Security Tools"
];

// Define the FeedItem interface
interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
  creator?: string;
  thumbnail?: string;
}

const Discover = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Breaking News");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHackerNewsFeed = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Use a proxy or CORS-anywhere to avoid CORS issues
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const feedUrl = encodeURIComponent('https://feeds.feedburner.com/TheHackersNews');
        
        const response = await fetch(`${proxyUrl}${feedUrl}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const xmlText = await response.text();
        
        // Parse XML to JSON
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const items = xmlDoc.querySelectorAll("item");
        
        const parsedItems: FeedItem[] = [];
        
        items.forEach((item) => {
          // Extract content with images
          const content = item.querySelector("content\\:encoded")?.textContent || 
                          item.querySelector("description")?.textContent || "";
          
          // Extract thumbnail from content
          const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
          const thumbnail = imgMatch ? imgMatch[1] : "/placeholder.svg";
          
          // Filter by category if needed
          const categories = Array.from(item.querySelectorAll("category")).map(cat => cat.textContent);
          const matchesCategory = selectedCategory === "Breaking News" || 
                                 categories.some(cat => cat?.toLowerCase().includes(selectedCategory.toLowerCase()));
          
          if (matchesCategory || selectedCategory === "Breaking News") {
            parsedItems.push({
              title: item.querySelector("title")?.textContent || "",
              link: item.querySelector("link")?.textContent || "",
              pubDate: item.querySelector("pubDate")?.textContent || "",
              content: content,
              contentSnippet: content.replace(/<[^>]+>/g, '').substring(0, 150) + "...",
              guid: item.querySelector("guid")?.textContent || "",
              isoDate: new Date(item.querySelector("pubDate")?.textContent || "").toISOString(),
              creator: item.querySelector("dc\\:creator")?.textContent || "The Hacker News",
              thumbnail: thumbnail
            });
          }
        });
        
        setFeedItems(parsedItems);
      } catch (err) {
        console.error("Error fetching hacker news feed:", err);
        setError("Failed to fetch security news. Please try again later.");
        toast({
          title: "Error loading feed",
          description: "Could not load the cybersecurity feed. Check your network connection.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHackerNewsFeed();
  }, [selectedCategory]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  }

  return (
    <div className="flex min-h-screen bg-[#2D2F3A] text-white">
      <Sidebar />
      <div className="flex-1 ml-20 p-6"> {/* Adjusted margin for collapsed sidebar */}
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
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#3A3C4A] rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500/50 transition-all block h-full flex flex-col"
                >
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-sm text-purple-400">{selectedCategory}</span>
                    <h3 className="text-lg font-medium mt-2 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300 mb-3 flex-grow">{item.contentSnippet}</p>
                    <div className="text-xs text-gray-400 mt-auto flex justify-between">
                      <span>{item.creator || "The Hacker News"}</span>
                      <span>{formatDate(item.pubDate)}</span>
                    </div>
                  </div>
                </a>
              </TransitionEffect>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
