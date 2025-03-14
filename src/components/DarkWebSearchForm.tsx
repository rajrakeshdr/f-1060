
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import TransitionEffect from './TransitionEffect';
import { supabase } from "@/integrations/supabase/client";

// Define the schema for the form
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  fullName: z.string().optional(),
});

interface UserProfile {
  email?: string;
  phone?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  address?: string;
}

interface DarkWebSearchFormProps {
  userProfile?: UserProfile | null;
}

const DarkWebSearchForm: React.FC<DarkWebSearchFormProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchHistory, setSearchHistory] = useState<any[]>([]);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
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
      }
    };
    
    checkSession();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

  return (
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
            <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full mb-4 bg-gray-700/70">
                <TabsTrigger value="email" className="flex-1 data-[state=active]:bg-purple-700">Email</TabsTrigger>
                <TabsTrigger value="phone" className="flex-1 data-[state=active]:bg-purple-700">Phone</TabsTrigger>
                <TabsTrigger value="username" className="flex-1 data-[state=active]:bg-purple-700">Username</TabsTrigger>
                <TabsTrigger value="fullName" className="flex-1 data-[state=active]:bg-purple-700">Full Name</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} className="bg-gray-700/50 border-gray-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} className="bg-gray-700/50 border-gray-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="username" className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="your_username" {...field} className="bg-gray-700/50 border-gray-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="fullName" className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-gray-700/50 border-gray-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search Dark Web"}
            </Button>
          </form>
        </Form>
        
        {searchHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2 text-gray-300">Recent Searches</h3>
            <div className="space-y-2 max-h-[150px] overflow-y-auto">
              {searchHistory.slice(0, 5).map((search, index) => (
                <div key={index} className="p-2 bg-gray-700/50 rounded-md text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium">{search.type}: {search.query}</span>
                    <span className="text-gray-400">{new Date(search.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-400 mt-1">
                    Found {search.results.length} breach{search.results.length !== 1 ? 'es' : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col border-t border-gray-700/50 pt-4">
        <h3 className="text-sm font-medium mb-2 w-full">Supported Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 w-full">
          {[
            "Firefox Monitor",
            "Have I Been Pwned?",
            "Dehashed",
            "Aura",
            "Identity Guard",
            "Intelligence X",
            "Dashlane"
          ].map((service, index) => (
            <div key={index} className="p-2 bg-gray-700/50 border border-gray-600/50 rounded-md text-xs text-center hover:bg-gray-600/50 transition-colors">
              <span className="font-medium">{service}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DarkWebSearchForm;
