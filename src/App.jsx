import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Viewer from './pages/Viewer';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/viewer/:modelId" element={<Viewer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
