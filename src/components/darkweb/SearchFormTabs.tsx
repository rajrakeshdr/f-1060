
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

// Define the schema for the form
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  fullName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SearchFormTabsProps {
  form: UseFormReturn<FormValues>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SearchFormTabs = ({ form, activeTab, setActiveTab }: SearchFormTabsProps) => {
  return (
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
  );
};

export { SearchFormTabs, formSchema };
export type { FormValues };
