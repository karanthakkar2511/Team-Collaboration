import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import TaskManagement from './components/Tasks/TaskManagement';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;