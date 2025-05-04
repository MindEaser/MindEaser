// src/components/common/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, content, className = '' }) => {
  return (
    <div
      className={`
        bg-white/90 rounded-2xl p-6
        transform transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        ${className}
      `}
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Card;