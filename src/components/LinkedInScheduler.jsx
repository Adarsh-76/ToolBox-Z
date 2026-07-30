import React, { useState, useEffect } from 'react';
import styles from './LinkedInScheduler.module.css';

const LinkedInScheduler = () => {
  const [postText, setPostText] = useState('');
  const [postDate, setPostDate] = useState('');
  const [postTime, setPostTime] = useState('');
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [showToast, setShowToast] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('liScheduledPosts') || '[]');
    setScheduledPosts(saved);
  }, []);

  const handleSchedule = () => {
    if (!postText || !postDate || !postTime) {
      setShowToast('❌ Please fill out all fields.');
      setTimeout(() => setShowToast(''), 3000);
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      text: postText,
      date: postDate,
      time: postTime,
      createdAt: new Date().toISOString()
    };

    const updated = [newPost, ...scheduledPosts];
    setScheduledPosts(updated);
    localStorage.setItem('liScheduledPosts', JSON.stringify(updated));

    setPostText('');
    setPostDate('');
    setPostTime('');
    setShowToast('✅ Post scheduled successfully!');
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleDelete = (id) => {
    const updated = scheduledPosts.filter(p => p.id !== id);
    setScheduledPosts(updated);
    localStorage.setItem('liScheduledPosts', JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.workspace}`}>
        <div className={styles.formArea}>
          <h3 className={styles.sectionTitle}>Create Post</h3>
          <textarea 
            className={styles.textarea}
            placeholder="Write your LinkedIn post here... (e.g., 'Excited to share my new project!')"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className={styles.dateTimePicker}>
            <div className={styles.inputGroup}>
              <label>Date</label>
              <input type="date" value={postDate} onChange={(e) => setPostDate(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <label>Time</label>
              <input type="time" value={postTime} onChange={(e) => setPostTime(e.target.value)} className={styles.input} />
            </div>
          </div>
          <button className={styles.scheduleBtn} onClick={handleSchedule}>
            📅 Schedule Post
          </button>
        </div>

        <div className={styles.sidebarArea}>
          <h3 className={styles.sectionTitle}>Best Times to Post</h3>
          <ul className={styles.tipsList}>
            <li><strong>Tue - Thu:</strong> 7:30 AM - 9:00 AM</li>
            <li><strong>Tue - Thu:</strong> 12:00 PM - 1:00 PM</li>
            <li><strong>Avoid:</strong> Weekends (Low engagement)</li>
            <li><strong>Tip:</strong> Add 3-5 hashtags at the end!</li>
          </ul>
        </div>
      </div>

      <div className={styles.scheduledListArea}>
        <h3 className={styles.listTitle}>Scheduled Posts</h3>
        {scheduledPosts.length === 0 ? (
          <p className={styles.emptyText}>No posts scheduled yet.</p>
        ) : (
          <div className={styles.grid}>
            {scheduledPosts.map(post => (
              <div key={post.id} className={`liquid-glass ${styles.card}`}>
                <button className={styles.deleteBtn} onClick={() => handleDelete(post.id)}>🗑️</button>
                <p className={styles.cardText}>{post.text}</p>
                <div className={styles.cardDate}>
                  Scheduled for: <strong>{post.date} at {post.time}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showToast && (
        <div className={styles.toast}>{showToast}</div>
      )}
    </div>
  );
};

export default LinkedInScheduler;
