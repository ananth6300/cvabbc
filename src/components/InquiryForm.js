import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl, isBuildTime } from '../config';
import './InquiryForm.css';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: 'residential',
    budget: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      if (isBuildTime) {
        // Mock successful submission during build
        setMessage({ type: 'success', text: 'Thank you for your inquiry! We will contact you soon.' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          projectType: 'residential',
          budget: '',
          description: ''
        });
        return;
      }

      const response = await axios.post(apiUrl('/api/inquiries'), formData);
      setMessage({ type: 'success', text: 'Thank you for your inquiry! We will contact you soon.' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        projectType: 'residential',
        budget: '',
        description: ''
      });
    } catch (error) {
      if (!isBuildTime) {
        setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to submit inquiry. Please try again.' });
      } else {
        // Mock successful submission during build
        setMessage({ type: 'success', text: 'Thank you for your inquiry! We will contact you soon.' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          projectType: 'residential',
          budget: '',
          description: ''
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="inquiry-page">
      <div className="container section">
        <h1 className="section-title">Get Your Free Quote</h1>
        <p className="section-subtitle">
          Fill out the form below and we'll get back to you with a customized quote for your project.
        </p>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="inquiry-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Project Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter the project address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectType">Project Type *</label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="renovation">Renovation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="budget">Estimated Budget</label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter your estimated budget (optional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Project Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe your project requirements in detail..."
                rows="6"
              />
            </div>

            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;

