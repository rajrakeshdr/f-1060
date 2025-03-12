
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { User, Shield, Palette, Code, Building, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current active tab from URL
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/settings/profile')) return 'profile';
    if (path.includes('/settings/personalize')) return 'personalize';
    if (path.includes('/settings/api')) return 'api';
    if (path.includes('/settings/enterprise')) return 'enterprise';
    return 'account'; // Default tab
  };
  
  const activeTab = getActiveTab();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/');
        toast({
          title: "Authentication required",
          description: "Please sign in to access settings",
          variant: "destructive"
        });
      } else {
        setUser(data.session?.user || null);
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Signed out successfully",
          description: "You have been signed out of your account"
        });
        navigate('/');
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const tabItems = [
    { id: 'account', label: 'Account', icon: User, path: '/settings' },
    { id: 'profile', label: 'Profile', icon: Shield, path: '/settings/profile' },
    { id: 'personalize', label: 'Personalize', icon: Palette, path: '/settings/personalize' },
    { id: 'api', label: 'API', icon: Code, path: '/settings/api' },
    { id: 'enterprise', label: 'Enterprise', icon: Building, path: '/settings/enterprise' },
  ];

  // Render account settings (default tab)
  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="border border-gray-700/50 rounded-lg p-6 bg-gray-800/30">
        <h3 className="text-lg font-medium mb-4">Account Information</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Joined</p>
            <p>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="border border-gray-700/50 rounded-lg p-6 bg-gray-800/30">
        <h3 className="text-lg font-medium mb-4">Sessions</h3>
        <p className="text-sm text-gray-400 mb-4">Manage your active sessions</p>
        <button className="text-red-400 hover:text-red-300 text-sm">Sign out all other sessions</button>
      </div>

      <div className="border border-gray-700/50 rounded-lg p-6 bg-gray-800/30">
        <h3 className="text-lg font-medium mb-4 text-red-400">Danger Zone</h3>
        <p className="text-sm text-gray-400 mb-4">Delete your account permanently</p>
        <button className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg text-sm">Delete Account</button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#2D2F3A] text-white">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Settings</h1>
          
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-gray-700/50 mb-8">
            {tabItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                  activeTab === item.id 
                    ? "border-purple-500 text-white" 
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
                )}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'account' && renderAccountSettings()}
            {activeTab === 'profile' && (
              <p className="text-gray-400">Profile settings content would go here</p>
            )}
            {activeTab === 'personalize' && (
              <p className="text-gray-400">Personalization settings content would go here</p>
            )}
            {activeTab === 'api' && (
              <p className="text-gray-400">API settings content would go here</p>
            )}
            {activeTab === 'enterprise' && (
              <p className="text-gray-400">Enterprise settings content would go here</p>
            )}
          </div>
          
          {/* Sign Out Button */}
          <div className="mt-12 border-t border-gray-700/50 pt-6">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
