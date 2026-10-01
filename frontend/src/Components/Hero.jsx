import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Award, Loader2 } from 'lucide-react';
import axios from 'axios';
import defaultProfileImg from '../assets/profile.png';

// Default Data (Backup agar DB/API me data na ho)
const DEFAULT_HERO = {
  statusBadge: 'AVAILABLE FOR FREELANCE & FULL-TIME',
  name: 'Anshika Ramesh Shukla',
  title: 'Full Stack MERN Developer | B.E. Computer Science (CGPA: 8.99)',
  bio: 'Final-year CS student at Rizvi College of Engineering with hands-on experience in MERN Stack development, workflow automation, and real-time network monitoring.',
  email: 'shuklaanshika115@gmail.com',
  phone: '+91 8149203613',
  location: 'Mumbai, India',
  githubUrl: 'https://github.com/Anshika-13301',
  profileImage: ''
};

const Hero = () => {
  const [heroData, setHeroData] = useState(DEFAULT_HERO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // Vercel / Live Backend API Call
        const res = await axios.get('/api/hero');
        
        // Merge fetched data with fallback defaults (so missing fields don't disappear)
        if (res.data && Object.keys(res.data).length > 0) {
          setHeroData({
            statusBadge: res.data.statusBadge || DEFAULT_HERO.statusBadge,
            name: res.data.name || DEFAULT_HERO.name,
            title: res.data.title || DEFAULT_HERO.title,
            bio: res.data.bio || DEFAULT_HERO.bio,
            email: res.data.email || DEFAULT_HERO.email,
            phone: res.data.phone || DEFAULT_HERO.phone,
            location: res.data.location || DEFAULT_HERO.location,
            githubUrl: res.data.githubUrl || DEFAULT_HERO.githubUrl,
            profileImage: res.data.profileImage || ''
          });
        }
      } catch (error) {
        console.warn('API Fetch failed, using default hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <section id="about" className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-white min-h-[500px]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Text & Information Section */}
        <div className="flex-1 order-2 md:order-1 text-left">
          <span className="inline-block bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4">
            {heroData.statusBadge}
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-2">
            {heroData.name}
          </h1>

          <p className="text-xl text-purple-400 font-medium mb-4">
            {heroData.title}
          </p>

          <p className="text-slate-400 max-w-2xl leading-relaxed mb-6">
            {heroData.bio}
          </p>

          {/* Contact Badges */}
          <div className="flex flex-wrap gap-3 text-xs text-slate-300 mb-8">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <Mail className="w-4 h-4 text-purple-400" /> {heroData.email}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <Phone className="w-4 h-4 text-purple-400" /> {heroData.phone}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <MapPin className="w-4 h-4 text-purple-400" /> {heroData.location}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <a 
              href={heroData.githubUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl border border-slate-700 transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub Profile
            </a>
            
            <a 
              href="#hire" 
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-purple-950/50 transition transform active:scale-95"
            >
              <Award className="w-5 h-5" /> Request Freelance
            </a>
          </div>
        </div>

        {/* Profile Image with Glowing Border Frame */}
        <div className="order-1 md:order-2 shrink-0 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-2xl">
            <img 
              src={heroData.profileImage || defaultProfileImg} 
              alt={heroData.name} 
              className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;