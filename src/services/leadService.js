import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { validationService } from './validationService';
import { scoringService } from './scoringService';

class LeadService {
  constructor() {
    this.leads = this.loadLeads();
  }

  loadLeads() {
    const stored = localStorage.getItem('leadTracker_leads');
    return stored ? JSON.parse(stored) : [];
  }

  saveLeads() {
    localStorage.setItem('leadTracker_leads', JSON.stringify(this.leads));
  }

  async createLead(leadData) {
    const lead = {
      id: uuidv4(),
      ...leadData,
      createdAt: format(new Date(), 'MMM dd, yyyy'),
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    // Validate the lead
    const validation = await validationService.validateLead(lead);
    lead.validation = validation;

    // Score the lead
    const scoring = scoringService.scoreLead(lead, validation);
    lead.scoring = scoring;
    lead.score = scoring.category;

    this.leads.unshift(lead);
    this.saveLeads();
    
    return lead;
  }

  async getLeads() {
    return this.leads;
  }

  async getLeadById(id) {
    return this.leads.find(lead => lead.id === id);
  }

  async updateLead(id, updates) {
    const index = this.leads.findIndex(lead => lead.id === id);
    if (index !== -1) {
      this.leads[index] = { ...this.leads[index], ...updates };
      this.saveLeads();
      return this.leads[index];
    }
    return null;
  }

  async deleteLead(id) {
    const index = this.leads.findIndex(lead => lead.id === id);
    if (index !== -1) {
      this.leads.splice(index, 1);
      this.saveLeads();
      return true;
    }
    return false;
  }
}

export const leadService = new LeadService();