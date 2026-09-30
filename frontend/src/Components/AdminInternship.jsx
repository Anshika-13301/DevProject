import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Briefcase, Calendar, MapPin, Check, X } from 'lucide-react';

const AdminInternships = () => {
  // Sample initial internships list (Baad mein backend API / MongoDB se fetch hoga)
  const [internships, setInternships] = useState([
    {
      id: 1,
      role: 'Full Stack Web Developer Intern',
      company: 'Tech Solutions Inc.',
      duration: 'May 2024 - July 2024',
      location: 'Mumbai, India (Remote)',
      description: 'Worked on MERN stack application, integrated REST APIs, and automated internal workflows.'
    }
  ]);

  // Form State
  const [formData, setFormData] = useState({
    id: null,
    role: '',
    company: '',
    duration: '',
    location: '',
    description: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  // Input Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add ya Update Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role || !formData.company) return alert('Role and Company are required!');

    if (isEditing) {
      // Update existing internship
      setInternships(internships.map(item => item.id === formData.id ? formData : item));
      setIsEditing(false);
    } else {
      // Add new internship
      const newItem = { ...formData, id: Date.now() };
      setInternships([newItem, ...internships]);
    }

    // Reset Form
    resetForm();
  };

  // Edit Button Handler
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  // Delete Handler
  const handleDelete = (id) => {
    if (window.confirm('Kya aap is internship ko delete karna chahte hain?')) {
      setInternships(internships.filter(item => item.id !== id));
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData({ id: null, role: '', company: '', duration: '', location: '', description: '' });
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-white bg-slate-900 rounded-2xl border border-slate-800 shadow-xl my-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <Briefcase className="w-8 h-8 text-purple-400" />
        <h2 className="text-2xl font-bold">Manage Internships & Work Experience</h2>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-slate-800/60 p-5 rounded-xl border border-slate-700 mb-8 space-y-4">
        <h3 className="text-lg font-semibold text-purple-300">
          {isEditing ? 'Edit Internship Details' : 'Add New Internship'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Role / Designation *</label>
            <input
              type="text"
              name="role"
              placeholder="e.g. React Developer Intern"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Company Name *</label>
            <input
              type="text"
              name="company"
              placeholder="e.g. Acme Corp"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Duration / Dates</label>
            <input
              type="text"
              name="duration"
              placeholder="e.g. June 2024 - Present"
              value={formData.duration}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Location / Mode</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Mumbai, India (Hybrid)"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Description / Key Contributions</label>
          <textarea
            name="description"
            rows="3"
            placeholder="Describe your responsibilities, technologies used, achievements..."
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
          ></textarea>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition"
          >
            {isEditing ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {isEditing ? 'Update Internship' : 'Add Internship'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2.5 rounded-lg text-sm transition"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>
      </form>

      {/* Internships List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-200">Existing Internships ({internships.length})</h3>

        {internships.length === 0 ? (
          <p className="text-slate-400 text-sm">Koi internship add nahi ki gayi hai.</p>
        ) : (
          internships.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-purple-500/50 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-lg text-purple-300">{item.role}</h4>
                  <span className="text-xs bg-purple-950/80 border border-purple-800 text-purple-300 px-2 py-0.5 rounded">
                    {item.company}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                  {item.duration && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" /> {item.duration}
                    </span>
                  )}
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" /> {item.location}
                    </span>
                  )}
                </div>
                {item.description && <p className="text-slate-300 text-sm pt-1">{item.description}</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-slate-700 hover:bg-purple-600 rounded-lg text-slate-200 transition"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-slate-700 hover:bg-red-600 rounded-lg text-slate-200 transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminInternships;