import React, { useState, useEffect } from 'react';
import styles from './MemoryGame.module.css';

const emojis = ['🚀', '🎮', '🎨', '🦄', '🌟', '🔥', '🍕', '👾'];

const shuffleCards = () => {
  const cards = [...emojis, ...emojis];
  return cards.sort(() => Math.random() - 0.5).map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
};

const MemoryGame = () => {
  const [cards, setCards] = useState(shuffleCards());
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || cards[index].flipped || cards[index].matched) return;
    
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setCards(matchedCards);
          setFlipped([]);
          if (matchedCards.every(c => c.matched)) setWon(true);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setCards(resetCards);
          setFlipped([]);
        }, 800);
      }
    }
  };

  const resetGame = () => {
    setCards(shuffleCards());
    setFlipped([]);
    setMoves(0);
    setWon(false);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.header}`}>
        <span>Moves: <strong>{moves}</strong></span>
        <button className={styles.btn} onClick={resetGame}>🔄 New Game</button>
      </div>
      <div className={styles.grid}>
        {cards.map((card, i) => (
          <div 
            key={card.id} 
            className={`${styles.card} ${card.flipped || card.matched ? styles.flipped : ''}`}
            onClick={() => handleCardClick(i)}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>?</div>
              <div className={styles.cardBack}>{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>
      {won && <h2 className={styles.winText}>🎉 You Won in {moves} moves!</h2>}
    </div>
  );
};

export default MemoryGame;
