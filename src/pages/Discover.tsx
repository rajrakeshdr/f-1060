
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

const Discover = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      
      try {
        // Randomly select a cybersecurity topic
        const randomTopic = CYBERSECURITY_TOPICS[Math.floor(Math.random() * CYBERSECURITY_TOPICS.length)];
        
        const response = await searchHuggingFace(`Tell me about ${randomTopic} in cybersecurity. Format as 3 separate topics.`);
        
        if (response.error) {
          setError(response.error);
        } else {
          // Split the response into separate posts
          const contentBlocks = response.response
            .split('\n\n')
            .filter(block => block.trim().length > 0)
            .slice(0, 4); // Limit to 4 posts
          
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
    <div className="min-h-screen bg-[#1a1c2e] text-white">
      {/* Header with back button */}
      <header className="sticky top-0 z-10 bg-[#1a1c2e]/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">Discover</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchSection isFullPage={true} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Latest in Cybersecurity</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                  <Skeleton className="h-5 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-4/5 mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <Skeleton className="h-20 w-full rounded-md" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post, index) => {
                // Generate a title from the first sentence or first 50 chars
                const title = post.split('.')[0].trim() + '.';
                const content = post.substring(title.length).trim();
                
                // Generate a fake image for the post using a placeholder
                const imageId = index + 1;
                const imageUrl = `https://picsum.photos/seed/cyber${imageId}/600/400`;
                
                return (
                  <div 
                    key={index} 
                    className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden flex flex-col hover:border-purple-500/50 transition-colors"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt={`Cybersecurity topic ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold mb-2 text-purple-300">{title}</h3>
                      <p className="text-gray-300 mb-4 flex-1">{content}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-400">Updated recently</span>
                        <Link 
                          to="#" 
                          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
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
      </main>
    </div>
  );
};

export default Discover;
