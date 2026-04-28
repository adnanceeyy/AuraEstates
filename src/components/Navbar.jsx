import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const links = [
    { to: '/', label: 'Portfolio' },
    { to: '/services', label: 'Services' },
    { to: '/journal', label: 'Journal' },
    { to: '/qr-codes', label: 'AR Codes' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif text-white tracking-widest uppercase flex items-center gap-2 relative z-[60]">
          AURA <span className="text-accent text-[10px] font-sans tracking-[0.4em] ml-2 hidden sm:inline-block">ESTATES</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`text-[11px] font-bold uppercase tracking-[0.3em] relative transition-colors ${
                  isActive ? 'text-accent' : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
                {isActive && (
                  <motion.span layoutId="nav-active" className="absolute -bottom-2 left-0 w-full h-[1px] bg-accent"></motion.span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <Link
            to="/qr-codes"
            className="hidden sm:block bg-white/10 hover:bg-accent hover:text-black text-white font-bold py-3 px-7 border border-white/20 hover:border-accent transition-all rounded-full text-[10px] uppercase tracking-widest whitespace-nowrap"
          >
            Get AR Codes
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[60] p-2 flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle Menu"
          >
            <motion.div 
              animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-white origin-center"
            ></motion.div>
            <motion.div 
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1.5px] bg-white"
            ></motion.div>
            <motion.div 
              animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-white origin-center"
            ></motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#080808] z-50 flex flex-col items-center justify-center p-12 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    to={to}
                    className={`text-2xl font-serif tracking-[0.2em] uppercase ${location.pathname === to ? 'text-accent' : 'text-white'}`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Link
                  to="/qr-codes"
                  className="bg-accent text-black font-bold py-4 px-10 rounded-full text-xs uppercase tracking-widest"
                >
                  Get AR Codes
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

