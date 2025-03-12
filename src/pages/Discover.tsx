
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";
import { searchHuggingFace } from '@/services/searchService';
import SearchSection from '@/components/SearchSection';

// Sample cybersecurity topics for demonstration
const CYBERSECURITY_TOPICS = [
  "latest cybersecurity threats",
  "zero-day vulnerabilities",
  "ransomware protection",
  "phishing attacks",
  "security operations center",
  "SOAR solutions",
  "threat intelligence platforms"
];

// Sample categories
const CATEGORIES = [
  "For You", "Top", "Tech & Science", "Finance", "Arts & Culture", "Sports"
];

// Sample interests
const INTERESTS = [
  "Tech & Science", "Finance", "Cybersecurity", "AI", "Cloud Computing", "IoT Security"
];

const Discover = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("For You");

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      
      try {
        // Randomly select a cybersecurity topic
        const randomTopic = CYBERSECURITY_TOPICS[Math.floor(Math.random() * CYBERSECURITY_TOPICS.length)];
        
        const response = await searchHuggingFace(`Tell me about ${randomTopic} in cybersecurity. Format as 6 separate short news-style headlines with brief descriptions.`);
        
        if (response.error) {
          setError(response.error);
        } else {
          // Split the response into separate posts
          const contentBlocks = response.response
            .split('\n\n')
            .filter(block => block.trim().length > 0)
            .slice(0, 6); // Limit to 6 posts
          
          setPosts(contentBlocks);
        }
      } catch (err) {
        setError('Failed to load cybersecurity content. Please try again later.');
        console.error('Error fetching content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-[#2D2F3A] text-white">
      {/* Header with back button and categories */}
      <header className="sticky top-0 z-10 bg-[#2D2F3A]/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold">Discover</h1>
          </div>
          
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
            <div className="flex space-x-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeCategory === category 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-[#1e202f] text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-[#3A3C4A] border border-gray-700 rounded-lg overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-5/6 mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 text-center">
                <p className="text-red-400">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => {
                  // Generate a title from the first sentence or first 50 chars
                  const title = post.split('.')[0].trim() + '.';
                  const content = post.substring(title.length).trim();
                  
                  // Generate a fake image for the post using a placeholder
                  const imageId = index + 1;
                  const imageUrl = `https://picsum.photos/seed/cyber${imageId}/800/450`;
                  
                  return (
                    <div 
                      key={index} 
                      className="bg-[#3A3C4A] border border-gray-700 rounded-lg overflow-hidden flex flex-col hover:border-purple-500/50 transition-colors"
                    >
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={imageUrl} 
                          alt={`Cybersecurity topic ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-base font-bold mb-2 text-white">{title}</h3>
                        <p className="text-sm text-gray-300 mb-4 flex-1">{content}</p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-xs text-gray-400">2 hours ago</span>
                          <Link 
                            to="#" 
                            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Sidebar - "Make it yours" */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-[#1e202f] rounded-lg p-4 sticky top-24">
              <h3 className="text-base font-medium text-gray-300 mb-3">Make it yours</h3>
              <p className="text-sm text-gray-400 mb-4">Follow the topics that interest you most.</p>
              
              <div className="space-y-2">
                {INTERESTS.map((interest) => (
                  <div key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`interest-${interest}`}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
                    />
                    <label htmlFor={`interest-${interest}`} className="ml-2 text-sm text-gray-300">
                      {interest}
                    </label>
                  </div>
                ))}
                
                <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm">
                  Update preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Fixed search bar at bottom */}
      <SearchSection />
    </div>
  );
};

export default Discover;
