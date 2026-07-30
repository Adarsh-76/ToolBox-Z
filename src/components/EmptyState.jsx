import React from 'react';
import styles from './EmptyState.module.css';

const EmptyState = ({ icon, title, description, actionText, onAction }) => {
  return (
    <div className={`liquid-glass ${styles.container}`}>
      <div className={styles.iconWrapper}>{icon}</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      
      {actionText && onAction && (
        <button className={styles.actionBtn} onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
