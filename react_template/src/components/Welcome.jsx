import React from 'react';
import { Link } from 'react-router-dom';
import Button from './common/Button';

const Welcome = () => {
  const quizAnswers = localStorage.getItem('quizAnswers');
  const isReturningUser = Boolean(quizAnswers);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      {isReturningUser ? (
        <div className="space-y-6 max-w-xl">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back! 👋
          </h1>
          <p className="text-xl text-gray-600">
            We're glad to see you again. Redirecting you to your conversation...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 max-w-xl">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Your Safe Space
          </h1>
          <p className="text-xl text-gray-600">
            A place where you can openly share your thoughts and feelings. Let's start with a brief questionnaire to understand how we can best support you.
          </p>
          <div className="pt-4">
            <Link to="/quiz">
              <Button>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;