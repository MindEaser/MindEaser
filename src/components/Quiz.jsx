// src/components/Quiz.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './common/Button';
import Progress from './common/Progress';

const questions = [
  "Do you feel overwhelmed by daily responsibilities?",
  "Do you have trouble sleeping, either too much or too little?",
  "Do you find it difficult to concentrate or stay focused?",
  "Do you often feel sad or down without a clear reason?",
  "Do you feel anxious, worried, or on edge?",
  "Do you avoid social situations or spending time with others?",
  "Do you feel hopeless about your future?",
  "Do you experience sudden changes in your mood?",
  "Do you feel like you're not good enough or that you're a failure?",
  "Do you struggle to enjoy activities you used to find enjoyable?",
  "Do you experience physical symptoms (like headaches or fatigue) without a medical reason?",
  "Do you feel disconnected from yourself or your surroundings?",
  "Do you feel more irritated or angry than usual?",
  "Do you find it difficult to relax or calm yourself down?",
  "Do you feel like your emotions are out of your control?",
  "Do you often overthink or dwell on past events?",
  "Do you feel like a burden to others?",
  "Do you lack motivation to complete everyday tasks?",
  "Do you struggle to maintain healthy relationships with others?",
  "Do you feel safe and secure in your current environment?"
];

const classOptions = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'A(SCI)', 'B(SCI)', 'A(com)', 'B(com)'
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(-1); // -1 means name/class step
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState(localStorage.getItem('quizName') || '');
  const [studentClass, setStudentClass] = useState(localStorage.getItem('quizClass') || '');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim() || !studentClass) {
      setError('Please enter your name and select your class.');
      return;
    }
    setError('');
    localStorage.setItem('quizName', name.trim());
    localStorage.setItem('quizClass', studentClass);
    setCurrentQuestion(0);
  };

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save answers, name, and class to localStorage
      localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
      localStorage.setItem('quizTimestamp', Date.now().toString());
      // Name and class already saved
      navigate('/therapist');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentQuestion === 0) {
      setCurrentQuestion(-1);
    }
  };

  const options = [
    { value: 1, label: "Not at all" },
    { value: 2, label: "Rarely" },
    { value: 3, label: "Sometimes" },
    { value: 4, label: "Often" },
    { value: 5, label: "Always" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Progress current={currentQuestion + 2} total={questions.length + 1} />
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl p-8 shadow-xl mt-8">
        {currentQuestion === -1 ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">Enter your details</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-primary-green/30 focus:outline-none focus:border-primary-green"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Class</label>
              <select
                value={studentClass}
                onChange={e => setStudentClass(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-primary-green/30 focus:outline-none focus:border-primary-green"
              >
                <option value="">Select your class</option>
                {classOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <Button onClick={handleStart} className="mt-2">Start Quiz</Button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              {questions[currentQuestion]}
            </h2>
            <div className="space-y-4">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full p-4 text-left rounded-xl bg-white hover:bg-primary-green/20 transition-colors border-2 border-primary-green/30"
                >
                  {option.label}
                </button>
              ))}
            </div>
            {currentQuestion > 0 && (
              <Button onClick={handleBack} className="mt-6">
                Back
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;