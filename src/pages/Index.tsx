
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SearchSection from '@/components/SearchSection';
import SampleQueries from '@/components/SampleQueries';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";
import SignInModal from '@/components/SignInModal';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);

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
    setShowRightPanel(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1c2e] text-white relative overflow-hidden">
      <div className="relative z-10 flex h-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <NavBar />
          <div className="flex-1 overflow-auto">
            {!hasSearched && <Hero />}
            <SearchSection 
              onSearchStart={handleSearchStart}
            />
            {!hasSearched && <SampleQueries />}
            {!hasSearched && <Footer />}
          </div>
        </div>
        
        {/* Collapsible Panel - Only show if not searched */}
        {showRightPanel && (
          <CollapsiblePanel>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <div className="space-y-3">
              <PanelItem
                title="Discover"
                description="Explore cybersecurity content"
                icon="Search"
                link="/discover"
              />
              <PanelItem
                title="Spaces"
                description="Access your custom spaces"
                icon="LayoutGrid"
                link="/spaces"
              />
              <PanelItem
                title="Library"
                description="Browse saved resources"
                icon="Library"
                link="/library"
              />
            </div>
          </CollapsiblePanel>
        )}
      </div>
      
      {/* Sign In Button or User Profile - Fixed to bottom left */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {user ? (
              <div 
                className={cn(
                  "fixed left-6 bottom-6 z-20"
                )}
              >
                <UserProfile user={user} />
              </div>
            ) : (
              <button 
                className={cn(
                  "fixed left-6 bottom-6 z-20",
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
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{user ? 'Your Profile' : 'Sign In'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />
    </div>
  );
};

// Panel item component for the collapsible panel
const PanelItem = ({ title, description, icon, link }: { 
  title: string; 
  description: string; 
  icon: "Search" | "LayoutGrid" | "Library"; 
  link: string;
}) => {
  // Dynamic icon import
  const Icon = React.lazy(() => import('lucide-react').then(mod => {
    return { default: mod[icon] };
  }));
  
  return (
    <a 
      href={link} 
      className="block p-3 bg-gray-700/30 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <React.Suspense fallback={<div className="w-5 h-5" />}>
          <Icon size={20} />
        </React.Suspense>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default Index;
