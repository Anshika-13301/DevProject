import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase } from 'lucide-react';

const API_BASE = 'https://devproject-rduu.onrender.com/api';

const Experience = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get(`${API_BASE}/internships`);
        setInternships(res.data);
      } catch (err) {
        console.error('Error fetching internships:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-12 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-purple-400" /> Work Experience
      </h2>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading experience...</p>
      ) : internships.length === 0 ? (
        <p className="text-slate-500 text-sm">No work experience added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {internships.map((item) => (
            <div key={item._id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="font-bold text-lg text-white">{item.role}</h3>
              <p className="text-purple-400 text-sm font-medium">{item.company}</p>
              <div className="flex flex-wrap gap-3 text-slate-400 text-xs mt-2">
                {item.duration && <span>🗓️ {item.duration}</span>}
                {item.location && <span>📍 {item.location}</span>}
              </div>
              {item.description && <p className="text-slate-400 text-xs mt-3 leading-relaxed">{item.description}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Experience;