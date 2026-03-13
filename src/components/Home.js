import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [counts, setCounts] = useState({ total: 150, completed: 120, ongoing: 30 });
  const [loadingCounts, setLoadingCounts] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCounts({ total: 150, completed: 120, ongoing: 30 });
      setLoadingCounts(false);
    }, 1000);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>BBC Construction — Building Dreams Since 1995</h1>
              <p className="hero-subtitle">Award-winning construction company delivering excellence in residential, commercial, and industrial projects for over 25 years.</p>
              <div className="hero-buttons">
                <Link to="/projects" className="btn btn-primary">View Our Portfolio</Link>
                <Link to="/inquiry" className="btn btn-secondary">Get Free Quote</Link>
              </div>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">25+</div>
                <div className="hero-stat-label">Years Experience</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">150+</div>
                <div className="hero-stat-label">Projects Completed</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">98%</div>
                <div className="hero-stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏗️</div>
              <div className="stat-number">{loadingCounts ? '—' : counts.total}</div>
              <div className="stat-label">Total Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-number completed">{loadingCounts ? '—' : counts.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔨</div>
              <div className="stat-number ongoing">{loadingCounts ? '—' : counts.ongoing}</div>
              <div className="stat-label">Ongoing</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Comprehensive construction solutions tailored to your needs</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Residential Construction</h3>
              <p>Custom homes, renovations, and residential developments with attention to detail and quality craftsmanship.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Commercial Projects</h3>
              <p>Office buildings, retail spaces, and commercial developments designed for functionality and aesthetics.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>Industrial Construction</h3>
              <p>Warehouses, factories, and industrial facilities built to meet your specific operational requirements.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Renovation & Remodeling</h3>
              <p>Transform your existing space with our expert renovation and remodeling services.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Why Choose BBC Construction?</h2>
              <p>With over 25 years of excellence in the construction industry, BBC Construction has built a reputation for delivering exceptional quality, innovative solutions, and unmatched customer service.</p>
              <div className="features-list">
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Licensed & Insured</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>25+ Years Experience</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>On-Time Delivery</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Competitive Pricing</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Quality Materials</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Expert Team</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240e5?w=600&h=400&fit=crop" alt="Construction Team" />
            </div>
          </div>
        </div>
      </section>

      <section className="section cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Get in touch with our team today for a free consultation and quote.</p>
            <Link to="/inquiry" className="btn btn-primary btn-large">Get Your Free Quote</Link>
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

