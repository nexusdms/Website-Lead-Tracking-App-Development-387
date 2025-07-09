import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiEye, FiTrendingUp, FiTarget, FiThermometer, FiClock } = FiIcons;

const Dashboard = ({ leads, visitors }) => {
  const hotLeads = leads.filter(lead => lead.score === 'hot').length;
  const warmLeads = leads.filter(lead => lead.score === 'warm').length;
  const coldLeads = leads.filter(lead => lead.score === 'cold').length;

  const stats = [
    { 
      title: 'Total Leads', 
      value: leads.length, 
      icon: FiUsers, 
      color: 'bg-blue-500',
      change: '+12%'
    },
    { 
      title: 'Hot Leads', 
      value: hotLeads, 
      icon: FiThermometer, 
      color: 'bg-red-500',
      change: '+8%'
    },
    { 
      title: 'Warm Leads', 
      value: warmLeads, 
      icon: FiTrendingUp, 
      color: 'bg-orange-500',
      change: '+5%'
    },
    { 
      title: 'Website Visitors', 
      value: visitors.length, 
      icon: FiEye, 
      color: 'bg-green-500',
      change: '+15%'
    },
  ];

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <Link to="/form">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiTarget} className="w-4 h-4" />
            <span>New Lead</span>
          </motion.button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Recent Leads</h2>
        </div>
        <div className="p-6">
          {recentLeads.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No leads yet. Create your first lead!</p>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <Link key={lead.id} to={`/lead/${lead.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {lead.fullName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{lead.fullName}</h3>
                        <p className="text-sm text-gray-600">{lead.companyName}</p>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.score === 'hot' 
                          ? 'bg-red-100 text-red-700' 
                          : lead.score === 'warm' 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {lead.score.toUpperCase()}
                      </span>
                      <div className="flex items-center text-gray-500">
                        <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                        <span className="text-sm">{lead.createdAt}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;