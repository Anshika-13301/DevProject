import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FolderKanban, Award, Briefcase, Plus, Trash2, Edit3, X, Save, LogOut } from 'lucide-react';

// Fixed API_BASE URL (removed trailing slash and added /api)
const API_BASE = 'https://devproject-rduu.onrender.com/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');

  // --- PROJECTS STATE ---
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    techStack: '',
    liveDemoUrl: '',
    githubUrl: ''
  });

  // --- CERTIFICATES STATE ---
  const [certificates, setCertificates] = useState([]);
  const [editingCertId, setEditingCertId] = useState(null);
  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialUrl: ''
  });

  // --- INTERNSHIPS STATE ---
  const [internships, setInternships] = useState([]);
  const [editingInternshipId, setEditingInternshipId] = useState(null);
  const [internshipForm, setInternshipForm] = useState({
    role: '',
    company: '',
    duration: '',
    location: '',
    description: ''
  });

  // Helper: Get Authorization Header with JWT Token
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    window.location.href = '/';
  };

  // Fetch Data on Load
  useEffect(() => {
    fetchProjects();
    fetchCertificates();
    fetchInternships();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE}/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(`${API_BASE}/certificates`);
      setCertificates(res.data);
    } catch (err) {
      console.error('Error fetching certificates:', err);
    }
  };

  const fetchInternships = async () => {
    try {
      const res = await axios.get(`${API_BASE}/internships`);
      setInternships(res.data);
    } catch (err) {
      console.error('Error fetching internships:', err);
    }
  };

  // ==================== PROJECT HANDLERS ====================
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      techStack: typeof projectForm.techStack === 'string' 
        ? projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean)
        : projectForm.techStack
    };

    try {
      if (editingProjectId) {
        await axios.put(`${API_BASE}/projects/${editingProjectId}`, payload, getAuthHeader());
      } else {
        await axios.post(`${API_BASE}/projects`, payload, getAuthHeader());
      }
      resetProjectForm();
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to save project. Unauthorized or Invalid Token.');
    }
  };

  const handleEditProject = (project) => {
    setEditingProjectId(project._id);
    setProjectForm({
      title: project.title || '',
      description: project.description || '',
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack || '',
      liveDemoUrl: project.liveDemoUrl || '',
      githubUrl: project.githubUrl || ''
    });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`${API_BASE}/projects/${id}`, getAuthHeader());
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete project. Check login status.');
    }
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setProjectForm({ title: '', description: '', techStack: '', liveDemoUrl: '', githubUrl: '' });
  };

  // ==================== CERTIFICATE HANDLERS ====================
  const handleCertSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCertId) {
        await axios.put(`${API_BASE}/certificates/${editingCertId}`, certForm, getAuthHeader());
      } else {
        await axios.post(`${API_BASE}/certificates`, certForm, getAuthHeader());
      }
      resetCertForm();
      fetchCertificates();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to save certificate.');
    }
  };

  const handleEditCert = (cert) => {
    setEditingCertId(cert._id);
    setCertForm({
      title: cert.title || '',
      issuer: cert.issuer || '',
      issueDate: cert.issueDate ? cert.issueDate.split('T')[0] : '',
      credentialUrl: cert.credentialUrl || ''
    });
  };

  const handleDeleteCert = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await axios.delete(`${API_BASE}/certificates/${id}`, getAuthHeader());
      fetchCertificates();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete certificate');
    }
  };

  const resetCertForm = () => {
    setEditingCertId(null);
    setCertForm({ title: '', issuer: '', issueDate: '', credentialUrl: '' });
  };

  // ==================== INTERNSHIP HANDLERS ====================
  const handleInternshipSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingInternshipId) {
        await axios.put(`${API_BASE}/internships/${editingInternshipId}`, internshipForm, getAuthHeader());
      } else {
        await axios.post(`${API_BASE}/internships`, internshipForm, getAuthHeader());
      }
      resetInternshipForm();
      fetchInternships();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to save internship.');
    }
  };

  const handleEditInternship = (item) => {
    setEditingInternshipId(item._id);
    setInternshipForm({
      role: item.role || '',
      company: item.company || '',
      duration: item.duration || '',
      location: item.location || '',
      description: item.description || ''
    });
  };

  const handleDeleteInternship = async (id) => {
    if (!window.confirm('Are you sure you want to delete this internship?')) return;
    try {
      await axios.delete(`${API_BASE}/internships/${id}`, getAuthHeader());
      fetchInternships();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete internship.');
    }
  };

  const resetInternshipForm = () => {
    setEditingInternshipId(null);
    setInternshipForm({ role: '', company: '', duration: '', location: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Bar with Logout */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-extrabold text-purple-400">
            ⚙️ Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl transition border border-red-500/30 text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition ${
              activeTab === 'projects'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <FolderKanban className="w-5 h-5" /> Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition ${
              activeTab === 'certificates'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Award className="w-5 h-5" /> Certificates ({certificates.length})
          </button>
          <button
            onClick={() => setActiveTab('internships')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition ${
              activeTab === 'internships'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-5 h-5" /> Internships ({internships.length})
          </button>
        </div>

        {/* ==================== PROJECTS SECTION ==================== */}
        {activeTab === 'projects' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-purple-300">
                  {editingProjectId ? '✏️ Edit Project' : '➕ Add New Project'}
                </h2>
                {editingProjectId && (
                  <button onClick={resetProjectForm} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dynamic Portfolio"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Description</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Project details..."
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  ></textarea>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, MongoDB"
                    value={projectForm.techStack}
                    onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://myproject.com"
                    value={projectForm.liveDemoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveDemoUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">GitHub URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/username/repo"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  {editingProjectId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingProjectId ? 'Update Project' : 'Add Project'}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              {projects.map((proj) => (
                <div key={proj._id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">{proj.title}</h3>
                    <p className="text-slate-400 text-xs mt-1">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.techStack?.map((t, idx) => (
                        <span key={idx} className="bg-slate-950 text-purple-300 border border-slate-800 text-[10px] px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 min-w-[80px]">
                    <button
                      onClick={() => handleEditProject(proj)}
                      className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj._id)}
                      className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== CERTIFICATES SECTION ==================== */}
        {activeTab === 'certificates' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-purple-300">
                  {editingCertId ? '✏️ Edit Certificate' : '➕ Add New Certificate'}
                </h2>
                {editingCertId && (
                  <button onClick={resetCertForm} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <form onSubmit={handleCertSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AWS Certified Developer"
                    value={certForm.title}
                    onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Issuer / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amazon Web Services"
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={certForm.issueDate}
                    onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Credential URL</label>
                  <input
                    type="url"
                    placeholder="https://certificate-link.com"
                    value={certForm.credentialUrl}
                    onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  {editingCertId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingCertId ? 'Update Certificate' : 'Add Certificate'}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              {certificates.map((cert) => (
                <div key={cert._id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">{cert.title}</h3>
                    <p className="text-purple-400 text-xs font-medium">{cert.issuer}</p>
                    {cert.issueDate && (
                      <p className="text-slate-500 text-xs mt-1">
                        Issued: {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 min-w-[80px]">
                    <button
                      onClick={() => handleEditCert(cert)}
                      className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCert(cert._id)}
                      className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== INTERNSHIPS SECTION ==================== */}
        {activeTab === 'internships' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-purple-300">
                  {editingInternshipId ? '✏️ Edit Internship' : '➕ Add New Internship'}
                </h2>
                {editingInternshipId && (
                  <button onClick={resetInternshipForm} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <form onSubmit={handleInternshipSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Role / Position *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MERN Stack Intern"
                    value={internshipForm.role}
                    onChange={(e) => setInternshipForm({ ...internshipForm, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tech Solutions Inc."
                    value={internshipForm.company}
                    onChange={(e) => setInternshipForm({ ...internshipForm, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Duration / Dates</label>
                  <input
                    type="text"
                    placeholder="e.g. May 2024 - July 2024"
                    value={internshipForm.duration}
                    onChange={(e) => setInternshipForm({ ...internshipForm, duration: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Location / Mode</label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, India (Remote)"
                    value={internshipForm.location}
                    onChange={(e) => setInternshipForm({ ...internshipForm, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Description / Key Responsibilities</label>
                  <textarea
                    rows="3"
                    placeholder="Responsibilities, work handled, tech used..."
                    value={internshipForm.description}
                    onChange={(e) => setInternshipForm({ ...internshipForm, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  {editingInternshipId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingInternshipId ? 'Update Internship' : 'Add Internship'}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              {internships.map((item) => (
                <div key={item._id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">{item.role}</h3>
                    <p className="text-purple-400 text-xs font-semibold">{item.company}</p>
                    <div className="flex flex-wrap gap-3 text-slate-400 text-xs mt-2">
                      {item.duration && <span>🗓️ {item.duration}</span>}
                      {item.location && <span>📍 {item.location}</span>}
                    </div>
                    {item.description && <p className="text-slate-400 text-xs mt-2 leading-relaxed">{item.description}</p>}
                  </div>

                  <div className="flex gap-2 min-w-[80px]">
                    <button
                      onClick={() => handleEditInternship(item)}
                      className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteInternship(item._id)}
                      className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;