
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import SearchSection from '@/components/SearchSection';
import SampleQueries from '@/components/SampleQueries';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";
import SignInModal from '@/components/SignInModal';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Check if user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (event === 'SIGNED_IN') {
        setIsSignInModalOpen(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSearchStart = () => {
    setHasSearched(true);
    setShowRightPanel(false); // Always hide panel when search begins
  };

  const handleSampleQueryClick = (query: string) => {
    setSearchQuery(query);
    // Trigger search with the selected query
    handleSearchStart();
  };

  return (
    <div className="flex min-h-screen bg-[#2D2F3A] text-white relative overflow-hidden grid-pattern">
      <Sidebar />
      <div className="flex-1 ml-20 transition-all duration-300"> {/* Adjusted margin for collapsed sidebar */}
        <div className="relative z-10 flex h-screen">
          <div className="flex-1 flex flex-col overflow-hidden">
            <NavBar />
            <div className="flex-1 overflow-auto">
              {!hasSearched && <Hero />}
              <SearchSection 
                onSearchStart={handleSearchStart}
                initialQuery={searchQuery}
              />
              {!hasSearched && (
                <SampleQueries onSearch={handleSampleQueryClick} />
              )}
              {!hasSearched && <Footer />}
            </div>
          </div>
        </div>
        
        {/* Sign In Button or User Profile - Fixed position with z-index to avoid overlap */}
        <div className={cn(
          "fixed right-6 bottom-24 z-40"
        )}>
          {user ? (
            <UserProfile user={user} />
          ) : (
            <button 
              className={cn(
                "flex items-center justify-center p-3",
                "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700",
                "text-white rounded-full shadow-lg",
                "border border-gray-700/50 transition-all duration-200",
                "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
              aria-label="Sign In"
              onClick={() => setIsSignInModalOpen(true)}
            >
              <UserRound size={20} />
            </button>
          )}
        </div>

        <SignInModal 
          isOpen={isSignInModalOpen} 
          onClose={() => setIsSignInModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Index;
