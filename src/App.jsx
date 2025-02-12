import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './Components/Navbar';
import AnimatedRoutes from './Components/AnimatedRoutes';  // 🔹 Import animated routes

function App() {
  document.body.style.overflow = 'hidden';
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
