import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiUser, FiBuilding, FiMail, FiPhone, FiGlobe, FiMapPin, FiDollarSign, FiClock, FiThermometer, FiLinkedin, FiCheck, FiX } = FiIcons;

const LeadDetails = ({ leads }) => {
  const { id } = useParams();
  const lead = leads.find(l => l.id === id);

  if (!lead) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lead Not Found</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const getScoreColor = (score) => {
    switch (score) {
      case 'hot': return 'bg-red-100 text-red-700 border-red-200';
      case 'warm': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'cold': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </motion.button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Lead Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {lead.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{lead.fullName}</h2>
                <p className="text-gray-600">{lead.companyName}</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full border ${getScoreColor(lead.score)}`}>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiThermometer} className="w-4 h-4" />
                <span className="font-semibold">{lead.score.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-800">{lead.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-800">{lead.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiGlobe} className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Website</p>
                  <p className="font-medium text-gray-800">{lead.website || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-800">{lead.location || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiBuilding} className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Service Interest</p>
                  <p className="font-medium text-gray-800">{lead.serviceInterest}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Budget Range</p>
                  <p className="font-medium text-gray-800">{lead.budgetRange || 'Not specified'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiClock} className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Timeframe</p>
                  <p className="font-medium text-gray-800">{lead.timeframe || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          {lead.additionalInfo && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Additional Information</p>
              <p className="text-gray-800">{lead.additionalInfo}</p>
            </div>
          )}
        </div>

        {/* Validation & Scoring */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Lead Validation</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Verified</span>
                <SafeIcon icon={lead.validation?.emailVerified ? FiCheck : FiX} 
                         className={`w-5 h-5 ${lead.validation?.emailVerified ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Company Verified</span>
                <SafeIcon icon={lead.validation?.companyVerified ? FiCheck : FiX} 
                         className={`w-5 h-5 ${lead.validation?.companyVerified ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">LinkedIn Found</span>
                <SafeIcon icon={lead.validation?.linkedinFound ? FiCheck : FiX} 
                         className={`w-5 h-5 ${lead.validation?.linkedinFound ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Social Media</span>
                <SafeIcon icon={lead.validation?.socialMediaFound ? FiCheck : FiX} 
                         className={`w-5 h-5 ${lead.validation?.socialMediaFound ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Scoring Factors</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Company Size</span>
                <span className="text-sm font-medium">{lead.scoring?.companySize || 0}/20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Budget Range</span>
                <span className="text-sm font-medium">{lead.scoring?.budgetScore || 0}/25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Urgency</span>
                <span className="text-sm font-medium">{lead.scoring?.urgencyScore || 0}/20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Validation</span>
                <span className="text-sm font-medium">{lead.scoring?.validationScore || 0}/35</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-800">Total Score</span>
                  <span className="text-gray-800">{lead.scoring?.totalScore || 0}/100</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Follow-up Email
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Schedule Call
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Export Lead Data
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;