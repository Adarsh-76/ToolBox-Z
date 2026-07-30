import React, { useState, useEffect } from 'react';
import styles from './Comments.module.css';

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'http://' + window.location.hostname + ':5000';

const Comments = ({ toolId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    fetchComments();
  }, [toolId]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${toolId}`);
      const data = await response.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (err) {
      setError('Failed to load comments.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${toolId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: newComment.trim() })
      });

      const data = await response.json();
      if (data.success) {
        setComments(prev => [data.comment, ...prev]);
        setNewComment('');
      } else {
        setError(data.error || 'Failed to post comment.');
      }
    } catch (err) {
      setError('Failed to connect to server.');
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setComments(prev => prev.filter(c => c.id !== commentId));
      } else {
        setError(data.error || 'Failed to delete comment.');
      }
    } catch (err) {
      setError('Failed to connect to server.');
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>💬 Comments & Discussion</h3>
      
      {error && <div className={styles.errorBox}>{error}</div>}

      {user ? (
        <form className={styles.commentForm} onSubmit={handleSubmit}>
          <div className={styles.userBadge}>
            <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
            <span>{user.name}</span>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            required
          />
          <button type="submit" className={styles.submitBtn} disabled={!newComment.trim()}>
            Post Comment
          </button>
        </form>
      ) : (
        <div className={`liquid-glass ${styles.loginPrompt}`}>
          <p>You need to be logged in to leave a comment.</p>
        </div>
      )}

      <div className={styles.commentsList}>
        {isLoading ? (
          <p className={styles.loadingText}>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className={styles.emptyText}>No comments yet. Be the first to share!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={`liquid-glass ${styles.commentCard}`}>
              <div className={styles.commentHeader}>
                <div className={styles.avatar}>{comment.userName.charAt(0).toUpperCase()}</div>
                <div className={styles.commentMeta}>
                  <span className={styles.commentAuthor}>{comment.userName}</span>
                  <span className={styles.commentTime}>{formatTime(comment.createdAt)}</span>
                </div>
                {user && user.id === comment.userId && (
                  <button className={styles.deleteBtn} onClick={() => handleDelete(comment.id)}>
                    🗑️
                  </button>
                )}
              </div>
              <p className={styles.commentText}>{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
