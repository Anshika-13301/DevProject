import React from 'react';
import { Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-900 pb-8">
          
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Portfolio<span className="text-purple-500">.</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Full-Stack MERN Developer building modern, performant, and scalable web applications.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {/* GitHub */}
            <a
              href="https://github.com/Anshika-13301"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 bg-slate-900 hover:bg-purple-600/20 text-slate-300 hover:text-purple-400 border border-slate-800 rounded-xl transition duration-300"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>

            {/* LinkedIn (Updated with your URL) */}
            <a
              href="https://linkedin.com/in/anshika-shukla-a10139321"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 bg-slate-900 hover:bg-purple-600/20 text-slate-300 hover:text-purple-400 border border-slate-800 rounded-xl transition duration-300"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:shuklaanshika115@gmail.com"
              aria-label="Email"
              className="p-2.5 bg-slate-900 hover:bg-purple-600/20 text-slate-300 hover:text-purple-400 border border-slate-800 rounded-xl transition duration-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="flex items-center gap-1.5 text-slate-500">
            © {new Date().getFullYear()} Anshika Shukla. All rights reserved.
           
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition text-xs font-semibold group"
          >
            Back to Top
            <span className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg group-hover:border-purple-500/50 transition">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;