// Simple in-memory storage for projects (persists in localStorage)
const PROJECTS_KEY = 'bbc_construction_projects';

// Default projects
const DEFAULT_PROJECTS = [
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

// Get projects from localStorage or use defaults
export const getProjects = () => {
  try {
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (stored) {
      const projects = JSON.parse(stored);
      return projects.length > 0 ? projects : DEFAULT_PROJECTS;
    }
    return DEFAULT_PROJECTS;
  } catch (error) {
    console.error('Error loading projects:', error);
    return DEFAULT_PROJECTS;
  }
};

// Save projects to localStorage
export const saveProjects = (projects) => {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects:', error);
  }
};

// Add a new project
export const addProject = (project) => {
  const projects = getProjects();
  const newProject = {
    _id: Date.now().toString(),
    ...project,
    createdAt: new Date().toISOString(),
    images: project.images || ['https://images.unsplash.com/photo-1541888946425-d81bb19240e5?w=600&h=400&fit=crop']
  };
  const updatedProjects = [...projects, newProject];
  saveProjects(updatedProjects);
  return newProject;
};

// Delete a project
export const deleteProject = (projectId) => {
  const projects = getProjects();
  const updatedProjects = projects.filter(p => p._id !== projectId);
  saveProjects(updatedProjects);
  return updatedProjects;
};

// Get project statistics
export const getProjectStats = () => {
  const projects = getProjects();
  return {
    total: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    ongoing: projects.filter(p => p.status === 'ongoing').length
  };
};
