import React, { useState, useEffect } from 'react';
import styles from './FeedbackWidget.module.css';

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", { rating, comment });
    setSubmitted(true);
    
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setRating(0);
      setComment('');
    }, 3000);
  };

  return (
    <>
      {!isOpen && (
        <button 
          className={styles.feedbackBtn} 
          onClick={() => setIsOpen(true)}
          title="Give Feedback"
        >
          💬
        </button>
      )}

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
          
          <div className={styles.modalWindow}>
            <div className={styles.header}>
              <h3>{submitted ? "Thank You! 🎉" : "Share Your Feedback"}</h3>
              {!submitted && (
                <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✖️</button>
              )}
            </div>
            
            {!submitted ? (
              <form className={styles.formBody} onSubmit={handleSubmit}>
                <p className={styles.question}>How would you rate your experience?</p>
                
                <div className={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star}
                      className={styles.star}
                      style={{ color: star <= (hover || rating) ? "#FFD700" : "#444" }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className={styles.question}>Tell us what you think!</p>
                <textarea 
                  className={styles.textarea}
                  placeholder="What did you love? What can we improve?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />

                <button type="submit" className={styles.submitBtn} disabled={rating === 0}>
                  Submit Feedback
                </button>
              </form>
            ) : (
              <div className={styles.successBody}>
                <p className={styles.successText}>
                  Your feedback helps us make ToolBox Z better for everyone. <br/><br/>
                  We appreciate your time! ❤️
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default FeedbackWidget;
