import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Viewer from './pages/Viewer';
import Services from './pages/Services';
import Journal from './pages/Journal';
import QRCodes from './pages/QRCodes';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/viewer/:modelId" element={<Viewer />} />
          <Route path="/services" element={<><Navbar /><Services /></>} />
          <Route path="/journal" element={<><Navbar /><Journal /></>} />
          <Route path="/qr-codes" element={<><Navbar /><QRCodes /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

