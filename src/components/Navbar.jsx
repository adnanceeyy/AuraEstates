import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Portfolio' },
    { to: '/services', label: 'Services' },
    { to: '/journal', label: 'Journal' },
    { to: '/qr-codes', label: 'AR Codes' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-background/40 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif text-white tracking-widest uppercase flex items-center gap-2">
          AURA <span className="text-accent text-sm font-sans tracking-[0.3em] ml-2 hidden sm:inline-block">ESTATES</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`text-sm font-bold uppercase tracking-widest relative transition-colors ${
                  isActive ? 'text-accent' : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-accent"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          {/* Mobile: Hamburger-style links */}
          <div className="flex md:hidden items-center gap-4">
            {links.map(({ to, label }) => (
              <Link key={to} to={to} className={`text-[10px] font-bold uppercase tracking-widest ${location.pathname === to ? 'text-accent' : 'text-gray-400'}`}>
                {label}
              </Link>
            ))}
          </div>

          <Link
            to="/qr-codes"
            className="bg-white/10 hover:bg-accent hover:text-black text-white font-bold py-3 px-6 border border-white/20 hover:border-accent transition-all rounded-full text-xs uppercase tracking-widest whitespace-nowrap"
          >
            Get AR Codes
          </Link>
        </div>
      </div>
    </nav>
  );
}

