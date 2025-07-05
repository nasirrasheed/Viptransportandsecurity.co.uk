import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminLogin from '../components/admin/AdminLogin';
import AdminLayout from '../components/admin/AdminLayout';
import FleetManagement from '../components/admin/FleetManagement';
import ServicesManagement from '../components/admin/ServicesManagement';

const Admin: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('fleet');

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'fleet':
        return <FleetManagement />;
      case 'services':
        return <ServicesManagement />;
      default:
        return <FleetManagement />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default Admin;