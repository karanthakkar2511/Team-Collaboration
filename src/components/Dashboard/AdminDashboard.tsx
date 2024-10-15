import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { Users, BarChart2, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user?.role !== 'admin') {
    return <div className="flex items-center justify-center h-screen">Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white border rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Welcome, Admin <span className="text-indigo-600">{user.username}!</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  to="/admin/users"
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center">
                    <Users className="w-10 h-10 text-indigo-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">User Management</h3>
                    <p className="text-gray-500 mt-2 text-center">
                      Manage users and permissions
                    </p>
                  </div>
                </Link>
                <Link
                  to="/admin/analytics"
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center">
                    <BarChart2 className="w-10 h-10 text-green-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">Analytics</h3>
                    <p className="text-gray-500 mt-2 text-center">
                      View system analytics and reports
                    </p>
                  </div>
                </Link>
                <Link
                  to="/admin/settings"
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center">
                    <Settings className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">System Settings</h3>
                    <p className="text-gray-500 mt-2 text-center">
                      Configure system settings
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
