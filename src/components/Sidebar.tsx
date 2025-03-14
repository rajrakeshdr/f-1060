import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Library, Layout, ChevronLeft, ChevronRight, Building, Plus, Search } from 'lucide-react';
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true); // Default collapsed
  const [organizations, setOrganizations] = useState([
    { name: "Personal" }
  ]);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Layout, label: 'Spaces', path: '/spaces' },
    { icon: Library, label: 'Library', path: '/library' },
    { icon: Search, label: 'Dark Web Search', path: '/dark-web-search' },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const addOrganization = () => {
    // In a real app, this would open a modal or form
    const newOrg = { name: `Organization ${organizations.length + 1}` };
    setOrganizations([...organizations, newOrg]);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-[#2D2F3A] border-r border-gray-700/50 p-4 flex flex-col transition-all duration-300 z-30",
      collapsed ? "w-20" : "w-64"
    )}>
      <button 
        onClick={toggleSidebar} 
        className="absolute -right-3 top-16 bg-[#2D2F3A] border border-gray-700/50 rounded-full p-1 z-40"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <div className="mb-6">
        {!collapsed && (
          <div className="flex items-center justify-between mb-2 px-4">
            <h3 className="text-sm font-medium text-gray-400">Organizations</h3>
            <button 
              onClick={addOrganization}
              className="text-gray-400 hover:text-white"
              aria-label="Add organization"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
        <ul className="space-y-1">
          {organizations.map((org, index) => (
            <li key={index}>
              <button
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors w-full text-left",
                  "text-gray-300 hover:text-white hover:bg-gray-700/50",
                  collapsed && "justify-center px-2"
                )}
              >
                <Building size={20} />
                {!collapsed && <span>{org.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

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
    </aside>
  );
};

export default Sidebar;
