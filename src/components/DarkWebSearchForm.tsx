
import React from 'react';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import SignInModal from './SignInModal';
import { SearchFormTabs } from './darkweb/SearchFormTabs';
import SearchHistory from './darkweb/SearchHistory';
import SupportedServices from './darkweb/SupportedServices';
import { useDarkWebSearch } from '@/hooks/useDarkWebSearch';
import { UserProfile } from '@/types/darkWebSearch';

interface DarkWebSearchFormProps {
  userProfile?: UserProfile | null;
}

const DarkWebSearchForm: React.FC<DarkWebSearchFormProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  
  const {
    form,
    activeTab,
    setActiveTab,
    isLoading,
    isLoggedIn,
    searchHistory,
    isSignInModalOpen,
    setIsSignInModalOpen,
    onSubmit
  } = useDarkWebSearch(userProfile);

  // Handle sign in modal close
  const handleSignInModalClose = () => {
    setIsSignInModalOpen(false);
  };

  // Handle sign in button click
  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  return (
    <>
      <Card className="bg-gray-800/70 border-gray-700/50">
        <CardHeader className="bg-purple-800 rounded-t-lg">
          <CardTitle className="text-white">Dark Web Breach Search</CardTitle>
          <CardDescription className="text-gray-200">
            Check if your personal information has been exposed
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <SearchFormTabs 
                form={form} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
              />
              
              {isLoggedIn ? (
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search Dark Web"}
                </Button>
              ) : (
                <Button 
                  type="button"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleSignInClick}
                >
                  Sign In to Search
                </Button>
              )}
            </form>
          </Form>
          
          <SearchHistory searchHistory={searchHistory} />
        </CardContent>
        
        <CardFooter className="flex flex-col border-t border-gray-700/50 pt-4">
          <SupportedServices />
        </CardFooter>
      </Card>

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={handleSignInModalClose} 
      />
    </>
  );
};

export default DarkWebSearchForm;
