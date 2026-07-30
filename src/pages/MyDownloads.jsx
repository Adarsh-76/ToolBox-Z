import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './MyDownloads.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MyDownloads = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }

      setIsLoggedIn(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/history`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          setHistory(data.history);
        }
      } catch (err) {
        console.error('Failed to fetch global history:', err);
      }
      setIsLoading(false);
    };
    fetchAllHistory();
  }, [navigate]);

  const handleDownload = (mediaUrl, toolId) => {
    const fileName = `toolboxz_${toolId}_${Date.now()}.jpg`;
    const downloadProxyUrl = `${API_BASE_URL}/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${fileName}`;

    const link = document.createElement('a');
    link.href = downloadProxyUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearHistory = async () => {
    setIsClearing(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/api/history`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setHistory([]);
        setShowClearConfirm(false);
      }
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
    setIsClearing(false);
  };

  // Helper to get tool name/icon from ID
  const getToolInfo = (toolId) => {
    const tool = toolsList.find(t => t.id === toolId);
    return tool ? { name: tool.name, icon: tool.icon } : { name: 'Tool', icon: '🛠️' };
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your vault...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className={`liquid-glass ${styles.authBox}`}>
        <h2>🔒 Authentication Required</h2>
        <p>You need to be logged in to view your download history.</p>
        <button className={styles.authBtn} onClick={() => navigate('/auth')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>📂 My Downloads</h1>
          <p className={styles.subtitle}>Your personalized vault of all media downloaded across ToolBox Z.</p>
        </div>
        {history.length > 0 && (
          <button className={styles.clearBtn} onClick={() => setShowClearConfirm(true)}>
            🗑️ Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className={`liquid-glass ${styles.emptyState}`}>
          <span className={styles.emptyIcon}>🌌</span>
          <h2>No Downloads Yet</h2>
          <p>Media you download from Pinterest, TikTok, Facebook, and other tools will appear here.</p>
          <button className={styles.exploreBtn} onClick={() => navigate('/tools')}>Explore Tools</button>
        </div>
      ) : (
        <div className={styles.grid}>
          {history.map((item, i) => {
            const info = getToolInfo(item.toolId);
            return (
              <div key={i} className={`liquid-glass ${styles.card}`} onClick={() => handleDownload(item.imageUrl, item.toolId)}>
                <div className={styles.imageWrapper}>
                  <img src={item.imageUrl} alt="Downloaded Media" className={styles.image} />
                  <div className={styles.overlay}>
                    <span className={styles.downloadIcon}>⬇️</span>
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.toolBadge}>{info.icon} {info.name}</span>
                  <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className={styles.modalOverlay} onClick={() => setShowClearConfirm(false)}>
          <div className={`liquid-glass ${styles.confirmModal}`} onClick={(e) => e.stopPropagation()}>
            <h3>Clear Download History?</h3>
            <p>This will permanently delete all your download history from our servers. This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowClearConfirm(false)}>Cancel</button>
              <button className={styles.confirmClearBtn} onClick={handleClearHistory} disabled={isClearing}>
                {isClearing ? '⏳ Clearing...' : 'Yes, Clear Everything'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDownloads;
