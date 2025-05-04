// src/components/common/Progress.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Question {current} of {total}</span>
        <span className="text-sm font-medium">{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-green to-primary-pink transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

Progress.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Progress;