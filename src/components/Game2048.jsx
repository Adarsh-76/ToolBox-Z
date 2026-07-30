import React, { useState, useEffect, useCallback } from 'react';
import styles from './Game2048.module.css';

const SIZE = 4;
const createEmptyBoard = () => Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));

const addRandomTile = (board) => {
  const empty = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) empty.push([r, c]);
    }
  }
  if (empty.length === 0) return board;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  board[r][c] = Math.random() < 0.9 ? 2 : 4;
  return board;
};

const initBoard = () => {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

const slide = (row) => {
  let arr = row.filter(val => val !== 0);
  let missing = SIZE - arr.length;
  let zeros = Array(missing).fill(0);
  return arr.concat(zeros);
};

// FIXED: Now returns the score gained from merging
const combine = (row) => {
  let gained = 0;
  for (let i = 0; i < SIZE - 1; i++) {
    if (row[i] === row[i + 1] && row[i] !== 0) {
      row[i] *= 2;
      row[i + 1] = 0;
      gained += row[i]; // Add the new tile value to the score
    }
  }
  return { row, gained };
};

const operate = (board) => {
  let totalGained = 0;
  const newBoard = board.map(row => {
    let slid = slide(row);
    let res = combine(slid);
    totalGained += res.gained;
    return slide(res.row);
  });
  return { newBoard, totalGained };
};

const reverse = (board) => board.map(row => [...row].reverse());

const transpose = (board) => {
  let newBoard = createEmptyBoard();
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      newBoard[c][r] = board[r][c];
    }
  }
  return newBoard;
};

const isGameOver = (board) => {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) return false;
      if (c < SIZE - 1 && board[r][c] === board[r][c + 1]) return false;
      if (r < SIZE - 1 && board[r][c] === board[r + 1][c]) return false;
    }
  }
  return true;
};

const Game2048 = () => {
  const [board, setBoard] = useState(initBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(Number(localStorage.getItem('2048-best')) || 0);
  const [gameOver, setGameOver] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const handleKeyDown = useCallback((e) => {
    if (gameOver) return;
    let result;
    let moved = false;

    const checkMoved = (b1, b2) => JSON.stringify(b1) !== JSON.stringify(b2);

    if (e.key === 'ArrowLeft') {
      result = operate(board);
      if (checkMoved(board, result.newBoard)) moved = true;
    } else if (e.key === 'ArrowRight') {
      result = operate(reverse(board));
      result.newBoard = reverse(result.newBoard);
      if (checkMoved(board, result.newBoard)) moved = true;
    } else if (e.key === 'ArrowUp') {
      result = operate(transpose(board));
      result.newBoard = transpose(result.newBoard);
      if (checkMoved(board, result.newBoard)) moved = true;
    } else if (e.key === 'ArrowDown') {
      result = operate(reverse(transpose(board)));
      result.newBoard = transpose(reverse(result.newBoard));
      if (checkMoved(board, result.newBoard)) moved = true;
    }

    if (moved) {
      const finalBoard = addRandomTile(result.newBoard);
      setBoard(finalBoard);
      
      const newScore = score + result.totalGained;
      setScore(newScore);
      
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem('2048-best', newScore);
      }
      
      if (isGameOver(finalBoard)) setGameOver(true);
    }
  }, [board, score, bestScore, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    let key;
    if (absX > absY) {
      key = dx > 0 ? 'ArrowRight' : 'ArrowLeft';
    } else {
      key = dy > 0 ? 'ArrowDown' : 'ArrowUp';
    }
    handleKeyDown({ key });
    setTouchStart(null);
  };

  const handleRestart = () => {
    setBoard(initBoard());
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.scoreBox}>
          <span>Score</span>
          <strong>{score}</strong>
        </div>
        <div className={styles.scoreBox}>
          <span>Best</span>
          <strong>{bestScore}</strong>
        </div>
        <button className={styles.restartBtn} onClick={handleRestart}>🔄 New Game</button>
      </div>

      <div 
        className={`liquid-glass ${styles.board}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {board.map((row, r) => (
          <div key={r} className={styles.row}>
            {row.map((val, c) => (
              <div key={c} className={`${styles.cell} ${val > 0 ? styles[`tile${val}`] : ''}`}>
                {val > 0 && val}
              </div>
            ))}
          </div>
        ))}
        {gameOver && (
          <div className={styles.gameOverOverlay}>
            <h2>Game Over!</h2>
            <button className={styles.playAgainBtn} onClick={handleRestart}>Play Again</button>
          </div>
        )}
      </div>
      <p className={styles.hint}>Use Arrow Keys (Desktop) or Swipe (Mobile) to play.</p>
    </div>
  );
};

export default Game2048;
