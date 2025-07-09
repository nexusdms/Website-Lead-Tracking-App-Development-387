import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiUsers, FiEye, FiCode, FiTarget } = FiIcons;

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/form', icon: FiUsers, label: 'Lead Form' },
    { path: '/visitors', icon: FiEye, label: 'Visitor Tracking' },
    { path: '/embed', icon: FiCode, label: 'Embed Code' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiTarget} className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Lead Tracker Pro</h1>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;