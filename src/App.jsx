import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Dashboard from './components/Dashboard';
import LeadForm from './components/LeadForm';
import VisitorTracker from './components/VisitorTracker';
import EmbedGenerator from './components/EmbedGenerator';
import LeadDetails from './components/LeadDetails';
import Navigation from './components/Navigation';
import { leadService } from './services/leadService';
import { visitorService } from './services/visitorService';

function App() {
  const [leads, setLeads] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [leadsData, visitorsData] = await Promise.all([
        leadService.getLeads(),
        visitorService.getVisitors()
      ]);
      setLeads(leadsData);
      setVisitors(visitorsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewLead = async (leadData) => {
    try {
      const newLead = await leadService.createLead(leadData);
      setLeads(prev => [newLead, ...prev]);
      return newLead;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard leads={leads} visitors={visitors} />} />
            <Route path="/form" element={<LeadForm onSubmit={handleNewLead} />} />
            <Route path="/visitors" element={<VisitorTracker visitors={visitors} />} />
            <Route path="/embed" element={<EmbedGenerator />} />
            <Route path="/lead/:id" element={<LeadDetails leads={leads} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;