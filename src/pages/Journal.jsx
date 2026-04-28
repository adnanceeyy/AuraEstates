import { motion } from 'framer-motion';

export default function Journal() {
  const articles = [
    {
      title: "The Rise of Virtual Reality in High-End Real Estate",
      date: "April 15, 2026",
      category: "Technology",
      image: "/assets/hero.jpg",
      snippet: "How luxury buyers are purchasing multi-million dollar properties sight-unseen, relying entirely on photorealistic 3D and VR walkthroughs."
    },
    {
      title: "Architectural Trends: The Return to Minimalism",
      date: "March 28, 2026",
      category: "Design",
      image: "/assets/apartment.jpg",
      snippet: "Exploring the shift away from maximalist interiors back to clean, purposeful, and breathable living spaces in modern luxury developments."
    },
    {
      title: "Market Report: Global Luxury Property Index Q1",
      date: "March 10, 2026",
      category: "Market Insights",
      image: "/assets/tower.jpg",
      snippet: "An in-depth analysis of ultra-prime property performance across London, New York, Dubai, and Singapore over the first quarter."
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
          <p className="text-accent text-sm font-bold uppercase tracking-[0.3em] mb-4">Editorial</p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-white mb-6">The <span className="italic text-gray-500">Journal</span></h1>
          <div className="h-[1px] w-24 bg-accent/50 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-2xl mb-6 relative h-64 bg-[#111]">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" 
                />
              </div>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-accent mb-4">
                <span>{article.category}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-500">{article.date}</span>
              </div>
              <h2 className="text-2xl font-serif text-white mb-4 group-hover:text-accent transition-colors">{article.title}</h2>
              <p className="text-gray-400 font-light leading-relaxed">{article.snippet}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
