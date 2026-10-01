import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, LogOut, LayoutDashboard, Eye, FileText } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AdminLogin from './AdminLogin';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Route check using React Router Hook (No page reload)
  const isAdminPage = location.pathname === '/admin';

  // Check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Certificates', href: '/#certificates' },
    { name: 'Hire Me', href: '/#hire' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert('Logged out successfully');
    navigate('/');
  };

  const handleAdminButtonClick = () => {
    if (isLoggedIn) {
      navigate('/admin');
    } else {
      localStorage.removeItem('token');
      setIsLoginOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Portfolio Title */}
          <Link to="/" className="text-2xl font-extrabold tracking-wider text-white flex items-center gap-1 group">
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Anshika</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* View Resume Button (Opens PDF in New Tab) */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-purple-400 border border-slate-800 hover:border-purple-500/50 bg-slate-900/60 px-3.5 py-2.5 rounded-xl transition"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" /> Resume
            </a>

            {isLoggedIn ? (
              <>
                {/* Toggle between Admin Dashboard & View Portfolio */}
                {isAdminPage ? (
                  <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg"
                  >
                    <Eye className="w-4 h-4 text-emerald-400" /> View Portfolio
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 text-purple-300 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg"
                  >
                    <LayoutDashboard className="w-4 h-4 text-purple-400" /> Dashboard
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="p-2.5 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 rounded-xl transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={handleAdminButtonClick}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-purple-950/50 transition transform active:scale-95"
              >
                <Lock className="w-3.5 h-3.5" /> Admin Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-6 py-6 space-y-4 shadow-xl backdrop-blur-lg">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-purple-400 text-base font-medium py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              {/* Resume Mobile Link */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-purple-400 font-medium py-1 flex items-center gap-2 text-base"
              >
                <FileText className="w-4 h-4" /> View Resume
              </a>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  {isAdminPage ? (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/');
                      }}
                      className="flex items-center justify-center gap-2 bg-emerald-900/50 border border-emerald-700 text-emerald-300 font-semibold py-2.5 rounded-xl text-sm"
                    >
                      <Eye className="w-4 h-4" /> View Portfolio
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/admin');
                      }}
                      className="flex items-center justify-center gap-2 bg-purple-900/50 border border-purple-700 text-purple-300 font-semibold py-2.5 rounded-xl text-sm"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center justify-center gap-2 bg-red-600/20 text-red-400 font-semibold py-2.5 rounded-xl text-sm border border-red-500/30"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleAdminButtonClick();
                  }}
                  className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl text-sm shadow-md"
                >
                  <Lock className="w-4 h-4" /> Admin Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Login Popup Modal */}
      <AdminLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;