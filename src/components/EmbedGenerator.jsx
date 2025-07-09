import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCode, FiCopy, FiCheck, FiSettings, FiEye } = FiIcons;

const EmbedGenerator = () => {
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    theme: 'light',
    position: 'bottom-right',
    title: 'Get Your Free Quote',
    subtitle: 'Tell us about your project',
    primaryColor: '#3b82f6',
    showVisitorTracking: true
  });

  const generateEmbedCode = () => {
    const baseUrl = window.location.origin;
    
    return `<!-- Lead Tracker Pro Embed Code -->
<script>
(function() {
  var leadTrackerConfig = ${JSON.stringify(config, null, 2)};
  
  // Load CSS
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '${baseUrl}/embed/leadtracker.css';
  document.head.appendChild(css);
  
  // Load JavaScript
  var script = document.createElement('script');
  script.src = '${baseUrl}/embed/leadtracker.js';
  script.async = true;
  script.onload = function() {
    if (typeof LeadTracker !== 'undefined') {
      LeadTracker.init(leadTrackerConfig);
    }
  };
  document.head.appendChild(script);
})();
</script>

<!-- WordPress Plugin Alternative -->
<!-- 
Add this to your functions.php:

function enqueue_lead_tracker() {
  wp_enqueue_script('lead-tracker', '${baseUrl}/embed/leadtracker.js', array(), '1.0.0', true);
  wp_enqueue_style('lead-tracker', '${baseUrl}/embed/leadtracker.css', array(), '1.0.0');
  
  wp_localize_script('lead-tracker', 'leadTrackerConfig', ${JSON.stringify(config, null, 2)});
}
add_action('wp_enqueue_scripts', 'enqueue_lead_tracker');
-->`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Embed Code Generator</h1>
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiCode} className="w-6 h-6 text-blue-600" />
          <span className="text-sm text-gray-600">WordPress & HTML Compatible</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <SafeIcon icon={FiSettings} className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Configuration</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={config.theme}
                onChange={(e) => handleConfigChange('theme', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <select
                value={config.position}
                onChange={(e) => handleConfigChange('position', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
                <option value="inline">Inline</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Form Title</label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => handleConfigChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={config.subtitle}
                onChange={(e) => handleConfigChange('subtitle', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.showVisitorTracking}
                  onChange={(e) => handleConfigChange('showVisitorTracking', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Enable Visitor Tracking</span>
              </label>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <SafeIcon icon={FiEye} className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 min-h-[300px] relative">
            <div className="text-center text-gray-500 text-sm mb-4">Website Preview</div>
            
            {config.position === 'inline' ? (
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">{config.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{config.subtitle}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded col-span-2"></div>
                </div>
                <div 
                  className="mt-4 py-2 px-4 rounded text-white text-sm text-center"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  Get Quote
                </div>
              </div>
            ) : (
              <div 
                className={`absolute w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white ${
                  config.position.includes('bottom') ? 'bottom-4' : 'top-4'
                } ${
                  config.position.includes('right') ? 'right-4' : 'left-4'
                }`}
                style={{ backgroundColor: config.primaryColor }}
              >
                <SafeIcon icon={FiCode} className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Generated Embed Code</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <SafeIcon icon={copied ? FiCheck : FiCopy} className="w-4 h-4" />
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </motion.button>
          </div>
        </div>
        <div className="p-6">
          <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto">
            <code>{generateEmbedCode()}</code>
          </pre>
        </div>
      </div>

      {/* Integration Instructions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Integration Instructions</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800">WordPress Integration</h3>
            <p className="text-sm text-gray-600 mt-1">
              Copy the code above and paste it into your theme's functions.php file, or use the WordPress plugin code provided in the comments.
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-gray-800">HTML Website Integration</h3>
            <p className="text-sm text-gray-600 mt-1">
              Copy the JavaScript code and paste it just before the closing &lt;/body&gt; tag in your HTML pages.
            </p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold text-gray-800">Features Included</h3>
            <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
              <li>Automatic visitor tracking and IP detection</li>
              <li>Lead form with intelligent scoring</li>
              <li>Social media validation (LinkedIn, company info)</li>
              <li>Real-time lead qualification (Hot/Warm/Cold)</li>
              <li>Mobile-responsive design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedGenerator;