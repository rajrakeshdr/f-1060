
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import TransitionEffect from './TransitionEffect';

type CollapsiblePanelProps = {
  className?: string;
  children?: React.ReactNode;
};

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({ 
  className,
  children 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const togglePanel = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative h-full">
      {/* Toggle button */}
      <button
        onClick={togglePanel}
        className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
        aria-label={isCollapsed ? "Expand panel" : "Collapse panel"}
      >
        {isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Panel */}
      <div
        className={cn(
          "h-full transition-all duration-300 ease-in-out bg-gray-800/50 backdrop-blur-sm border-l border-gray-700/50",
          isCollapsed ? "w-0 opacity-0" : "w-64 opacity-100",
          className
        )}
      >
        <TransitionEffect animation="fade-in" delay={100}>
          <div className={cn("p-4 h-full overflow-auto", isCollapsed ? "hidden" : "block")}>
            {children || (
              <div className="flex flex-col gap-4 h-full">
                <h3 className="text-lg font-medium">Panel Contents</h3>
                <p className="text-sm text-gray-400">
                  This is a collapsible panel that can be used to display additional information or controls.
                </p>
              </div>
            )}
          </div>
        </TransitionEffect>
      </div>
    </div>
  );
};

export default CollapsiblePanel;
