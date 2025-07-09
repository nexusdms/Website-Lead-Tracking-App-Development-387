import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

class VisitorService {
  constructor() {
    this.visitors = this.loadVisitors();
    this.initializeTracking();
  }

  loadVisitors() {
    const stored = localStorage.getItem('leadTracker_visitors');
    return stored ? JSON.parse(stored) : [];
  }

  saveVisitors() {
    localStorage.setItem('leadTracker_visitors', JSON.stringify(this.visitors));
  }

  initializeTracking() {
    // Track current visitor if not already tracked
    if (typeof window !== 'undefined') {
      this.trackCurrentVisitor();
    }
  }

  async trackCurrentVisitor() {
    try {
      const visitorData = await this.gatherVisitorData();
      const existingVisitor = this.visitors.find(v => 
        v.ipAddress === visitorData.ipAddress && 
        v.userAgent === visitorData.userAgent
      );

      if (!existingVisitor) {
        this.trackVisitor(visitorData);
      }
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  }

  async gatherVisitorData() {
    const data = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      referrer: document.referrer,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };

    // Get IP address and location
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      data.ipAddress = ipData.ip;

      // Get location data
      const locationResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
      const locationData = await locationResponse.json();
      data.location = `${locationData.city}, ${locationData.region}, ${locationData.country_name}`;
      data.country = locationData.country_name;
      data.city = locationData.city;
    } catch (error) {
      data.ipAddress = 'Unknown';
      data.location = 'Unknown';
    }

    // Parse user agent for device info
    data.device = this.parseUserAgent(data.userAgent);

    return data;
  }

  parseUserAgent(userAgent) {
    const ua = userAgent.toLowerCase();
    
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      return 'Mobile';
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  }

  trackVisitor(visitorData) {
    const visitor = {
      id: uuidv4(),
      ...visitorData,
      timestamp: format(new Date(), 'MMM dd, yyyy HH:mm'),
      pageVisited: this.getPageName(visitorData.url)
    };

    this.visitors.unshift(visitor);
    
    // Keep only last 1000 visitors
    if (this.visitors.length > 1000) {
      this.visitors = this.visitors.slice(0, 1000);
    }
    
    this.saveVisitors();
    return visitor;
  }

  getPageName(url) {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      
      if (pathname === '/') return 'Home';
      if (pathname.includes('/about')) return 'About';
      if (pathname.includes('/services')) return 'Services';
      if (pathname.includes('/contact')) return 'Contact';
      if (pathname.includes('/blog')) return 'Blog';
      
      return pathname.split('/').pop() || 'Unknown';
    } catch (error) {
      return 'Unknown';
    }
  }

  async getVisitors() {
    return this.visitors;
  }

  async getVisitorById(id) {
    return this.visitors.find(visitor => visitor.id === id);
  }

  async getVisitorStats() {
    const total = this.visitors.length;
    const unique = new Set(this.visitors.map(v => v.ipAddress)).size;
    const today = this.visitors.filter(v => 
      new Date(v.timestamp).toDateString() === new Date().toDateString()
    ).length;

    return { total, unique, today };
  }
}

export const visitorService = new VisitorService();