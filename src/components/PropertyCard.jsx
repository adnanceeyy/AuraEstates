import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ property, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative h-[480px] w-full rounded-2xl overflow-hidden cursor-pointer isolate"
      onClick={() => navigate(`/viewer/${property.id}`)}
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={property.thumbnail}
          alt={property.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

      {/* Card Content */}
      <div className="absolute inset-0 z-20 p-7 flex flex-col justify-end">

        {/* Top tags */}
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-white/10 backdrop-blur-sm border border-white/15 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
            Exclusive
          </span>
          {index === 0 && (
            <span className="bg-accent/20 backdrop-blur-sm border border-accent/40 text-accent text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-2xl font-serif text-white mb-2 tracking-wide">{property.title}</h3>

        <p className="text-gray-400 text-sm mb-5 font-light line-clamp-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          {property.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-accent font-bold text-xs uppercase tracking-[0.2em]">Explore 3D Tour</span>
          <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
            <svg className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

