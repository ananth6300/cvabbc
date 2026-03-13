import React, { useState, useEffect } from 'react';
import { getProjects } from '../utils/projectStorage';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load projects from storage
    setTimeout(() => {
      const allProjects = getProjects();
      const filteredProjects = filter === 'all'
        ? allProjects
        : allProjects.filter(p => p.status === filter);
      setProjects(filteredProjects);
      setLoading(false);
    }, 1000);
  }, [filter]);

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

