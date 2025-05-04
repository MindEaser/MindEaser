// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './common/Button';
import Card from './common/Card';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-quicksand font-bold text-gray-800 mb-6">
          You're Not Alone. Let's Talk.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
          Take a short quiz to understand how you feel and meet your AI therapist.
        </p>
        <Button
          onClick={() => navigate('/quiz')}
          className="animate-pulse hover:animate-none"
        >
          Get Started
        </Button>
      </div>

      {/* Why Mental Health Matters */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-quicksand font-bold text-center mb-12">
            Why Mental Health Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Self-Discovery"
              content="Understand yourself better through guided conversations and assessments."
            />
            <Card
              title="24/7 Support"
              content="Access therapeutic support whenever you need it, day or night."
            />
            <Card
              title="Personal Growth"
              content="Develop coping strategies and build emotional resilience."
            />
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-quicksand font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Quick Quiz', 'AI Therapist', 'Mini-Games', 'Tips & Resources'].map((item) => (
              <div
                key={item}
                className="bg-white/90 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;