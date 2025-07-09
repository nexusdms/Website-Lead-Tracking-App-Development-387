import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiBuilding, FiMail, FiPhone, FiGlobe, FiMapPin, FiDollarSign, FiClock, FiMessageSquare, FiLoader } = FiIcons;

const LeadForm = ({ onSubmit, embedded = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    serviceInterest: '',
    budgetRange: '',
    timeframe: '',
    additionalInfo: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const serviceOptions = [
    'Web Development',
    'Mobile App Development',
    'Digital Marketing',
    'SEO Services',
    'Content Creation',
    'E-commerce Solutions',
    'Consulting',
    'Other'
  ];

  const budgetOptions = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    'Over $100,000'
  ];

  const timeframeOptions = [
    'ASAP',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    '1+ years'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
      setSuccess(true);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        website: '',
        location: '',
        serviceInterest: '',
        budgetRange: '',
        timeframe: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${embedded ? 'p-6' : 'max-w-2xl mx-auto'} bg-white rounded-xl shadow-sm border border-gray-100 text-center`}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiUser} className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">We've received your information and will be in touch soon.</p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Another Lead
        </button>
      </motion.div>
    );
  }

  return (
    <div className={embedded ? '' : 'max-w-2xl mx-auto'}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Get Your Free Quote</h2>
          <p className="text-gray-600">Tell us about your project and we'll get back to you within 24 hours</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiUser} className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiBuilding} className="w-4 h-4 inline mr-2" />
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Acme Corp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiMail} className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@acmecorp.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiPhone} className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiGlobe} className="w-4 h-4 inline mr-2" />
                Company Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://acmecorp.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 inline mr-2" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="New York, NY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service of Interest *
              </label>
              <select
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a service</option>
                {serviceOptions.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiDollarSign} className="w-4 h-4 inline mr-2" />
                Budget Range
              </label>
              <select
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select budget range</option>
                {budgetOptions.map(budget => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiClock} className="w-4 h-4 inline mr-2" />
                Project Timeframe
              </label>
              <select
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select timeframe</option>
                {timeframeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiMessageSquare} className="w-4 h-4 inline mr-2" />
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us more about your project..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Get Free Quote</span>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;