
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "@/components/darkweb/SearchFormTabs";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, SearchResult, SearchHistoryItem } from "@/types/darkWebSearch";

export function useDarkWebSearch(userProfile?: UserProfile | null) {
  const [activeTab, setActiveTab] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userProfile?.email || "",
      phone: userProfile?.phone || "",
      username: userProfile?.username || "",
      fullName: userProfile?.fullName || 
                (userProfile?.firstName && userProfile?.lastName) ? 
                `${userProfile.firstName} ${userProfile.lastName}` : "",
    },
  });

  // Update form values when userProfile changes
  useEffect(() => {
    if (userProfile) {
      form.setValue("email", userProfile.email || "");
      form.setValue("phone", userProfile.phone || "");
      form.setValue("username", userProfile.username || "");
      form.setValue("fullName", 
        userProfile.fullName || 
        ((userProfile.firstName && userProfile.lastName) ? 
        `${userProfile.firstName} ${userProfile.lastName}` : "")
      );
    }
  }, [userProfile, form]);

  // Check if user is logged in and fetch search history
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsLoggedIn(true);
        
        // Load search history from localStorage
        const savedHistory = localStorage.getItem('darkWebSearchHistory');
        if (savedHistory) {
          setSearchHistory(JSON.parse(savedHistory));
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsLoggedIn(true);
        // Reload the current page to refresh user data
        window.location.reload();
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        // Clear form values when signed out
        form.reset({
          email: "",
          phone: "",
          username: "",
          fullName: ""
        });
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [form]);

  const onSubmit = async (values: FormValues) => {
    if (!isLoggedIn) {
      // Prompt user to sign in
      setIsSignInModalOpen(true);
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real application, this would call an API to search dark web for breaches
      // For demo purposes, we'll simulate a search result
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock search results
      const mockResults = [
        {
          source: "Have I Been Pwned",
          breachDate: "2023-07-15",
          description: "Your information was found in a data breach containing email addresses and passwords.",
          severity: "high"
        },
        {
          source: "DarkWeb Monitor",
          breachDate: "2022-11-03",
          description: "Your email was found in a list being shared on dark web forums.",
          severity: "medium"
        }
      ];
      
      setSearchResults(mockResults);
      
      // Save search to history
      const newSearch = {
        query: activeTab === 'email' ? values.email : 
               activeTab === 'phone' ? values.phone : 
               activeTab === 'username' ? values.username : values.fullName,
        type: activeTab,
        timestamp: new Date().toISOString(),
        results: mockResults
      };
      
      const updatedHistory = [newSearch, ...searchHistory];
      setSearchHistory(updatedHistory);
      localStorage.setItem('darkWebSearchHistory', JSON.stringify(updatedHistory));
      
      toast({
        title: "Search Complete",
        description: `We found ${mockResults.length} matches for your information.`,
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Failed to complete the search. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    activeTab,
    setActiveTab,
    isLoading,
    isLoggedIn,
    searchHistory,
    isSignInModalOpen,
    setIsSignInModalOpen,
    onSubmit
  };
}
