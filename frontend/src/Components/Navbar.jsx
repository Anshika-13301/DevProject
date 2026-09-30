import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, LogOut, LayoutDashboard, Eye } from 'lucide-react';
import AdminLogin from './AdminLogin';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAdminPage = window.location.pathname === '/admin';

  // Check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Use '/#section' so links work from both '/' and '/admin' routes
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
    window.location.href = '/';
  };

  const handleAdminButtonClick = () => {
    if (isLoggedIn) {
      window.location.href = '/admin';
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
          <a href="/" className="text-2xl font-extrabold tracking-wider text-white flex items-center gap-1 group">
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Anshika</span>
          </a>

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
            {isLoggedIn ? (
              <>
                {/* Toggle between Admin Dashboard & View Portfolio */}
                {isAdminPage ? (
                  <a
                    href="/"
                    className="flex items-center gap-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg"
                  >
                    <Eye className="w-4 h-4 text-emerald-400" /> View Portfolio
                  </a>
                ) : (
                  <a
                    href="/admin"
                    className="flex items-center gap-2 bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 text-purple-300 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg"
                  >
                    <LayoutDashboard className="w-4 h-4 text-purple-400" /> Dashboard
                  </a>
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
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  {isAdminPage ? (
                    <a
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 bg-emerald-900/50 border border-emerald-700 text-emerald-300 font-semibold py-2.5 rounded-xl text-sm"
                    >
                      <Eye className="w-4 h-4" /> View Portfolio
                    </a>
                  ) : (
                    <a
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 bg-purple-900/50 border border-purple-700 text-purple-300 font-semibold py-2.5 rounded-xl text-sm"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </a>
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