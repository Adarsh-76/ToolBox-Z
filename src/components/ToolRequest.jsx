import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ToolRequest.module.css';

const ToolRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reqData, setReqData] = useState({ toolName: '', category: 'Image & Design', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState('');
  
  const token = localStorage.getItem('tbz_token');
  const isLoggedIn = token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reqData)
      });
      const data = await response.json();
      if (data.success) {
        setReqData({ toolName: '', category: 'Image & Design', description: '' });
        setIsOpen(false);
        setShowToast('✅ Request submitted! We will review it shortly.');
        setTimeout(() => setShowToast(''), 3000);
      } else {
        setError(data.error || 'Failed to submit request.');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    }
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`liquid-glass ${styles.banner}`}>
        <h3>Missing a tool?</h3>
        <p>Let us know what you need, and we might build it!</p>
        <button className={styles.openBtn} onClick={() => setIsOpen(true)}>
          ✨ Request a Tool
        </button>
      </div>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={`liquid-glass ${styles.modalContent}`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setIsOpen(false)}>✖️</button>
            
            <h3 className={styles.modalTitle}>✨ Request a Tool</h3>
            <p className={styles.modalDesc}>Tell us what you're looking for!</p>
            
            {isLoggedIn ? (
              <form onSubmit={handleSubmit}>
                {error && <div className={styles.errorBox}>{error}</div>}
                <div className={styles.inputGroup}>
                  <label>Tool Name</label>
                  <input 
                    type="text" 
                    required 
                    value={reqData.toolName}
                    onChange={(e) => setReqData({...reqData, toolName: e.target.value})}
                    className={styles.input}
                    placeholder="e.g., PDF Merger"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Category</label>
                  <select 
                    className={styles.select}
                    value={reqData.category}
                    onChange={(e) => setReqData({...reqData, category: e.target.value})}
                  >
                    <option>Image & Design</option>
                    <option>Text Tools</option>
                    <option>Developer Tools</option>
                    <option>Social Media Tools</option>
                    <option>Math & Calculators</option>
                    <option>PDF Tools</option>
                    <option>Security & Encryption</option>
                    <option>Generators</option>
                    <option>Productivity</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>Description</label>
                  <textarea 
                    required 
                    value={reqData.description}
                    onChange={(e) => setReqData({...reqData, description: e.target.value})}
                    className={styles.textarea}
                    placeholder="Describe what the tool should do..."
                  ></textarea>
                </div>
                <button type="submit" className={styles.modalSubmitBtn} disabled={loading}>
                  {loading ? '⏳ Submitting...' : 'Submit Request'}
                </button>
              </form>
            ) : (
              <div className={styles.loginPrompt}>
                <p>🔒 You need to be logged in to submit a request.</p>
                <Link to="/auth" className={styles.loginBtn}>Login / Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}

      {showToast && (
        <div className={styles.toast}>{showToast}</div>
      )}
    </div>
  );
};

export default ToolRequest;
