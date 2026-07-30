import React, { useState, useEffect } from 'react';
import styles from './BetaFeedback.module.css';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'http://' + window.location.hostname + ':5000';

const BetaFeedback = ({ toolId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const betaToolId = `beta_${toolId}`;

  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/comments/${betaToolId}`);
      const data = await res.json();
      if (data.success) setComments(data.comments);
    } catch (err) {
      setError('Failed to load feedback.');
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to submit feedback.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/comments/${betaToolId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      if (data.success) {
        setComments([data.comment, ...comments]);
        setText('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to post feedback.');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🧪 Beta Feedback & Feature Requests</h3>
      <p className={styles.subtitle}>Help us improve this experimental tool! Report bugs or suggest features below.</p>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea 
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Report a bug or request a feature..."
          rows="3"
        />
        <button type="submit" className={styles.submitBtn} disabled={loading || !text.trim()}>
          {loading ? 'Posting...' : 'Submit Feedback'}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p className={styles.empty}>No feedback yet. Be the first to suggest something!</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className={styles.commentCard}>
              <div className={styles.commentHeader}>
                <span className={styles.avatar}>{c.userName.charAt(0).toUpperCase()}</span>
                <span className={styles.userName}>{c.userName}</span>
                <span className={styles.date}>{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className={styles.text}>{c.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BetaFeedback;
