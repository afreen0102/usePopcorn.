import React from 'react'
import Button from './Button';
import { useState } from 'react';

const Box = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
  
    return (
      <div className="box">
            <Button isOpen={isOpen} onIsOpen={setIsOpen}/> 
            {isOpen && (
              children
            )}
          </div>
    );
}

export default Box
