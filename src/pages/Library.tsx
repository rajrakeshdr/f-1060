
import React, { useState, useEffect } from 'react';
import { Search, Plus, History, Clock, Trash2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { cn } from '@/lib/utils';
import TransitionEffect from '@/components/TransitionEffect';
import { getUserConversations, deleteConversationThread } from '@/services/conversationService';
import { ConversationHistoryItem } from '@/types/darkWebSearch';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

const Library = () => {
  const [conversations, setConversations] = useState<ConversationHistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuthAndLoadConversations = async () => {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsLoggedIn(true);
        try {
          const conversationsData = await getUserConversations();
          setConversations(conversationsData);
        } catch (error) {
          console.error("Failed to load conversations:", error);
          toast({
            title: "Error loading conversations",
            description: "Failed to load your conversation history",
            variant: "destructive"
          });
        }
      } else {
        setIsLoggedIn(false);
        toast({
          title: "Authentication required",
          description: "Please sign in to view your conversation history",
        });
      }
      
      setIsLoading(false);
    };
    
    checkAuthAndLoadConversations();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_IN') {
          setIsLoggedIn(true);
          checkAuthAndLoadConversations();
        } else if (event === 'SIGNED_OUT') {
          setIsLoggedIn(false);
          setConversations([]);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter is handled in the filteredConversations computed value
  };

  const deleteConversation = async (threadId: string) => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      try {
        const success = await deleteConversationThread(threadId);
        
        if (success) {
          setConversations(conversations.filter(conv => conv.thread_id !== threadId));
          toast({
            title: "Conversation deleted",
            description: "The conversation has been deleted successfully",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to delete the conversation",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error deleting conversation:", error);
        toast({
          title: "Error",
          description: "Failed to delete the conversation",
          variant: "destructive"
        });
      }
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffMins < 24 * 60) {
      return `${Math.floor(diffMins / 60)} hours ago`;
    } else {
      return `${Math.floor(diffMins / (60 * 24))} days ago`;
    }
  };
  
  const startNewConversation = () => {
    navigate('/discover');
  };

  const viewConversation = (threadId: string) => {
    // For now, just navigate to discover. In a future enhancement, 
    // we could load the specific conversation thread
    navigate(`/discover?thread=${threadId}`);
  };

  const filteredConversations = searchTerm
    ? conversations.filter(item => 
        item.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.response.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : conversations;

  return (
    <div className="flex min-h-screen bg-[#2D2F3A] text-white">
      <Sidebar />
      <div className="flex-1 ml-20 p-6"> {/* Adjusted margin for collapsed sidebar */}
        <div className="max-w-4xl mx-auto">
          <TransitionEffect animation="fade-up" delay={100}>
            <h1 className="text-2xl font-bold mb-6">Conversation History</h1>
          </TransitionEffect>
          
          {/* Search Bar */}
          <TransitionEffect animation="fade-up" delay={200}>
            <form onSubmit={handleSearch} className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search your history..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </TransitionEffect>

          {/* Auth Check and Loading State */}
          {!isLoggedIn ? (
            <div className="text-center py-10 text-gray-400">
              <p>Please sign in to view your conversation history</p>
            </div>
          ) : isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                  <div className="h-5 bg-gray-700/50 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            /* History List */
            <div className="space-y-3">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <History className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No conversation history found</p>
                </div>
              ) : (
                filteredConversations.map((item, index) => (
                  <TransitionEffect key={item.id} animation="fade-up" delay={100 * index}>
                    <div 
                      className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors border border-gray-700/30 group relative cursor-pointer"
                      onClick={() => viewConversation(item.thread_id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-white mb-1 pr-8">
                            {item.title || item.query.substring(0, 50) + (item.query.length > 50 ? '...' : '')}
                          </h3>
                          <div className="flex items-center text-sm text-gray-400">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{formatTimestamp(item.timestamp)}</span>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(item.thread_id);
                          }}
                          className={cn(
                            "text-gray-500 hover:text-red-400 transition-opacity",
                            "opacity-0 group-hover:opacity-100 focus:opacity-100"
                          )}
                          aria-label="Delete conversation"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </TransitionEffect>
                ))
              )}
            </div>
          )}

          {/* Add New Conversation Button */}
          <button
            className="fixed right-8 bottom-8 p-4 bg-[#6B46C1] text-white rounded-full shadow-lg hover:bg-[#5B3AAE] transition-colors"
            aria-label="New conversation"
            onClick={startNewConversation}
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Library;
