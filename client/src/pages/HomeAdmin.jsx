import React from 'react';

import Sidebar from '../components/AdminDashboard/AdminSideBar';
import Dashboard from '../components/AdminDashboard/Dashboard';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-lms-bg">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardLayout;
