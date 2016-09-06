import React, { PropTypes } from 'react';
import './Button.css';

const Button = ({ type, children, onClick, disabled }) => {
  return (
    <button className={`${type} button`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
