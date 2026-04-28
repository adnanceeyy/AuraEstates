import { motion } from 'framer-motion';
import { models } from '../data/models';

// Using the qrserver.com API — free, no key needed
function getQRCodeUrl(text, size = 200) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=0D0D0D&color=D4AF37&qzone=2&format=png`;
}

// Tracking pattern used by AR.js (Hiro preset)
const hiroMarkerUrl = '/assets/hiro-marker.jpg';
const auraMarkerUrl = '/assets/aura-marker.png';

export default function QRCodes() {
  // Use VITE_PUBLIC_URL env var if set (e.g. your deployed domain),
  // otherwise fall back to the current origin (will be localhost during dev).
  const BASE_URL = import.meta.env.VITE_PUBLIC_URL?.replace(/\/$/, '') || window.location.origin;
  const isLocalhost = BASE_URL.includes('localhost') || BASE_URL.includes('127.0.0.1');

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-24 px-6 md:px-12">
      {/* Localhost warning banner */}
      {isLocalhost && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500/90 text-black text-center text-xs font-bold py-2 px-4 backdrop-blur">
          ⚠️ QR codes currently point to <strong>{BASE_URL}</strong> — only scannable on this device.
          Set <code className="bg-black/20 px-1 rounded">VITE_PUBLIC_URL=https://your-domain.com</code> in your <code className="bg-black/20 px-1 rounded">.env</code> for real QR codes.
        </div>
      )}
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <p className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-4">Easy AR Experience</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-5">
            View in <span className="italic text-accent">Your Space</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed text-lg">
            Want to see what this property looks like in real life? Follow these simple steps below.
          </p>
          <div className="h-[1px] w-24 bg-accent/40 mx-auto mt-8"></div>
        </motion.div>

        {/* How it works strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-6 mb-16 mt-10"
        >
          {[
            { step: '1', label: 'Print the card below', icon: '🖨️' },
            { step: '2', label: 'Scan the QR code', icon: '📱' },
            { step: '3', label: 'Point camera at the marker', icon: '🎯' },
            { step: '4', label: 'The 3D model appears!', icon: '✨' },
          ].map(({ step, label, icon }) => (
              <div key={step} className="flex sm:flex-col items-center gap-3 sm:text-center sm:gap-2">
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 text-accent font-bold text-base flex items-center justify-center flex-shrink-0">{icon}</div>
                <p className="text-gray-200 text-sm font-medium">{label}</p>
              </div>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => {
            const arUrl = `${BASE_URL}/ar-tracker.html?model=${encodeURIComponent(model.file)}&scale=0.5&name=${encodeURIComponent(model.title)}`;
            const qrUrl = getQRCodeUrl(arUrl, 280);

            return (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 * index }}
                className="bg-[#0e0e0e] border border-white/8 rounded-2xl overflow-hidden hover:border-accent/30 transition-all shadow-2xl"
              >
                {/* Property Image */}
                <div className="h-56 relative overflow-hidden">
                  <img src={model.thumbnail} alt={model.title} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <h2 className="text-white font-serif text-xl">{model.title}</h2>
                    <p className="text-gray-400 text-xs">{model.description}</p>
                  </div>
                </div>

                {/* QR + Marker side by side */}
                <div className="p-6 flex gap-5 items-start">
                  {/* QR Code */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="p-2 rounded-xl bg-[#0d0d0d] border border-white/10">
                      <img
                        src={qrUrl}
                        alt={`QR code for ${model.title}`}
                        className="w-32 h-32 rounded-lg"
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Step 1: Scan</span>
                </div>

                  {/* Arrow */}
                  <div className="flex items-center self-center text-accent mt-[-12px]">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>

                  {/* Tracking Marker */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="p-2 rounded-xl border border-white/20 bg-white">
                      <img
                        src={hiroMarkerUrl}
                        alt="Tracking Pattern"
                        className="w-32 h-32 rounded-lg"
                      />
                    </div>
                    <span className="text-[10px] text-accent uppercase tracking-widest">Step 2: Point at Pattern</span>
                  </div>
                </div>

                {/* Direct AR URL */}
                <div className="px-6 pb-5">
                  <button
                    onClick={() => window.open(arUrl, '_blank')}
                    className="mt-3 w-full py-3 rounded-xl border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-black transition-all"
                  >
                    Open AR Now →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Print tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 text-center p-8 rounded-2xl border border-white/5 bg-[#0e0e0e]"
        >
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">💡 Tip</p>
          <p className="text-gray-300 font-light leading-relaxed max-w-xl mx-auto text-base">
            For best results, print the <strong className="text-white">Aura Marker</strong> on a piece of white paper, at least the size of your hand. Place it on a flat surface, then point your phone camera at it — the 3D model will pop right up!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
