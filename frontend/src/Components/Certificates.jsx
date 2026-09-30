import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Award, ExternalLink, Calendar } from 'lucide-react';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    axios.get('https://devproject-rduu.onrender.com/api')
      .then(res => setCertificates(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="certificates" className="py-16 px-6 max-w-6xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-8 text-purple-400 flex items-center gap-2">
        <Award className="w-7 h-7" /> Certifications & Achievements
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => {
          // Handle all possible URL property names (credentialUrl, link, url)
          const certLink = cert.credentialUrl || cert.link || cert.url;

          return (
            <div 
              key={cert._id} 
              className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 p-6 rounded-2xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">
                  {cert.issuer}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                
                {cert.issueDate && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(cert.issueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </div>
                )}
              </div>

              {certLink && (
                <div className="pt-4 border-t border-slate-800/80 mt-2">
                  <a 
                    href={certLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 hover:underline transition"
                  >
                    <ExternalLink className="w-4 h-4" /> View Credential
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Certificates;