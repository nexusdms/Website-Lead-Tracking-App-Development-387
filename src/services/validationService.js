import axios from 'axios';

class ValidationService {
  async validateLead(lead) {
    const validation = {
      emailVerified: false,
      companyVerified: false,
      linkedinFound: false,
      socialMediaFound: false,
      websiteActive: false,
      companySize: 'unknown',
      industry: 'unknown'
    };

    try {
      // Email validation
      validation.emailVerified = await this.validateEmail(lead.email);
      
      // Company validation
      if (lead.companyName) {
        validation.companyVerified = await this.validateCompany(lead.companyName);
      }
      
      // Website validation
      if (lead.website) {
        validation.websiteActive = await this.validateWebsite(lead.website);
      }
      
      // LinkedIn search
      validation.linkedinFound = await this.searchLinkedIn(lead.fullName, lead.companyName);
      
      // Social media search
      validation.socialMediaFound = await this.searchSocialMedia(lead.fullName, lead.companyName);
      
      // Company size estimation
      validation.companySize = await this.estimateCompanySize(lead.companyName, lead.website);
      
    } catch (error) {
      console.error('Validation error:', error);
    }

    return validation;
  }

  async validateEmail(email) {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    // Check for common disposable email domains
    const disposableDomains = [
      'tempmail.org', '10minutemail.com', 'guerrillamail.com',
      'mailinator.com', 'throwaway.email'
    ];
    
    const domain = email.split('@')[1];
    if (disposableDomains.includes(domain)) {
      return false;
    }

    // Simulate email verification (in real app, use email verification service)
    return Math.random() > 0.2; // 80% chance of being valid
  }

  async validateCompany(companyName) {
    try {
      // Simulate company validation using various APIs
      // In real implementation, use services like:
      // - Clearbit Company API
      // - LinkedIn Company Search
      // - Google Knowledge Graph
      
      const companyKeywords = [
        'inc', 'corp', 'llc', 'ltd', 'company', 'co', 'group',
        'solutions', 'services', 'technologies', 'systems'
      ];
      
      const hasCompanyKeyword = companyKeywords.some(keyword => 
        companyName.toLowerCase().includes(keyword)
      );
      
      return hasCompanyKeyword && Math.random() > 0.3; // 70% chance if has keywords
    } catch (error) {
      return false;
    }
  }

  async validateWebsite(website) {
    try {
      // Simulate website validation
      // In real implementation, check if website is reachable
      const response = await fetch(website, { 
        method: 'HEAD', 
        mode: 'no-cors',
        timeout: 5000 
      });
      return true; // Assume valid if no error
    } catch (error) {
      return false;
    }
  }

  async searchLinkedIn(fullName, companyName) {
    try {
      // Simulate LinkedIn search
      // In real implementation, use LinkedIn API or web scraping
      const nameScore = fullName.split(' ').length >= 2 ? 0.3 : 0.1;
      const companyScore = companyName ? 0.4 : 0;
      const randomScore = Math.random() * 0.3;
      
      return (nameScore + companyScore + randomScore) > 0.5;
    } catch (error) {
      return false;
    }
  }

  async searchSocialMedia(fullName, companyName) {
    try {
      // Simulate social media search across platforms
      // In real implementation, search Twitter, Facebook, Instagram APIs
      const platforms = ['twitter', 'facebook', 'instagram'];
      let found = 0;
      
      for (const platform of platforms) {
        if (Math.random() > 0.6) { // 40% chance per platform
          found++;
        }
      }
      
      return found > 0;
    } catch (error) {
      return false;
    }
  }

  async estimateCompanySize(companyName, website) {
    try {
      // Simulate company size estimation
      // In real implementation, use services like:
      // - Clearbit Company API
      // - ZoomInfo
      // - Apollo.io
      
      const sizeIndicators = {
        'enterprise': ['microsoft', 'google', 'amazon', 'apple', 'facebook'],
        'large': ['corp', 'corporation', 'group', 'international'],
        'medium': ['inc', 'llc', 'solutions', 'services'],
        'small': ['consulting', 'studio', 'agency']
      };
      
      const companyLower = companyName.toLowerCase();
      
      for (const [size, indicators] of Object.entries(sizeIndicators)) {
        if (indicators.some(indicator => companyLower.includes(indicator))) {
          return size;
        }
      }
      
      return 'small'; // Default assumption
    } catch (error) {
      return 'unknown';
    }
  }
}

export const validationService = new ValidationService();