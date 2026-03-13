import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl, isBuildTime } from '../config';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Sample data for build mode
  const sampleProjects = [
    {
      _id: '1',
      title: 'Modern Family Home',
      description: 'A beautiful modern family home with 4 bedrooms and 3 bathrooms',
      location: 'Downtown District',
      status: 'completed',
      images: ['home1.jpg', 'home2.jpg'],
      createdAt: new Date('2024-01-10')
    },
    {
      _id: '2',
      title: 'Office Complex',
      description: 'Commercial office complex with modern amenities',
      location: 'Business Park',
      status: 'ongoing',
      images: ['office1.jpg', 'office2.jpg'],
      createdAt: new Date('2024-01-05')
    }
  ];

  useEffect(() => {
    if (isBuildTime) {
      // Use sample data during build
      setProjects(sampleProjects);
      setLoading(false);
    } else {
      fetchProjects();
    }
  }, [filter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const url = filter === 'all' 
        ? apiUrl('/api/projects')
        : apiUrl(`/api/projects?status=${filter}`);
      const response = await axios.get(url);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Use sample data as fallback
      setProjects(sampleProjects);
    } finally {
      setLoading(false);
    }
  };

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
                      src={`${apiUrl('')}${project.images[0]}`} 
                      alt={project.title}
                      className="project-image"
                    />
                    <span className={`project-status ${project.status}`}>
                      {project.status}
                    </span>
                  </div>
                )}
                <div className="project-content">
                  <h3>{project.title}</h3>
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
};

export default Projects;

