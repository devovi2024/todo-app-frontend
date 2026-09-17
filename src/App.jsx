// client/src/App.jsx
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';

export default function App() {
  return <div className="min-h-screen"><Navbar /><main className="mx-auto max-w-4xl px-4 py-8 sm:px-6"><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /></Routes></main></div>;
}
