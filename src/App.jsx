import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Therapist from './components/Therapist';
import Welcome from './components/Welcome';
import Breathing from './components/animations/Breathing';

const WelcomeWrapper = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const quizAnswers = localStorage.getItem('quizAnswers');
    if (quizAnswers) {
      // If quiz is already completed, show welcome back message and redirect to therapist
      const delay = setTimeout(() => {
        navigate('/therapist');
      }, 2000); // Redirect after 2 seconds
      return () => clearTimeout(delay);
    }
  }, [navigate]);

  return <Welcome />;
};

const QuizWrapper = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const quizAnswers = localStorage.getItem('quizAnswers');
    if (quizAnswers) {
      navigate('/therapist');
    }
  }, [navigate]);

  return <Quiz />;
};

const TherapistWrapper = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const quizAnswers = localStorage.getItem('quizAnswers');
    if (!quizAnswers) {
      navigate('/quiz');
    }
  }, [navigate]);

  return <Therapist />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-green/20 to-white">
        <Routes>
          <Route path="/" element={<WelcomeWrapper />} />
          <Route path="/quiz" element={<QuizWrapper />} />
          <Route path="/therapist" element={<TherapistWrapper />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;