export default function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-40 gap-6">
      {/* Pure CSS spinner — no JS needed */}
      <div
        style={{
          width: 48, height: 48,
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#D4AF37',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: '#777', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
        Loading model...
      </p>
    </div>
  );
}
