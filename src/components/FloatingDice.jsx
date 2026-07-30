import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './FloatingDice.module.css';

const FloatingDice = () => {
  const navigate = useNavigate();
  const [isRolling, setIsRolling] = useState(false);

  const handleRandomTool = () => {
    if (isRolling) return;

    setIsRolling(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * toolsList.length);
      const randomTool = toolsList[randomIndex];
      navigate(`/tools/${randomTool.id}`);
      setIsRolling(false);
    }, 600);
  };

  return (
    <button 
      className={`${styles.diceBtn} ${isRolling ? styles.rolling : ''}`} 
      onClick={handleRandomTool}
      title="Roll for a Random Tool!"
      aria-label="Open a random tool"
    >
      🎲
    </button>
  );
};

export default FloatingDice;
