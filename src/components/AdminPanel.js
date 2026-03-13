import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projects, setProjects] = useState([
    {
      _id: '1',
      title: 'Modern Family Home',
      description: 'A beautiful modern family home with 4 bedrooms and 3 bathrooms',
      location: 'Downtown District',
      status: 'completed',
      budget: '$250,000',
      duration: '6 months'
    },
    {
      _id: '2',
      title: 'Commercial Office Complex',
      description: 'State-of-the-art commercial office complex',
      location: 'Business Park',
      status: 'ongoing',
      budget: '$1.2M',
      duration: '12 months'
    }
  ]);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    location: '',
    status: 'ongoing',
    budget: '',
    duration: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (passkey === 'bbc123') {
      setIsLoggedIn(true);
      setPasskey('');
    } else {
      alert('Invalid passkey. Please try again.');
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      _id: Date.now().toString(),
      ...projectForm
    };
    setProjects([...projects, newProject]);
    setProjectForm({
      title: '',
      description: '',
      location: '',
      status: 'ongoing',
      budget: '',
      duration: ''
    });
    setShowProjectForm(false);
    alert('Project added successfully!');
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p._id !== id));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-panel">
        <div className="container section">
          <div className="login-container">
            <div className="login-card">
              <h2>Admin Login</h2>
              <p>Enter your passkey to access the admin panel</p>
              <form onSubmit={handleLogin} className="login-form">
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter passkey"
                  required
                />
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
              <p className="login-hint">Default passkey: <strong>bbc123</strong></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container section">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <button onClick={() => setIsLoggedIn(false)} className="btn btn-secondary">Logout</button>
        </div>

        <div className="admin-content">
          <div className="admin-section">
            <div className="section-header">
              <h2>Manage Projects</h2>
              <button 
                onClick={() => setShowProjectForm(!showProjectForm)}
                className="btn btn-primary"
              >
                {showProjectForm ? 'Cancel' : '+ Add New Project'}
              </button>
            </div>

            {showProjectForm && (
              <div className="project-form-card">
                <h3>Add New Project</h3>
                <form onSubmit={handleProjectSubmit} className="project-form">
                  <div className="form-group">
                    <label>Project Title *</label>
                    <input
                      type="text"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                      required
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      value={projectForm.location}
                      onChange={(e) => setProjectForm({...projectForm, location: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={projectForm.status}
                        onChange={(e) => setProjectForm({...projectForm, status: e.target.value})}
                      >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Budget</label>
                      <input
                        type="text"
                        value={projectForm.budget}
                        onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})}
                        placeholder="$250,000"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={projectForm.duration}
                      onChange={(e) => setProjectForm({...projectForm, duration: e.target.value})}
                      placeholder="6 months"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Add Project</button>
                </form>
              </div>
            )}

            <div className="projects-list">
              <h3>Current Projects ({projects.length})</h3>
              {projects.map(project => (
                <div key={project._id} className="admin-project-card">
                  <div className="project-info">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <div className="project-meta">
                      <span className="meta-item">📍 {project.location}</span>
                      <span className="meta-item">💰 {project.budget}</span>
                      <span className="meta-item">⏱️ {project.duration}</span>
                      <span className={`status-badge ${project.status}`}>
                        {project.status === 'completed' ? '✓ Completed' : '🔨 Ongoing'}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteProject(project._id)}
                    className="btn btn-danger delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
