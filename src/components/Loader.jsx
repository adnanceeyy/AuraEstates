import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background z-40">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-secondary border-t-accent rounded-full"
      />
    </div>
  );
}
