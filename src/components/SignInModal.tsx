
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Google, PanelLeftClose } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MicrosoftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 23 23">
    <path fill="#f3f3f3" d="M0 0h10.931v10.931H0z"/>
    <path fill="#f35325" d="M11.954 0h10.931v10.931H11.954z"/>
    <path fill="#81bc06" d="M0 11.954h10.931v10.931H0z"/>
    <path fill="#05a6f0" d="M11.954 11.954h10.931v10.931H11.954z"/>
  </svg>
);

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const handleSignInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) {
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Authentication error",
        description: "Failed to sign in with Google",
        variant: "destructive"
      });
    }
  };

  const handleSignInWithMicrosoft = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) {
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Authentication error",
        description: "Failed to sign in with Microsoft",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border border-gray-700 bg-[#1a1c2e] text-white">
        <div className="flex flex-col items-center space-y-6 p-4">
          <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-gray-400 mb-6">Choose a provider to continue</p>
          
          <div className="flex flex-col w-full gap-4">
            <button
              onClick={handleSignInWithGoogle}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Google size={24} />
              <span className="sr-only">Sign in with Google</span>
            </button>
            
            <button
              onClick={handleSignInWithMicrosoft}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <MicrosoftIcon />
              <span className="sr-only">Sign in with Microsoft</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
