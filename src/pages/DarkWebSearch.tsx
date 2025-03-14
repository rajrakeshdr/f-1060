
import React from 'react';
import Sidebar from '@/components/Sidebar';
import SearchSection from '@/components/SearchSection';
import { useLocation } from 'react-router-dom';
import DarkWebSearchForm from '@/components/DarkWebSearchForm';
import { ArrowLeftCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserProfile from '@/components/UserProfile';
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from 'react';
import TransitionEffect from '@/components/TransitionEffect';

const DarkWebSearch = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [sidebarWidth, setSidebarWidth] = useState(80); // Default width when collapsed

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    checkUser();
  }, []);

  // Update sidebar width based on sidebar state (expanded/collapsed)
  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        setSidebarWidth(sidebar.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Use MutationObserver to detect changes in the sidebar's width
    const observer = new MutationObserver(handleResize);
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#17182a] text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-auto relative transition-all" style={{ marginLeft: `${sidebarWidth}px` }}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeftCircle size={20} />
            </Link>
            <h1 className="text-xl font-heading">Dark Web Search</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {user && <UserProfile user={user} />}
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8 max-w-7xl pb-40">
          <TransitionEffect animation="fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">Dark Web Intelligence Search</h1>
              <p className="text-gray-400 max-w-2xl">
                Check if your personal information has been exposed in dark web forums, data breaches, 
                or leaked databases. Our advanced search scans multiple intelligence sources.
              </p>
            </div>
          </TransitionEffect>
          
          <DarkWebSearchForm />
        </div>
        
        <SearchSection isFullPage={location.pathname === '/search'} />
      </main>
    </div>
  );
};

export default DarkWebSearch;
