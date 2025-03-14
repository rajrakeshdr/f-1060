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
  username?: string;
}

const DarkWebSearchForm = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      username: "",
      fullName: "",
    },
  });

  // Check if user is logged in and fetch profile data
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsLoggedIn(true);
        
        // Fetch user profile if logged in
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const email = user.email || "";
          
          // Extract name from user metadata if available
          const fullName = user.user_metadata?.full_name || 
                          user.user_metadata?.name || 
                          "";
          
          // Set the user profile data
          setUserProfile({
            email,
            fullName,
            // Other fields would need to be fetched from a profiles table
          });
          
          // Update form values with user profile data
          form.setValue("email", email);
          form.setValue("fullName", fullName);
        }
      }
    };
    
    checkSession();
  }, [form]);

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
      const searchHistory = JSON.parse(localStorage.getItem('darkWebSearchHistory') || '[]');
      searchHistory.push({
        query: activeTab === 'email' ? values.email : 
               activeTab === 'phone' ? values.phone : 
               activeTab === 'username' ? values.username : values.fullName,
        type: activeTab,
        timestamp: new Date().toISOString(),
        results: mockResults
      });
      localStorage.setItem('darkWebSearchHistory', JSON.stringify(searchHistory));
      
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
    <TransitionEffect animation="fade-up" delay={100}>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Dark Web Breach Search</CardTitle>
          <CardDescription>
            Check if your personal information has been exposed in known data breaches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoggedIn && userProfile && (
            <div className="mb-6 p-4 bg-purple-900/20 rounded-lg border border-purple-600/30">
              <h3 className="text-lg font-medium mb-2 text-purple-300">Logged in as:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {userProfile.email && (
                  <div>
                    <span className="text-gray-400 text-sm">Email:</span>
                    <p className="font-medium">{userProfile.email}</p>
                  </div>
                )}
                {userProfile.fullName && (
                  <div>
                    <span className="text-gray-400 text-sm">Name:</span>
                    <p className="font-medium">{userProfile.fullName}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="email" className="flex-1">Email</TabsTrigger>
                  <TabsTrigger value="phone" className="flex-1">Phone</TabsTrigger>
                  <TabsTrigger value="username" className="flex-1">Username</TabsTrigger>
                  <TabsTrigger value="fullName" className="flex-1">Full Name</TabsTrigger>
                </TabsList>
                
                <TabsContent value="email" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
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
                          <Input placeholder="+1 (555) 123-4567" {...field} />
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
                          <Input placeholder="your_username" {...field} />
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
                          <Input placeholder="John Doe" {...field} />
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
        </CardContent>
        
        {searchResults.length > 0 && (
          <CardFooter className="flex flex-col">
            <h3 className="text-xl font-medium mb-4 text-red-400">Search Results</h3>
            <div className="space-y-4 w-full">
              {searchResults.map((result, index) => (
                <div key={index} className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">{result.source}</span>
                    <span className="text-sm text-gray-400">{result.breachDate}</span>
                  </div>
                  <p className="text-gray-300">{result.description}</p>
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      result.severity === 'high' ? 'bg-red-600/30 text-red-300' : 
                      result.severity === 'medium' ? 'bg-amber-600/30 text-amber-300' :
                      'bg-blue-600/30 text-blue-300'
                    }`}>
                      {result.severity.toUpperCase()} RISK
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
      
      <div className="mt-8 max-w-3xl mx-auto">
        <h3 className="text-xl font-medium mb-4">Supported Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            "Firefox Monitor",
            "Aura",
            "Identity Guard",
            "Have I Been Pwned?",
            "MyPwd from Axur",
            "Dehashed",
            "Hashcast from Azur",
            "Intelligence X",
            "Dashlane",
            "IDStrong"
          ].map((service, index) => (
            <div key={index} className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-center hover:bg-gray-700/50 transition-colors">
              <span className="text-sm font-medium">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </TransitionEffect>
  );
};

export default DarkWebSearchForm;
