import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ property, index }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
      className="group relative h-[500px] w-full rounded-2xl overflow-hidden cursor-pointer isolate"
      onClick={() => navigate(`/viewer/${property.id}`)}
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={property.thumbnail} 
          alt={property.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
          loading="lazy"
        />
      </div>

      {/* Deep Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
      <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

      {/* Card Content */}
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        
        {/* Top tag */}
        <div className="absolute top-8 left-8 flex gap-2">
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
            Exclusive
          </span>
          {index === 0 && (
            <span className="bg-accent/20 backdrop-blur-md border border-accent/50 text-accent text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-3xl font-serif text-white mb-3 tracking-wide">{property.title}</h3>
        
        <p className="text-gray-300 text-sm mb-6 line-clamp-2 font-light max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {property.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center text-accent font-bold uppercase text-xs tracking-[0.2em]">
            <span>Explore 3D Tour</span>
          </div>
          
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-black text-white transition-all duration-300">
            <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
