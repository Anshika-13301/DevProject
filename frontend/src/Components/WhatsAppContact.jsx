import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const WhatsAppContact = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const phoneNumber = "918149203613";

  const handleSend = (e) => {
    e.preventDefault();
    const message = `Hi Anshika! My name is ${name}. I am interested in hiring you for a project: ${details}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="hire" className="py-16 px-6 max-w-xl mx-auto text-white">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-8 rounded-2xl border border-purple-500/30 shadow-2xl">
        <h2 className="text-2xl font-bold text-purple-400 mb-2 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-green-400" /> Hire Me for Freelance Work
        </h2>
        <p className="text-xs text-slate-400 mb-6">Send me your project idea and I will reach out directly on WhatsApp.</p>

        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1 uppercase">Your Name</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1 uppercase">Project Requirements</label>
            <textarea 
              required 
              rows="4"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Explain your website or project requirement..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2"
          >
            💬 Chat Directly on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};

export default WhatsAppContact;