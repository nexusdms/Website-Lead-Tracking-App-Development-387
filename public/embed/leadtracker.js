(function() {
  'use strict';

  // LeadTracker Embed Script
  class LeadTracker {
    constructor() {
      this.config = {
        theme: 'light',
        position: 'bottom-right',
        title: 'Get Your Free Quote',
        subtitle: 'Tell us about your project',
        primaryColor: '#3b82f6',
        showVisitorTracking: true,
        apiEndpoint: window.location.origin + '/api'
      };
      
      this.isOpen = false;
      this.visitorTracked = false;
    }

    init(userConfig = {}) {
      this.config = { ...this.config, ...userConfig };
      this.trackVisitor();
      this.createWidget();
      this.bindEvents();
    }

    trackVisitor() {
      if (!this.config.showVisitorTracking || this.visitorTracked) return;
      
      const visitorData = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        referrer: document.referrer,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };

      // Send visitor data to tracking endpoint
      this.sendData('/track-visitor', visitorData);
      this.visitorTracked = true;
    }

    createWidget() {
      if (this.config.position === 'inline') {
        this.createInlineWidget();
      } else {
        this.createFloatingWidget();
      }
    }

    createFloatingWidget() {
      // Create floating button
      const button = document.createElement('div');
      button.className = 'leadtracker-button';
      button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      `;
      
      this.applyButtonStyles(button);
      document.body.appendChild(button);

      // Create modal
      this.createModal();
      
      // Button click handler
      button.addEventListener('click', () => this.toggleModal());
    }

    createInlineWidget() {
      const container = document.querySelector('[data-leadtracker]');
      if (!container) {
        console.error('LeadTracker: No container found with data-leadtracker attribute');
        return;
      }

      container.innerHTML = this.getFormHTML();
      this.bindFormEvents(container);
    }

    createModal() {
      const modal = document.createElement('div');
      modal.className = 'leadtracker-modal';
      modal.innerHTML = `
        <div class="leadtracker-modal-overlay"></div>
        <div class="leadtracker-modal-content">
          <div class="leadtracker-modal-header">
            <h3>${this.config.title}</h3>
            <button class="leadtracker-close">&times;</button>
          </div>
          <div class="leadtracker-modal-body">
            ${this.getFormHTML()}
          </div>
        </div>
      `;
      
      this.applyModalStyles(modal);
      document.body.appendChild(modal);
      
      // Close button handler
      modal.querySelector('.leadtracker-close').addEventListener('click', () => this.toggleModal());
      modal.querySelector('.leadtracker-modal-overlay').addEventListener('click', () => this.toggleModal());
      
      this.bindFormEvents(modal);
    }

    getFormHTML() {
      return `
        <form class="leadtracker-form">
          <div class="leadtracker-form-group">
            <input type="text" name="fullName" placeholder="Full Name *" required>
          </div>
          <div class="leadtracker-form-group">
            <input type="text" name="companyName" placeholder="Company Name *" required>
          </div>
          <div class="leadtracker-form-group">
            <input type="email" name="email" placeholder="Email Address *" required>
          </div>
          <div class="leadtracker-form-group">
            <input type="tel" name="phone" placeholder="Phone Number">
          </div>
          <div class="leadtracker-form-group">
            <input type="url" name="website" placeholder="Company Website">
          </div>
          <div class="leadtracker-form-group">
            <input type="text" name="location" placeholder="Location">
          </div>
          <div class="leadtracker-form-group">
            <select name="serviceInterest" required>
              <option value="">Select Service *</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="SEO Services">SEO Services</option>
              <option value="Content Creation">Content Creation</option>
              <option value="E-commerce Solutions">E-commerce Solutions</option>
              <option value="Consulting">Consulting</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="leadtracker-form-group">
            <select name="budgetRange">
              <option value="">Select Budget Range</option>
              <option value="Under $5,000">Under $5,000</option>
              <option value="$5,000 - $15,000">$5,000 - $15,000</option>
              <option value="$15,000 - $50,000">$15,000 - $50,000</option>
              <option value="$50,000 - $100,000">$50,000 - $100,000</option>
              <option value="Over $100,000">Over $100,000</option>
            </select>
          </div>
          <div class="leadtracker-form-group">
            <select name="timeframe">
              <option value="">Select Timeframe</option>
              <option value="ASAP">ASAP</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="1+ years">1+ years</option>
            </select>
          </div>
          <div class="leadtracker-form-group">
            <textarea name="additionalInfo" placeholder="Additional Information" rows="3"></textarea>
          </div>
          <button type="submit" class="leadtracker-submit">Get Free Quote</button>
        </form>
      `;
    }

    bindFormEvents(container) {
      const form = container.querySelector('.leadtracker-form');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    }

    async handleFormSubmit(form) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      const submitButton = form.querySelector('.leadtracker-submit');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Processing...';
      submitButton.disabled = true;

      try {
        const response = await this.sendData('/submit-lead', data);
        
        if (response.success) {
          this.showSuccessMessage(form);
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        this.showErrorMessage(form);
      } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    }

    showSuccessMessage(form) {
      form.innerHTML = `
        <div class="leadtracker-success">
          <h3>Thank You!</h3>
          <p>We've received your information and will be in touch soon.</p>
        </div>
      `;
    }

    showErrorMessage(form) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'leadtracker-error';
      errorDiv.textContent = 'Something went wrong. Please try again.';
      form.insertBefore(errorDiv, form.firstChild);
      
      setTimeout(() => errorDiv.remove(), 5000);
    }

    async sendData(endpoint, data) {
      try {
        const response = await fetch(this.config.apiEndpoint + endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        return await response.json();
      } catch (error) {
        // Fallback to localStorage for demo
        if (endpoint === '/submit-lead') {
          const leads = JSON.parse(localStorage.getItem('leadTracker_leads') || '[]');
          leads.push({ ...data, id: Date.now(), timestamp: new Date().toISOString() });
          localStorage.setItem('leadTracker_leads', JSON.stringify(leads));
        }
        
        return { success: true };
      }
    }

    toggleModal() {
      const modal = document.querySelector('.leadtracker-modal');
      if (!modal) return;

      this.isOpen = !this.isOpen;
      modal.style.display = this.isOpen ? 'block' : 'none';
    }

    applyButtonStyles(button) {
      const position = this.config.position;
      const styles = {
        position: 'fixed',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: this.config.primaryColor,
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '9999',
        transition: 'all 0.3s ease'
      };

      if (position.includes('bottom')) styles.bottom = '20px';
      if (position.includes('top')) styles.top = '20px';
      if (position.includes('right')) styles.right = '20px';
      if (position.includes('left')) styles.left = '20px';

      Object.assign(button.style, styles);
    }

    applyModalStyles(modal) {
      const modalStyles = `
        .leadtracker-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
        }
        .leadtracker-modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
        }
        .leadtracker-modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }
        .leadtracker-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }
        .leadtracker-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }
        .leadtracker-modal-body {
          padding: 20px;
        }
        .leadtracker-form-group {
          margin-bottom: 16px;
        }
        .leadtracker-form-group input,
        .leadtracker-form-group select,
        .leadtracker-form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }
        .leadtracker-submit {
          width: 100%;
          padding: 12px;
          background: ${this.config.primaryColor};
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
        }
        .leadtracker-success {
          text-align: center;
          padding: 20px;
        }
        .leadtracker-error {
          background: #fee;
          color: #c33;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 16px;
        }
      `;

      if (!document.querySelector('#leadtracker-styles')) {
        const style = document.createElement('style');
        style.id = 'leadtracker-styles';
        style.textContent = modalStyles;
        document.head.appendChild(style);
      }
    }

    bindEvents() {
      // Add any additional event listeners here
    }
  }

  // Expose LeadTracker globally
  window.LeadTracker = new LeadTracker();
})();