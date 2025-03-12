
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Library, Layout, Crown } from 'lucide-react';
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Layout, label: 'Spaces', path: '/spaces' },
    { icon: Library, label: 'Library', path: '/library' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#2D2F3A] border-r border-gray-700/50 p-4 flex flex-col">
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
                    isActive && "text-white bg-[#6B46C1]"
                  )}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Pro Button */}
      <div className="p-4 bg-gray-800/50 rounded-lg mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="text-yellow-500" size={20} />
          <span className="font-medium text-white">Try Pro</span>
        </div>
        <button className="w-full px-4 py-2 text-sm text-white bg-[#6B46C1] rounded-lg hover:bg-[#5B3AAE] transition-colors">
          Learn More
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
