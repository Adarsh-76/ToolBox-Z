import React, { useState, useEffect, useRef } from 'react';
import styles from './BreakoutGame.module.css';

const BreakoutGame = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  const gameState = useRef({
    ball: { x: 200, y: 300, dx: 4, dy: -4 },
    paddle: { x: 160, width: 80, height: 10 },
    bricks: [],
    rightPressed: false,
    leftPressed: false
  });

  const initBricks = () => {
    const bricks = [];
    for (let c = 0; c < 5; c++) {
      for (let r = 0; r < 5; r++) {
        bricks.push({ x: r * 75 + 15, y: c * 20 + 30, status: 1 });
      }
    }
    return bricks;
  };

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setIsRunning(true);
    gameState.current = {
      ball: { x: 200, y: 300, dx: 4, dy: -4 },
      paddle: { x: 160, width: 80, height: 10 },
      bricks: initBricks(),
      rightPressed: false,
      leftPressed: false
    };
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') gameState.current.rightPressed = true;
      if (e.key === 'ArrowLeft') gameState.current.leftPressed = true;
    };
    const handleKeyUp = (e) => {
      if (e.key === 'ArrowRight') gameState.current.rightPressed = false;
      if (e.key === 'ArrowLeft') gameState.current.leftPressed = false;
    };
    
    // Touch move logic for mobile
    const handleTouchMove = (e) => {
      e.preventDefault(); // Prevent scrolling
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // Calculate finger X relative to canvas
      const touchX = e.touches[0].clientX - rect.left;
      // Scale to canvas internal width
      const scaleX = canvas.width / rect.width;
      const scaledX = touchX * scaleX;
      
      gameState.current.paddle.x = scaledX - (gameState.current.paddle.width / 2);
      
      // Keep in bounds
      if (gameState.current.paddle.x < 0) gameState.current.paddle.x = 0;
      if (gameState.current.paddle.x + gameState.current.paddle.width > canvas.width) {
        gameState.current.paddle.x = canvas.width - gameState.current.paddle.width;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    const canvas = canvasRef.current;
    canvas?.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas?.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const draw = () => {
      const { ball, paddle, bricks } = gameState.current;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#00F7FF';
      ctx.fill();
      ctx.closePath();
      
      // Draw paddle
      ctx.beginPath();
      ctx.rect(paddle.x, canvas.height - 20, paddle.width, paddle.height);
      ctx.fillStyle = '#FF0087';
      ctx.fill();
      ctx.closePath();
      
      // Draw bricks
      bricks.forEach(b => {
        if (b.status === 1) {
          ctx.beginPath();
          ctx.rect(b.x, b.y, 65, 15);
          ctx.fillStyle = '#B0FFFA';
          ctx.fill();
          ctx.closePath();
        }
      });

      // Move paddle (Keyboard)
      if (gameState.current.rightPressed && paddle.x < canvas.width - paddle.width) paddle.x += 7;
      else if (gameState.current.leftPressed && paddle.x > 0) paddle.x -= 7;

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collision
      if (ball.x > canvas.width - 8 || ball.x < 8) ball.dx = -ball.dx;
      if (ball.y < 8) ball.dy = -ball.dy;
      
      // Paddle collision
      if (ball.y > canvas.height - 20 && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
      }
      
      // Bottom collision (lose life)
      if (ball.y > canvas.height) {
        setLives(prev => {
          if (prev <= 1) {
            setGameOver(true);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
        ball.x = 200;
        ball.y = 300;
        ball.dx = 4;
        ball.dy = -4;
      }

      // Brick collision
      bricks.forEach(b => {
        if (b.status === 1 && ball.x > b.x && ball.x < b.x + 65 && ball.y > b.y && ball.y < b.y + 15) {
          ball.dy = -ball.dy;
          b.status = 0;
          setScore(prev => prev + 10);
        }
      });

      if (bricks.every(b => b.status === 0)) {
        setGameOver(true);
        setIsRunning(false);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
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
      <div className={`liquid-glass ${styles.header}`}>
        <span>Score: <strong>{score}</strong></span>
        <span>Lives: <strong>{'❤️'.repeat(lives)}</strong></span>
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
      />
      {gameOver && <h2 className={styles.gameOverText}>{score === 250 ? '🎉 You Won!' : 'Game Over!'}</h2>}
      <p className={styles.helpText}>Use Arrow Keys or drag your finger on the screen to move the paddle.</p>
    </div>
  );
};

export default BreakoutGame;
