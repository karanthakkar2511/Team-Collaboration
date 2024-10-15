import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { CheckSquare, MessageSquare, User } from 'lucide-react';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white border rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Welcome, <span className="text-indigo-600">{user?.username}!</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  to="/tasks"
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center">
                    <CheckSquare className="w-10 h-10 text-indigo-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">Tasks</h3>
                    <p className="text-gray-500 mt-2 text-center">Manage your tasks and projects</p>
                  </div>
                </Link>
                <Link
                  to="/chat"
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center">
                    <MessageSquare className="w-10 h-10 text-green-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">Chat</h3>
                    <p className="text-gray-500 mt-2 text-center">Communicate with your team</p>
                  </div>
                </Link>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col items-center">
                    <User className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">Profile</h3>
                    <p className="text-gray-500 mt-2 text-center">View and edit your profile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
