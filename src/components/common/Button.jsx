// src/components/common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 bg-gradient-to-r from-primary-green to-primary-pink
        rounded-full text-gray-800 font-semibold
        transform transition-all duration-300
        hover:scale-105 hover:shadow-lg
        active:scale-95
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;