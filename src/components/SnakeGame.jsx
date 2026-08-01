import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './SnakeGame.module.css';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  const snakeRef = useRef([{x: 10, y: 10}]);
  const foodRef = useRef({x: 5, y: 5});
  const dirRef = useRef({x: 0, y: 0});
  const intervalRef = useRef(null);

  const grid = 20; // 20x20 grid

  const startGame = () => {
    snakeRef.current = [{x: 10, y: 10}];
    foodRef.current = {x: Math.floor(Math.random() * grid), y: Math.floor(Math.random() * grid)};
    dirRef.current = {x: 0, y: 0};
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
  };

  const handleKeyDown = useCallback((e) => {
    const dir = dirRef.current;
    if (e.key === 'ArrowUp' && dir.y === 0) dirRef.current = {x: 0, y: -1};
    if (e.key === 'ArrowDown' && dir.y === 0) dirRef.current = {x: 0, y: 1};
    if (e.key === 'ArrowLeft' && dir.x === 0) dirRef.current = {x: -1, y: 0};
    if (e.key === 'ArrowRight' && dir.x === 0) dirRef.current = {x: 1, y: 0};
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isRunning) return;
    
    intervalRef.current = setInterval(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const snake = snakeRef.current;
      const food = foodRef.current;
      const dir = dirRef.current;

      // Move snake
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      
      // Check collisions
      if (head.x < 0 || head.x >= grid || head.y < 0 || head.y >= grid || snake.some(s => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        setIsRunning(false);
        clearInterval(intervalRef.current);
        return;
      }

      snake.unshift(head);

      // Check food
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        foodRef.current = {x: Math.floor(Math.random() * grid), y: Math.floor(Math.random() * grid)};
      } else {
        snake.pop();
      }

      // Draw
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00F7FF'; // Food color
      ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
      
      ctx.fillStyle = '#FF0087'; // Snake color
      snake.forEach(s => ctx.fillRect(s.x * 20, s.y * 20, 18, 18));
      
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.scoreBoard}`}>
        <span>Score: <strong>{score}</strong></span>
        <button className={styles.btn} onClick={startGame}>{gameOver ? '🔄 Restart' : '▶️ Start'}</button>
      </div>
      <canvas 
        ref={canvasRef} 
        width="400" 
        height="400" 
        className={`liquid-glass ${styles.canvas}`}
        style={{ border: '2px solid var(--glass-border)' }}
      />
      {gameOver && <h2 className={styles.gameOverText}>Game Over! Score: {score}</h2>}
      <p className={styles.helpText}>Use Arrow Keys on desktop. (Swipe controls coming soon!)</p>
    </div>
  );
};

export default SnakeGame;
