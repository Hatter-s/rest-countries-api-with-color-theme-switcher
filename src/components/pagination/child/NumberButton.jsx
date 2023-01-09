import React from "react";

export default function NumberButton({ number, current, paging, className }) {
  return (
    <button 
      className={`number-button ${className} ${current ? 'current' : ''}`}
      onClick={() => {
        paging(number);
      }}
    >
      { number }
    </button>
  )
}