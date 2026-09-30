import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Experience from './Components/Experience';
import Projects from './Components/Projects';
import Certificates from './Components/Certificates';
import WhatsAppContact from './Components/WhatsAppContact';
import Footer from './Components/Footer'; 
import AdminDashboard from './Components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Experience />
              <Projects />
              <Certificates />
              <WhatsAppContact />
              <Footer />
            </main>
          } />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;