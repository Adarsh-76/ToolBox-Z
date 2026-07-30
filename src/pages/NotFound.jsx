import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.card}`}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.text}>
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <button className={styles.btn} onClick={() => navigate('/')}>
          🏠 Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
