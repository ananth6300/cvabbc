import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [counts, setCounts] = useState({ total: 2, completed: 1, ongoing: 1 });
  const [loadingCounts, setLoadingCounts] = useState(true);

  useEffect(() => {
    // Simulate loading counts
    setTimeout(() => {
      setCounts({ total: 2, completed: 1, ongoing: 1 });
      setLoadingCounts(false);
    }, 1000);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>BBC Construction — Building Your Dreams Into Reality</h1>
            <p>Professional construction services with years of experience in residential and commercial projects</p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">View Our Projects</Link>
              <Link to="/inquiry" className="btn btn-secondary">Get Free Quote</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{loadingCounts ? '—' : counts.total}</div>
              <div className="stat-label">Total Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number completed">{loadingCounts ? '—' : counts.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number ongoing">{loadingCounts ? '—' : counts.ongoing}</div>
              <div className="stat-label">Ongoing</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section features">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏗️</div>
              <h3>Expert Team</h3>
              <p>Experienced professionals dedicated to quality construction</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3>On-Time Delivery</h3>
              <p>We complete projects within the agreed timeframe</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Competitive Pricing</h3>
              <p>Quality construction at affordable prices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Quality Guaranteed</h3>
              <p>We stand behind our work with quality assurance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact">
        <div className="container">
          <h2 className="section-title">Engineer & Contact</h2>
          <div className="contact-card">
            <div className="contact-item">
              <h3>Engineer</h3>
              <p><strong>Name:</strong> G.SIVA RAM</p>
              <p><strong>Address:</strong>27C2+WQ6, Panboli, Tamil Nadu 627807, India</p>
            </div>
            <div className="contact-item">
              <h3>Get In Touch</h3>
              <p><strong>Email:</strong>buildbrightconstruction@gmail.com</p>
              <p><strong>Phone:</strong> +91 73588 33450</p>
              <div style={{ marginTop: '1rem' }}>
                <Link to="/inquiry" className="btn btn-primary">Request a Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

