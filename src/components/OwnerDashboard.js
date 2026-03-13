import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl, isBuildTime } from '../config';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    status: 'ongoing',
    location: '',
    startDate: '',
    completionDate: '',
    images: []
  });

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

  const sampleInquiries = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St, City, State',
      projectType: 'residential',
      budget: '$50,000 - $100,000',
      description: 'Looking to build a new home with modern design',
      status: 'pending',
      createdAt: new Date('2024-01-15')
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '098-765-4321',
      address: '456 Oak Ave, Town, State',
      projectType: 'commercial',
      budget: '$100,000 - $200,000',
      description: 'Need to construct an office building',
      status: 'contacted',
      createdAt: new Date('2024-01-20')
    }
  ];

  useEffect(() => {
    if (isBuildTime) {
      // Use sample data during build
      setProjects(sampleProjects);
      setInquiries(sampleInquiries);
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, inquiriesRes] = await Promise.all([
        axios.get(apiUrl('/api/projects')),
        axios.get(apiUrl('/api/inquiries'))
      ]);
      setProjects(projectsRes.data);
      setInquiries(inquiriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Use sample data as fallback
      setProjects(sampleProjects);
      setInquiries(sampleInquiries);
    }
  };
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [addingImagesFor, setAddingImagesFor] = useState(null);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('ownerToken');
    if (!token) {
      navigate('/owner/login');
      return;
    }
    fetchProjects();
    fetchInquiries();
  }, [navigate]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('ownerToken');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(apiUrl('/api/projects'));
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(apiUrl('/api/inquiries'), getAuthHeaders());
      setInquiries(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('ownerToken');
        navigate('/owner/login');
      }
    }
  };

  const handleProjectImageChange = (e) => {
    setProjectForm({
      ...projectForm,
      images: Array.from(e.target.files)
    });
  };

  const handleNewImagesChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleAddImages = async (projectId) => {
    if (!newImages.length) return;
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      newImages.forEach(img => formData.append('images', img));

      await axios.put(apiUrl(`/api/projects/${projectId}`), formData, {
        ...getAuthHeaders(),
        headers: {
          ...getAuthHeaders().headers,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ type: 'success', text: 'Photos added successfully!' });
      setAddingImagesFor(null);
      setNewImages([]);
      fetchProjects();
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('ownerToken');
        navigate('/owner/login');
      } else {
        setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add photos' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('description', projectForm.description);
      formData.append('status', projectForm.status);
      formData.append('location', projectForm.location);
      if (projectForm.startDate) formData.append('startDate', projectForm.startDate);
      if (projectForm.completionDate) formData.append('completionDate', projectForm.completionDate);
      
      projectForm.images.forEach(image => {
        formData.append('images', image);
      });

      await axios.post(apiUrl('/api/projects'), formData, {
        ...getAuthHeaders(),
        headers: {
          ...getAuthHeaders().headers,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ type: 'success', text: 'Project added successfully!' });
      setShowProjectForm(false);
      setProjectForm({
        title: '',
        description: '',
        status: 'ongoing',
        location: '',
        startDate: '',
        completionDate: '',
        images: []
      });
      fetchProjects();
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('ownerToken');
        navigate('/owner/login');
      } else {
        setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add project' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await axios.delete(apiUrl(`/api/projects/${id}`), getAuthHeaders());
      setMessage({ type: 'success', text: 'Project deleted successfully!' });
      fetchProjects();
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('ownerToken');
        navigate('/owner/login');
      } else {
        setMessage({ type: 'error', text: 'Failed to delete project' });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ownerToken');
    navigate('/owner/login');
  };

  return (
    <div className="owner-dashboard">
      <div className="container section">
        <div className="dashboard-header">
          <h1>Owner Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            Customer Inquiries
          </button>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="dashboard-content">
            <div className="content-header">
              <h2>Manage Projects</h2>
              <button 
                onClick={() => setShowProjectForm(!showProjectForm)}
                className="btn btn-primary"
              >
                {showProjectForm ? 'Cancel' : '+ Add New Project'}
              </button>
            </div>

            {showProjectForm && (
              <div className="card project-form-card">
                <h3>Add New Project</h3>
                <form onSubmit={handleProjectSubmit}>
                  <div className="form-group">
                    <label>Title *</label>
                    <input
                      type="text"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      required
                      rows="4"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Status *</label>
                      <select
                        value={projectForm.status}
                        onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                        required
                      >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        value={projectForm.location}
                        onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="date"
                        value={projectForm.startDate}
                        onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Completion Date</label>
                      <input
                        type="date"
                        value={projectForm.completionDate}
                        onChange={(e) => setProjectForm({ ...projectForm, completionDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Images * (Select multiple)</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleProjectImageChange}
                      required
                    />
                    <small>You can select multiple images (max 10)</small>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Project'}
                  </button>
                </form>
              </div>
            )}

            <div className="projects-list">
              {projects.length === 0 ? (
                <p className="no-data">No projects yet. Add your first project!</p>
              ) : (
                projects.map(project => (
                  <div key={project._id} className="card project-item">
                    {project.images && project.images.length > 0 && (
                      <img 
                        src={`${apiUrl('')}${project.images[0]}`} 
                        alt={project.title}
                        className="project-thumbnail"
                      />
                    )}
                    <div className="project-item-content">
                      <h3>{project.title}</h3>
                      <p className="project-status-badge">{project.status}</p>
                      <p>{project.description}</p>
                      {project.location && <p>📍 {project.location}</p>}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => setAddingImagesFor(addingImagesFor === project._id ? null : project._id)}
                          className="btn btn-primary btn-sm"
                        >
                          {addingImagesFor === project._id ? 'Cancel' : 'Add Photos'}
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>

                      {addingImagesFor === project._id && (
                        <div className="card" style={{ marginTop: '1rem' }}>
                          <h4>Add photos to this project</h4>
                          <div className="form-group">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleNewImagesChange}
                            />
                            <small>Select multiple images (max 10)</small>
                          </div>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddImages(project._id)}
                            disabled={loading || newImages.length === 0}
                          >
                            {loading ? 'Adding...' : 'Upload Photos'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="dashboard-content">
            <h2>Customer Inquiries</h2>
            {inquiries.length === 0 ? (
              <p className="no-data">No inquiries yet.</p>
            ) : (
              <div className="inquiries-list">
                {inquiries.map(inquiry => (
                  <div key={inquiry._id} className="card inquiry-item">
                    <div className="inquiry-header">
                      <h3>{inquiry.name}</h3>
                      <span className={`status-badge ${inquiry.status}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <div className="inquiry-details">
                      <p><strong>Email:</strong> {inquiry.email}</p>
                      <p><strong>Phone:</strong> {inquiry.phone}</p>
                      <p><strong>Address:</strong> {inquiry.address}</p>
                      <p><strong>Project Type:</strong> {inquiry.projectType}</p>
                      {inquiry.budget && <p><strong>Budget:</strong> {inquiry.budget}</p>}
                      <p><strong>Description:</strong> {inquiry.description}</p>
                      <p className="inquiry-date">
                        Submitted: {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;

