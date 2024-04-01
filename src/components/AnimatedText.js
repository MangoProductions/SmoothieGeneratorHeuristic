import React, { useState, useEffect } from 'react';

const AnimatedText = ({ text, startAnimation }) => {
  const [typedText, setTypedText] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    let currentCharIndex = 0;

    const intervalId = setInterval(() => {
      setTypedText(text.substring(0, currentCharIndex));
      currentCharIndex += 1;

      if (currentCharIndex > text.length) {
        clearInterval(intervalId);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [text, typingSpeed, startAnimation]); // Aloita

  // Nopeus riippuu kirjhainten määrästä
  useEffect(() => {
    const wordsCount = text.trim().split(/\s+/).length;
    const dynamicSpeed = Math.max(1, 20 - wordsCount);
    setTypingSpeed(dynamicSpeed);
  }, [text]);

  return <>{typedText}</>;
};

export default AnimatedText;
