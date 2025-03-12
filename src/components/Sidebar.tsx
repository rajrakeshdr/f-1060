
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Library, Layout, Crown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Layout, label: 'Spaces', path: '/spaces' },
    { icon: Library, label: 'Library', path: '/library' },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-[#2D2F3A] border-r border-gray-700/50 p-4 flex flex-col transition-all duration-300 z-30",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Toggle button */}
      <button 
        onClick={toggleSidebar} 
        className="absolute -right-3 top-16 bg-[#2D2F3A] border border-gray-700/50 rounded-full p-1 z-40"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    "text-gray-300 hover:text-white hover:bg-gray-700/50",
                    isActive && "text-white bg-[#6B46C1]",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Pro Button */}
      <div className={cn(
        "p-4 bg-gray-800/50 rounded-lg mt-4",
        collapsed && "p-2"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-2 mb-2">
            <Crown className="text-yellow-500" size={20} />
            <span className="font-medium text-white">Try Pro</span>
          </div>
        )}
        <button className={cn(
          "w-full px-4 py-2 text-sm text-white bg-[#6B46C1] rounded-lg hover:bg-[#5B3AAE] transition-colors",
          collapsed && "p-2"
        )}>
          {collapsed ? <Crown className="text-yellow-500 mx-auto" size={16} /> : "Learn More"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
