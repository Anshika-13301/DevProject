import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Award, ExternalLink } from 'lucide-react';

const API_BASE = 'https://devproject-rduu.onrender.com/api';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get(`${API_BASE}/certificates`);
        setCertificates(res.data);
      } catch (err) {
        console.error('Error fetching certificates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <section id="certificates" className="py-12 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Award className="w-6 h-6 text-purple-400" /> Certifications & Achievements
      </h2>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading certificates...</p>
      ) : certificates.length === 0 ? (
        <p className="text-slate-500 text-sm">No certificates added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert._id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-white">{cert.title}</h3>
                <p className="text-purple-400 text-xs font-medium mt-1">{cert.issuer}</p>
                {cert.issueDate && (
                  <p className="text-slate-500 text-xs mt-1">
                    Issued: {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 text-purple-400 hover:text-purple-300 text-xs flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Credential
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Certificates;