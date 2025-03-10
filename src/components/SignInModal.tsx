
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Mail } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Custom Google icon component
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    <path fill="none" d="M1 1h22v22H1z" />
  </svg>
);

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
              <GoogleIcon />
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
