import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Therapist from './components/Therapist';
import Welcome from './components/Welcome';
import Breathing from './components/animations/Breathing';
import Resources from './components/Resources';  // Add this import

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-green/20 to-white">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/therapist" element={<Therapist />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;