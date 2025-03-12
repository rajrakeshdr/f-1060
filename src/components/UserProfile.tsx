
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface UserProfileProps {
  user: {
    email?: string;
    user_metadata?: {
      full_name?: string;
      name?: string;
      avatar_url?: string;
    };
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const avatarUrl = user.user_metadata?.avatar_url;
  
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
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error signing out",
        description: "An unexpected error occurred"
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-300 hidden sm:inline">{displayName}</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="h-8 w-8 border border-gray-700 cursor-pointer">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="bg-purple-700 text-white">
              {displayName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-800 border border-gray-700 text-white">
          <Link to="/settings">
            <DropdownMenuItem className="cursor-pointer focus:bg-gray-700">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer focus:bg-gray-700">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
