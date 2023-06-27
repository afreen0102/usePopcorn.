import React from 'react'

const Button = ({onIsOpen, isOpen}) => {
    return (
        <button
                className="btn-toggle"
                onClick={() => onIsOpen((open) => !open)}
              >
                {isOpen ? "–" : "+"}
              </button>
      );
}

export default Button
