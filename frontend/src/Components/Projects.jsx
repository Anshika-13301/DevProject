import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FolderKanban, ExternalLink, Github } from 'lucide-react';

const API_BASE = 'https://devproject-rduu.onrender.com/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE}/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-12 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FolderKanban className="w-6 h-6 text-purple-400" /> Dynamic Portfolio Projects
      </h2>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-slate-500 text-sm">No projects added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack?.map((tech, idx) => (
                    <span key={idx} className="bg-slate-950 text-purple-300 border border-slate-800 text-[10px] px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-2 border-t border-slate-800/60">
                {project.liveDemoUrl && (
                  <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 text-xs flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white text-xs flex items-center gap-1">
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;