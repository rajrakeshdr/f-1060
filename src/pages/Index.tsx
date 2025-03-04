
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SearchSection from '@/components/SearchSection';
import SampleQueries from '@/components/SampleQueries';
import CollapsiblePanel from '@/components/CollapsiblePanel';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-[#1a1c2e] text-white relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="w-full h-full grid grid-cols-12 grid-rows-[repeat(30,1fr)]">
          {Array.from({ length: 12 * 30 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-gray-500/20"></div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex h-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <NavBar />
          <div className="flex-1 overflow-auto">
            <Hero />
            <SearchSection />
            <SampleQueries />
            <Footer />
          </div>
        </div>
        
        {/* Collapsible Panel */}
        <CollapsiblePanel>
          <h3 className="text-lg font-medium mb-4">Resources</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-700/30 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
              <h4 className="font-medium">Documentation</h4>
              <p className="text-sm text-gray-400">Access guides and API references</p>
            </div>
            <div className="p-3 bg-gray-700/30 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
              <h4 className="font-medium">Examples</h4>
              <p className="text-sm text-gray-400">See code samples and demos</p>
            </div>
            <div className="p-3 bg-gray-700/30 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
              <h4 className="font-medium">Community</h4>
              <p className="text-sm text-gray-400">Join forums and discussions</p>
            </div>
          </div>
        </CollapsiblePanel>
      </div>
    </div>
  );
};

export default Index;
