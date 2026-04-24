import { motion } from 'framer-motion';
import { models } from '../data/models';
import PropertyCard from '../components/PropertyCard';

export default function Home() {
  const handleScroll = () => {
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Cinematic Full-Screen 3D Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Full-screen 3D Background */}
        <div className="absolute inset-0 z-0">
          <model-viewer
            src="/models/villa.glb"
            auto-rotate
            rotation-per-second="2deg"
            camera-controls={false}
            interaction-prompt="none"
            shadow-intensity="2"
            exposure="0.7"
            style={{ width: '100%', height: '100%', backgroundColor: '#050505' }}
          ></model-viewer>
        </div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/20 to-black/90 pointer-events-none"></div>
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-80 pointer-events-none"></div>
        
        {/* Centered Typography */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6 flex items-center gap-4"
          >
            <div className="h-[1px] w-16 bg-accent/50"></div>
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold">The Pinnacle of Living</span>
            <div className="h-[1px] w-16 bg-accent/50"></div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[100px] font-serif text-white mb-8 tracking-tighter leading-[0.9]"
          >
            AURA <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FDE08B]">Estates</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
          >
            Immerse yourself in the world's most extraordinary properties through cinematic 3D and Virtual Reality.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <button 
              onClick={handleScroll}
              className="group relative overflow-hidden bg-transparent border border-accent/50 text-white font-bold py-4 px-12 rounded-full text-xs uppercase tracking-[0.2em] transition-all hover:border-accent"
            >
              <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out z-0"></div>
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">Discover Collection</span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-gray-400 uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="w-full h-1/2 bg-accent absolute top-0"
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Editorial Banner */}
      <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <p className="text-accent text-sm font-bold uppercase tracking-[0.3em] mb-6">The Standard of Excellence</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight max-w-4xl mx-auto mb-10">
            Pioneering the Future of <br/>
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Luxury Real Estate</span>
          </h2>
          <div className="h-[1px] w-24 bg-accent/50 mx-auto"></div>
        </div>
      </section>

      {/* Properties Collection */}
      <section id="properties" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-background to-background pointer-events-none -z-10"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Curated <span className="italic text-accent">Collection</span>
            </h2>
            <p className="text-gray-400 font-light max-w-lg">
              Explore our handpicked selection of the world's most extraordinary properties, available for immersive 3D and VR tours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <button className="text-white text-xs uppercase tracking-[0.2em] font-bold border-b border-accent pb-1 hover:text-accent transition-colors">
              View All Properties
            </button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {models.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="border-t border-white/5 py-12 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-serif text-white text-lg tracking-widest">AURA</span>
            <span className="text-xs uppercase tracking-[0.2em]">Estates</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent transition-colors">Twitter</a>
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
          </div>
          <div>© 2026 Aura Estates. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
