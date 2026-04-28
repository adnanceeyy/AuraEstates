import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: "VR Property Showcases",
      description: "Immerse your clients in fully interactive virtual reality environments. Allow them to walk through unbuilt spaces, visualize renovations, and experience scale and lighting perfectly before construction even begins.",
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    },
    {
      title: "Augmented Reality Tours",
      description: "Bring the property to the client's living room. With our markerless AR technology, buyers can project architectural models onto their coffee tables or life-size floor plans into empty lots.",
      icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    },
    {
      title: "Photorealistic 3D Rendering",
      description: "We craft stunning, true-to-life 3D renders that capture the exact mood, luxury, and atmosphere of your properties. Ideal for high-end marketing campaigns and pre-sales.",
      icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-accent text-sm font-bold uppercase tracking-[0.3em] mb-4">Our Expertise</p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-white mb-6">Bespoke <span className="italic text-gray-500">Services</span></h1>
          <div className="h-[1px] w-24 bg-accent/50 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-[#0a0a0a] border border-white/5 p-10 rounded-2xl hover:border-accent/30 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-accent/10 transition-colors text-accent">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
