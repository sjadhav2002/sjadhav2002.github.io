import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  sentences: string[];
}

const Typewriter: React.FC<TypewriterProps> = ({ sentences }) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed =100;
  const waitTime =100;
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const type = () => {
      const fullText = sentences[currentSentenceIndex];
      const textLength = currentText.length;

      if (!isWaiting) {
        if (!isDeleting) {
          setCurrentText(fullText.substring(0, textLength + 1));
          if (textLength === fullText.length) {
            setIsWaiting(true);
            setTimeout(() => {
              setIsDeleting(true);
              setIsWaiting(false);
            }, waitTime);
          }
        } else {
          setCurrentText(fullText.substring(0, textLength - 1));
          if (textLength === 0) {
            setCurrentSentenceIndex((currentSentenceIndex + 1) % sentences.length);
            setIsDeleting(false);
          }
        }
      }
    };

    const typingTimer = setTimeout(type, typingSpeed);
    return () => clearTimeout(typingTimer);
  }, [currentText, currentSentenceIndex, isDeleting, isWaiting, sentences, typingSpeed, waitTime]);

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h2 style={{color:'white'}}>|{currentText}|</h2>
    </div>
  );
};

export default Typewriter;
