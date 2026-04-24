import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { models } from '../data/models';
import Loader from '../components/Loader';

export default function Viewer() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autoAR, setAutoAR] = useState(false);
  const [isVRModalOpen, setIsVRModalOpen] = useState(false);
  const modelRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    
    // Check if auto-AR is requested via query params (e.g. ?ar=true)
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('ar') === 'true') {
      setAutoAR(true);
    }
    
    const foundModel = models.find(m => m.id === modelId);
    if (foundModel) {
      setModel(foundModel);
    } else {
      setLoading(false);
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [modelId, location]);

  useEffect(() => {
    const viewer = modelRef.current;
    if (viewer) {
      const handleLoad = () => setLoading(false);
      viewer.addEventListener('load', handleLoad);
      // Fallback
      setTimeout(handleLoad, 3000);
      return () => viewer.removeEventListener('load', handleLoad);
    }
  }, [model]);

  if (!model && !loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-primary px-4">
        <h2 className="text-3xl font-bold mb-4">Model not available</h2>
        <p className="text-secondary mb-8">The property you are looking for does not exist.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-accent text-background px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:shadow-accent/50 transition-shadow"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      <div className="absolute top-0 w-full p-6 flex items-center justify-between z-30 pointer-events-none">
        <button 
          onClick={() => navigate('/')}
          className="pointer-events-auto bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Go Back"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-white text-xl font-bold tracking-widest uppercase text-center flex-1 pr-12 drop-shadow-md">
          {model?.title}
        </h1>
      </div>

      {loading && <Loader />}

      {autoAR && !loading && (
        <div 
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => {
            setAutoAR(false);
            if (modelRef.current) {
              modelRef.current.activateAR();
            }
          }}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center p-6"
          >
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 animate-pulse shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-white text-3xl font-bold mb-4">Tap to View in Space</h2>
            <p className="text-gray-300 max-w-xs text-sm">Tap anywhere to instantly place this model in your room using AR.</p>
          </motion.div>
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full"
      >
        {model && (
          <model-viewer
            ref={modelRef}
            src={model.file}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            auto-rotate
            shadow-intensity="1"
            exposure="1"
            style={{ width: '100%', height: '100%', backgroundColor: '#0B0B0B' }}
          >
            <button 
              slot="ar-button" 
              className="absolute bottom-[160px] left-1/2 -translate-x-1/2 bg-accent text-background font-bold py-4 px-10 rounded-full shadow-lg shadow-accent/20 text-sm uppercase tracking-[0.2em] whitespace-nowrap w-full max-w-[280px] z-30"
            >
              View in Room
            </button>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 w-full px-6 pointer-events-none">
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const modelUrl = new URL(model.file, window.location.origin).href;
                  window.location.href = `/ar-tracker.html?model=${encodeURIComponent(modelUrl)}&scale=0.02`;
                }}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3 px-8 rounded-full shadow-lg text-xs uppercase tracking-[0.1em] whitespace-nowrap w-full max-w-[280px] hover:bg-white/20 transition-colors pointer-events-auto"
              >
                View on QR/Marker
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsVRModalOpen(true);
                }}
                className="bg-black/40 backdrop-blur-md border border-accent/30 text-accent font-bold py-3 px-8 rounded-full shadow-lg text-xs uppercase tracking-[0.1em] whitespace-nowrap w-full max-w-[280px] hover:bg-accent/20 transition-colors flex items-center justify-center gap-2 pointer-events-auto"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Enter VR
              </button>
            </div>
            <div id="ar-prompt">
              <img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="AR prompt" />
            </div>
          </model-viewer>
        )}
      </motion.div>

      {/* Subscription Modal for VR */}
      {isVRModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsVRModalOpen(false)}
          ></div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl z-10"
          >
            <button 
              onClick={() => setIsVRModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Premium VR Experience</h2>
              <p className="text-gray-400">Virtual Reality walkthroughs are an exclusive feature for our subscribed members. Upgrade to unlock full immersion.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Pro Plan */}
              <div className="bg-black border border-white/10 rounded-xl p-6 flex flex-col hover:border-accent/50 transition-colors">
                <h3 className="text-xl font-bold text-white mb-1">Pro Explorer</h3>
                <div className="text-3xl font-bold text-accent mb-4">$19<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                <ul className="text-sm text-gray-400 space-y-3 mb-8 flex-1">
                  <li className="flex gap-2"><svg className="text-accent w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Full VR Headset Support</li>
                  <li className="flex gap-2"><svg className="text-accent w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 4K Texture Resolution</li>
                  <li className="flex gap-2"><svg className="text-accent w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 10 VR sessions/month</li>
                </ul>
                <button className="w-full py-3 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-colors">
                  Choose Pro
                </button>
              </div>

              {/* Elite Plan */}
              <div className="bg-gradient-to-b from-accent/20 to-black border border-accent rounded-xl p-6 flex flex-col relative shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                <div className="absolute top-0 right-0 bg-accent text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">POPULAR</div>
                <h3 className="text-xl font-bold text-white mb-1">Elite Agent</h3>
                <div className="text-3xl font-bold text-accent mb-4">$49<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                <ul className="text-sm text-gray-400 space-y-3 mb-8 flex-1">
                  <li className="flex gap-2"><svg className="text-accent w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Unlimited VR Sessions</li>
                  <li className="flex gap-2"><svg className="text-accent w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 8K Texture Resolution</li>
                  <li className="flex gap-2"><svg className="text-accent w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Client Presentation Mode</li>
                  <li className="flex gap-2"><svg className="text-accent w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Custom Branding</li>
                </ul>
                <button className="w-full py-3 rounded-lg bg-accent text-black font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-shadow">
                  Upgrade to Elite
                </button>
              </div>
            </div>
            
            {/* For testing, hidden backdoor to actually open VR */}
            <div className="text-center mt-6">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const modelUrl = new URL(model.file, window.location.origin).href;
                  window.location.href = `/vr-viewer.html?model=${encodeURIComponent(modelUrl)}`;
                }}
                className="text-xs text-gray-600 hover:text-gray-400 underline decoration-gray-600"
              >
                (Dev Test: Bypass to VR)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
