import React, { useState, useEffect } from 'react';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Sample data with proper image URLs
  const sampleProjects = [
    {
      _id: '1',
      title: 'Modern Family Home',
      description: 'A beautiful modern family home with 4 bedrooms and 3 bathrooms featuring open-concept living, gourmet kitchen, and master suite with walk-in closet.',
      location: 'Downtown District',
      status: 'completed',
      images: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop'],
      createdAt: new Date('2024-01-10'),
      budget: '$250,000',
      duration: '6 months'
    },
    {
      _id: '2',
      title: 'Commercial Office Complex',
      description: 'State-of-the-art commercial office complex with modern amenities, conference rooms, and sustainable design features.',
      location: 'Business Park',
      status: 'ongoing',
      images: ['https://images.unsplash.com/photo-1497366214040-9b5f1e6b0983?w=600&h=400&fit=crop'],
      createdAt: new Date('2024-01-05'),
      budget: '$1.2M',
      duration: '12 months'
    },
    {
      _id: '3',
      title: 'Luxury Villa Renovation',
      description: 'Complete renovation of luxury villa including pool area, outdoor kitchen, and landscape design.',
      location: 'Hillside Estates',
      status: 'completed',
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop'],
      createdAt: new Date('2023-12-15'),
      budget: '$450,000',
      duration: '4 months'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      const filteredProjects = filter === 'all'
        ? sampleProjects
        : sampleProjects.filter(p => p.status === filter);
      setProjects(filteredProjects);
      setLoading(false);
    }, 1000);
  }, [filter, sampleProjects]);

  return (
    <div className="projects-page">
      <div className="container section">
        <h1 className="section-title">Our Projects</h1>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button
            className={`filter-btn ${filter === 'ongoing' ? 'active' : ''}`}
            onClick={() => setFilter('ongoing')}
          >
            Ongoing Projects
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed Projects
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="no-projects">
            <p>No projects found. Check back soon!</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project._id} className="project-card">
                {project.images && project.images.length > 0 && (
                  <div className="project-image-container">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="project-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=Project+Image';
                      }}
                    />
                    <span className={`project-status ${project.status}`}>
                      {project.status === 'completed' ? '✓ Completed' : '🔨 In Progress'}
                    </span>
                  </div>
                )}
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-details">
                    <div className="project-info">
                      <span className="project-location">📍 {project.location}</span>
                      <span className="project-budget">💰 {project.budget}</span>
                      <span className="project-duration">⏱️ {project.duration}</span>
                    </div>
                  </div>
                  <p className="project-description">{project.description}</p>
                  {project.location && (
                    <p className="project-location">📍 {project.location}</p>
                  )}
                  {project.images && project.images.length > 1 && (
                    <p className="image-count">
                      {project.images.length} images
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;

