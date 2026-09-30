import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend se dynamic internships fetch karne ke liye
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/internships');
        setInternships(res.data);
      } catch (err) {
        console.error('Error fetching internships:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return (
    <section className="py-12 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Heading */}
        <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-white">
          <Briefcase className="w-8 h-8 text-purple-400" />
          Work Experience
        </h2>

        {loading ? (
          <p className="text-slate-400 text-sm">Loading experience...</p>
        ) : internships.length === 0 ? (
          <p className="text-slate-500 text-sm">No work experience added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((item) => (
              <div
                key={item._id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/40 transition duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Duration / Dates */}
                  {item.duration && (
                    <span className="text-xs uppercase tracking-wider font-semibold text-purple-400 block mb-2">
                      {item.duration}
                    </span>
                  )}

                  {/* Role Title */}
                  <h3 className="text-xl font-bold text-white mb-1">
                    {item.role}
                  </h3>

                  {/* Company & Location */}
                  <p className="text-slate-400 text-sm mb-4">
                    {item.company} {item.location ? `(${item.location})` : ''}
                  </p>

                  {/* Description / Bullet points */}
                  {item.description && (
                    <div className="text-slate-300 text-xs space-y-2 leading-relaxed">
                      {item.description.split('\n').map((line, idx) => (
                        line.trim() && (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-purple-400 font-bold">•</span>
                            <span>{line.trim()}</span>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Experience;