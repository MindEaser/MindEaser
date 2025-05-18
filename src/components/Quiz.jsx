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

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save answers and timestamp to localStorage
      localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
      localStorage.setItem('quizTimestamp', Date.now().toString());
      navigate('/therapist');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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
      <Progress current={currentQuestion + 1} total={questions.length} />
      
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl p-8 shadow-xl mt-8">
        <h2 className="text-2xl font-semibold mb-6">
          {questions[currentQuestion]}
        </h2>
        
        <div className="space-y-4">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full p-4 text-left rounded-xl bg-white hover:bg-primary-green/20 
                       transition-colors border-2 border-primary-green/30"
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
      </div>
    </div>
  );
};

export default Quiz;