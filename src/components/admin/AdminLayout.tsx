import React, { useState } from 'react';
import { Crown, Car, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const menuItems = [
    { id: 'fleet', label: 'Fleet Management', icon: <Car size={20} /> },
    { id: 'services', label: 'Services Management', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-yellow-400" />
            <div>
              <div className="font-playfair text-lg font-bold">VIP Transport</div>
              <div className="text-yellow-400 text-xs font-montserrat">Admin Panel</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left font-montserrat transition-colors ${
                activeTab === item.id
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <div className="mb-4">
            <p className="font-montserrat text-sm text-gray-400">Logged in as:</p>
            <p className="font-montserrat text-sm text-white truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-montserrat text-sm transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h1 className="font-playfair text-2xl font-semibold">
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <div className="hidden lg:block">
              <span className="font-montserrat text-sm text-gray-400">
                Welcome back, Admin
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;