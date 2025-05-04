// src/components/Quiz.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './common/Button';
import Progress from './common/Progress';

const questions = [
  "Do you ever feel uneasy",
  "Do you find yourself unwilling to do work",
  "Do you avoid talking to people",
  "Are you having trouble enjoying things you usually like",
  "Are you able to sleep properly and at a reasonable time",
  "Do you have trouble making decisions",
  "Do you blame yourself for things that aren't your fault",
  "Are you unable to talk to those close to you about how you are feeling",
  "Do you try to suppress your thoughts at times",
  "Do you feel more irritated or frustrated than usual",
  "Have you been isolating yourself from friends or family",
  "Do you feel tired all the time",
  "Do you feel like crying for no clear reason",
  "Do you feel overwhelmed over small things",
  "Have you been zoning out often",
  "Do you feel unmotivated to start your day",
  "Do you find yourself sighing a lot without realising",
  "Do you find it hard to talk to people about what's bothering you",
  "Do you feel as though you have some weight on your shoulders",
  "Do you ever feel as though your emotions are too much to handle"
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