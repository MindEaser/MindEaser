// src/components/animations/Breathing.jsx
import React, { useState, useEffect } from 'react';

const Breathing = () => {
  const [phase, setPhase] = useState('inhale');
  const [count, setCount] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          setPhase((currentPhase) => {
            switch (currentPhase) {
              case 'inhale':
                return 'hold';
              case 'hold':
                return 'exhale';
              case 'exhale':
                return 'inhale';
              default:
                return 'inhale';
            }
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`
          w-32 h-32 rounded-full
          flex items-center justify-center
          text-2xl font-bold text-gray-800
          transition-all duration-1000
          ${phase === 'inhale' ? 'scale-150 bg-primary-green' :
            phase === 'hold' ? 'scale-125 bg-primary-pink' :
            'scale-100 bg-primary-green'}
        `}
      >
        {count}
      </div>
      <p className="mt-4 text-xl font-semibold">
        {phase.charAt(0).toUpperCase() + phase.slice(1)}...
      </p>
    </div>
  );
};

export default Breathing;