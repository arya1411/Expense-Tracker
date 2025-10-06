import React from 'react';
import './SplitText.css';

export default function SplitText({ text, className = '' }) {
  const letters = text.split('');

  return (
    <span className="split-text">
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`split-text-letter ${className}`}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
}
