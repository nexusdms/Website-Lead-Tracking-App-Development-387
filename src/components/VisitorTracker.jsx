import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEye, FiMapPin, FiClock, FiGlobe, FiMonitor, FiSearch } = FiIcons;

const VisitorTracker = ({ visitors }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.userAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.referrer.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'today') {
      const today = new Date().toDateString();
      return matchesSearch && new Date(visitor.timestamp).toDateString() === today;
    }
    return matchesSearch;
  });

  const totalVisitors = visitors.length;
  const uniqueVisitors = new Set(visitors.map(v => v.ipAddress)).size;
  const todayVisitors = visitors.filter(v => 
    new Date(v.timestamp).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Visitor Tracking</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search visitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Visitors</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{totalVisitors}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <SafeIcon icon={FiEye} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Unique Visitors</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{uniqueVisitors}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <SafeIcon icon={FiGlobe} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Today's Visitors</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{todayVisitors}</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
              <SafeIcon icon={FiClock} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Visitors List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Recent Visitors</h2>
        </div>
        <div className="p-6">
          {filteredVisitors.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No visitors found matching your criteria.</p>
          ) : (
            <div className="space-y-4">
              {filteredVisitors.map((visitor) => (
                <motion.div
                  key={visitor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiEye} className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-800">{visitor.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <SafeIcon icon={FiGlobe} className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{visitor.ipAddress}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <SafeIcon icon={FiMonitor} className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{visitor.device}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{visitor.timestamp}</p>
                    <p className="text-sm text-gray-600 mt-1">{visitor.pageVisited}</p>
                    {visitor.referrer && (
                      <p className="text-xs text-gray-500 mt-1">From: {visitor.referrer}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorTracker;