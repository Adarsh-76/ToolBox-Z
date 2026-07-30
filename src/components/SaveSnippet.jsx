import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './SaveSnippet.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;

const SaveSnippet = ({ tool, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!title || !content) {
      setError('Please provide a title and paste your result.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to save results.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/snippets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          toolId: tool.id,
          toolName: tool.name,
          toolIcon: tool.icon,
          title,
          content
        })
      });
      const data = await res.json();
      if (data.success) {
        onClose();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to connect to server.');
    }
    setLoading(false);
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={`liquid-glass ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>💾 Save to Workspace</h3>
          <button className={styles.closeBtn} onClick={onClose}>✖</button>
        </div>

        <div className={styles.toolInfo}>
          <span className={styles.icon}>{tool.icon}</span>
          <span>Saving from: <strong>{tool.name}</strong></span>
        </div>

        <div className={styles.formGroup}>
          <label>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className={styles.input} 
            placeholder="e.g., My Website QR Code" 
          />
        </div>

        <div className={styles.formGroup}>
          <label>Result Data (Paste here)</label>
          <textarea 
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Copy the result from the tool above and paste it here..."
            rows="6"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.saveBtn} onClick={handleSave} disabled={loading}>
          {loading ? '⏳ Saving...' : '💾 Save Permanently'}
        </button>
      </div>
    </div>,
    document.body
  );
};

export default SaveSnippet;
