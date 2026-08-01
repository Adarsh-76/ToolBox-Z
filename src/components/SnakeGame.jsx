import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './SnakeGame.module.css';

const SnakeGame = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  const snakeRef = useRef([{x: 10, y: 10}]);
  const foodRef = useRef({x: 5, y: 5});
  const dirRef = useRef({x: 0, y: 0});
  const intervalRef = useRef(null);
  const touchStartRef = useRef({x: 0, y: 0});

  const grid = 20; // 20x20 grid

  const startGame = () => {
    snakeRef.current = [{x: 10, y: 10}];
    foodRef.current = {x: Math.floor(Math.random() * grid), y: Math.floor(Math.random() * grid)};
    dirRef.current = {x: 0, y: 0}; // Start with no direction
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
  };

  const handleDirectionChange = useCallback((newDir) => {
    const dir = dirRef.current;
    // Prevent reversing directly into itself
    if (newDir.x !== 0 && dir.x === 0) dirRef.current = newDir;
    if (newDir.y !== 0 && dir.y === 0) dirRef.current = newDir;
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp') handleDirectionChange({x: 0, y: -1});
    if (e.key === 'ArrowDown') handleDirectionChange({x: 0, y: 1});
    if (e.key === 'ArrowLeft') handleDirectionChange({x: -1, y: 0});
    if (e.key === 'ArrowRight') handleDirectionChange({x: 1, y: 0});
  }, [handleDirectionChange]);

  const handleTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e) => {
    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const dx = touchEnd.x - touchStartRef.current.x;
    const dy = touchEnd.y - touchStartRef.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (dx > 30) handleDirectionChange({x: 1, y: 0}); // Right
      else if (dx < -30) handleDirectionChange({x: -1, y: 0}); // Left
    } else {
      // Vertical swipe
      if (dy > 30) handleDirectionChange({x: 0, y: 1}); // Down
      else if (dy < -30) handleDirectionChange({x: 0, y: -1}); // Up
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isRunning) return;
    
    intervalRef.current = setInterval(() => {
      const dir = dirRef.current;
      // FIX: Do not run collision logic if the snake hasn't started moving yet
      if (dir.x === 0 && dir.y === 0) return; 

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const snake = snakeRef.current;
      const food = foodRef.current;

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
      
    }, 120);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={`liquid-glass ${styles.scoreBoard}`}>
        <span>Score: <strong>{score}</strong></span>
        <div className={styles.btnGroup}>
          <button className={styles.fsBtn} onClick={toggleFullscreen} title="Fullscreen">⛶</button>
          <button className={styles.btn} onClick={startGame}>{gameOver ? '🔄 Restart' : '▶️ Start'}</button>
        </div>
      </div>
      <canvas 
        ref={canvasRef} 
        width="400" 
        height="400" 
        className={`liquid-glass ${styles.canvas}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
      {gameOver && <h2 className={styles.gameOverText}>Game Over! Score: {score}</h2>}
      {!gameOver && !isRunning && <p className={styles.helpText}>Press Start! Use Arrow Keys or Swipe to play.</p>}
      {isRunning && <p className={styles.helpText}>Swipe or use Arrow Keys.</p>}
    </div>
  );
};

export default SnakeGame;
