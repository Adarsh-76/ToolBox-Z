import React, { useState, useEffect } from 'react';
import styles from './ToolFeedback.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;

const ToolFeedback = ({ toolId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userHasFeedback, setUserHasFeedback] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    fetchFeedback();
  }, [toolId]);

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      
      const response = await fetch(`${API_BASE_URL}/api/feedback/${toolId}`, { headers });
      const data = await response.json();
      if (data.success) {
        setFeedbacks(data.feedbacks);
        setUserHasFeedback(data.userHasFeedback);
      }
    } catch (err) {
      // Silently fail
    } finally {
      setIsLoading(false);
    }
  };

  // Need to re-fetch if token changes (e.g., user logs in while on the page)
  useEffect(() => {
    if (token) fetchFeedback();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userRating === 0) {
      setError('Please select a star rating.');
      return;
    }

    setError('');
    setSuccessMsg('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback/${toolId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating: userRating, comment: comment.trim() })
      });

      const data = await response.json();
      if (data.success) {
        setFeedbacks(prev => [data.feedback, ...prev]);
        setUserRating(0);
        setComment('');
        setUserHasFeedback(true); // Hide form immediately
        setSuccessMsg('Thank you for your feedback!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setError(data.error || 'Failed to submit.');
      }
    } catch (err) {
      setError('Failed to connect to server.');
    }
  };

  const averageRating = feedbacks.length > 0 
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : null;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>⭐ Tool Feedback & Reviews</h3>

      {averageRating && (
        <div className={styles.summaryBox}>
          <span className={styles.avgNumber}>{averageRating}</span>
          <div className={styles.avgStars}>
            {[1, 2, 3, 4, 5].map(n => (
              <span key={n} className={n <= Math.round(averageRating) ? styles.starFilled : styles.starEmpty}>★</span>
            ))}
          </div>
          <span className={styles.totalReviews}>({feedbacks.length} reviews)</span>
        </div>
      )}

      {successMsg && <div className={styles.successBox}>{successMsg}</div>}
      {error && <div className={styles.errorBox}>{error}</div>}

      {/* Render Form, Login Prompt, or Already Reviewed Message */}
      {!user ? (
        <div className={`liquid-glass ${styles.loginPrompt}`}>
          <p>Please log in to leave a review.</p>
        </div>
      ) : userHasFeedback ? (
        <div className={`liquid-glass ${styles.loginPrompt}`}>
          <p>✅ You have already reviewed this tool. Thank you!</p>
        </div>
      ) : (
        <form className={styles.feedbackForm} onSubmit={handleSubmit}>
          <div className={styles.ratingRow}>
            <label>Your Rating:</label>
            <div className={styles.starsInput}>
              {[1, 2, 3, 4, 5].map(n => (
                <span 
                  key={n} 
                  className={(hoverRating || userRating) >= n ? styles.starFilled : styles.starEmpty}
                  onClick={() => setUserRating(n)}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          
          <textarea
            className={styles.textarea}
            placeholder="Share your experience (optional)..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
          
          <button type="submit" className={styles.submitBtn} disabled={userRating === 0}>
            Submit Review
          </button>
        </form>
      )}

      <div className={styles.reviewsList}>
        {isLoading ? (
          <p className={styles.loadingText}>Loading reviews...</p>
        ) : feedbacks.length === 0 ? (
          <p className={styles.emptyText}>No reviews yet. Be the first to rate this tool!</p>
        ) : (
          feedbacks.map((fb, i) => (
            <div key={i} className={`liquid-glass ${styles.reviewCard}`}>
              <div className={styles.reviewHeader}>
                <div className={styles.avatar}>{fb.userName.charAt(0).toUpperCase()}</div>
                <div className={styles.reviewMeta}>
                  <span className={styles.reviewAuthor}>{fb.userName}</span>
                  <div className={styles.reviewStars}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <span key={n} className={n <= fb.rating ? styles.starFilled : styles.starEmpty}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              {fb.comment && <p className={styles.reviewText}>{fb.comment}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToolFeedback;
