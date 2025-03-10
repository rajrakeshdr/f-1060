
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

// Type for cybersecurity post
interface CyberSecurityPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  source: string;
  url: string;
}

// Mock data for cybersecurity posts
const mockPosts: CyberSecurityPost[] = [
  {
    id: '1',
    title: 'Latest Ransomware Attack Targets Healthcare Systems',
    description: 'A new strain of ransomware has been targeting healthcare systems, affecting patient care and data security.',
    imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    date: '2023-05-15',
    source: 'CyberNews',
    url: '#'
  },
  {
    id: '2',
    title: 'Critical Vulnerability Found in Popular VPN Service',
    description: 'Security researchers have discovered a zero-day vulnerability affecting millions of VPN users worldwide.',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    date: '2023-05-12',
    source: 'Security Weekly',
    url: '#'
  },
  {
    id: '3',
    title: 'New Phishing Campaign Targets Remote Workers',
    description: 'A sophisticated phishing campaign is targeting remote workers with fake meeting invitations and login portals.',
    imageUrl: 'https://images.unsplash.com/photo-1596810577213-1a603aaff58a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3',
    date: '2023-05-10',
    source: 'Threat Post',
    url: '#'
  },
  {
    id: '4',
    title: 'AI-Powered Security Tools Show Promise in Early Tests',
    description: 'New security solutions leveraging artificial intelligence have shown significant improvements in threat detection.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    date: '2023-05-08',
    source: 'Tech Security Today',
    url: '#'
  },
  {
    id: '5',
    title: 'Major Cloud Provider Suffers Service Outage After Attack',
    description: 'A distributed denial-of-service attack caused widespread outages for a major cloud service provider.',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    date: '2023-05-05',
    source: 'Cloud Security News',
    url: '#'
  },
  {
    id: '6',
    title: 'Government Issues Advisory on Critical Infrastructure Protection',
    description: 'Federal agencies have released new guidelines to help organizations secure critical infrastructure systems.',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    date: '2023-05-03',
    source: 'Gov Security',
    url: '#'
  }
];

// Simulated fetch function
const fetchCyberSecurityPosts = async (): Promise<CyberSecurityPost[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockPosts;
};

const Discover = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['cyberSecurityPosts'],
    queryFn: fetchCyberSecurityPosts,
  });

  return (
    <div className="min-h-screen bg-[#1a1c2e] text-white">
      {/* Header with back button */}
      <header className="sticky top-0 z-10 bg-[#1a1c2e]/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold">Discover</h1>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search cybersecurity news..."
              className="pl-10 pr-4 py-2 bg-gray-800/50 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Recent Cybersecurity Posts</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700/30">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4 text-center">
            <p>Failed to load cybersecurity posts. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map(post => (
              <article key={post.id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700/30 hover:border-gray-600 transition-all hover:translate-y-[-2px]">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{post.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{post.source}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Discover;
