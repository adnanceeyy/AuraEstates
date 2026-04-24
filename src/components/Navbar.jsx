import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-background/40 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif text-white tracking-widest uppercase flex items-center gap-2">
          AURA <span className="text-accent text-sm font-sans tracking-[0.3em] ml-2 hidden sm:inline-block">ESTATES</span>
        </Link>

        {/* Links (Hidden on very small screens) */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-sm font-bold text-accent uppercase tracking-widest relative group">
            Portfolio
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-accent transform scale-x-100 transition-transform origin-left"></span>
          </Link>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-6">
          <button className="bg-white/10 hover:bg-accent hover:text-black text-white font-bold py-3 px-6 border border-white/20 hover:border-accent transition-all rounded-full text-xs uppercase tracking-widest">
            Inquire
          </button>
        </div>
      </div>
    </nav>
  );
}
