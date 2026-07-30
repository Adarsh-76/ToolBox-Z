import React, { useState, useEffect } from 'react';
import styles from './InstagramDownloader.module.css';

// Automatically detect IP for local network testing

const InstagramDownloader = () => {
  const [url, setUrl] = useState('');
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/history/instagram-downloader`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          setHistory(data.history);
        }
      } catch (err) {
        console.error('Failed to fetch history:', err);
      }
    };
    fetchHistory();
  }, []);

  const handleFetch = async () => {
    setError('');
    setPostData(null);
    if (!url) return;

    if (!url.includes('instagram.com/')) {
      setError('Please enter a valid Instagram URL.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/instagram?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const data = await response.json();

      if (data.success) {
        setPostData(data);
      } else {
        setError(data.error || 'Failed to fetch media.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch media. Is the backend server running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (mediaUrl, quality, type) => {
    const fileName = `instagram_${quality.replace(/\s+/g, '_')}_${Date.now()}.${type === 'video' ? 'mp4' : 'jpg'}`;
    const downloadProxyUrl = `${API_BASE_URL}/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${fileName}`;
    
    const link = document.createElement('a');
    link.href = downloadProxyUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Save to MongoDB History if user is logged in
    const token = localStorage.getItem('token');
    if (token && postData) {
      fetch(`${API_BASE_URL}/api/history/instagram-downloader`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ imageUrl: postData.details.thumbnail, sourceUrl: url })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHistory(prev => [data.history, ...prev].slice(0, 10));
        }
      })
      .catch(err => console.error('Failed to save history:', err));
    }
  };

  const handleClear = () => {
    setUrl('');
    setPostData(null);
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder="Paste Instagram Reel or Post URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={styles.urlInput}
          />
          {url && <button className={styles.clearBtn} onClick={handleClear}>✖️</button>}
        </div>
        
        <button 
          className={styles.extractBtn} 
          onClick={handleFetch} 
          disabled={isLoading || !url}
        >
          {isLoading ? '⏳ Extracting Media...' : '📸 Extract Media'}
        </button>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {postData && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.postHeader}>
            <div className={styles.previewWrapper}>
              <img src={postData.details.thumbnail} alt="Instagram Preview" className={styles.videoPreview} />
            </div>
            <div className={styles.postInfo}>
              <h3 className={styles.resultTitle}>{postData.details.title}</h3>
              <p className={styles.desc}>Select your preferred format to download.</p>
            </div>
          </div>

          {postData.variants.length > 0 && (
            <>
              <div className={styles.downloadHeader}>
                <span>📥 Download Options</span>
              </div>
              <div className={styles.downloadGrid}>
                {postData.variants.map((variant, i) => (
                  <button
                    key={i}
                    className={`${styles.downloadBtn} ${variant.type === 'video' ? styles.videoBtn : styles.imageBtn}`}
                    onClick={() => handleDownload(variant.url, variant.quality, variant.type)}
                  >
                    ⬇️ {variant.quality} <span className={styles.fileSize}>({variant.size})</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {history.length > 0 && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.downloadHeader}>
            <span>Your Download History</span>
          </div>
          <div className={styles.historyGrid}>
            {history.map((item, i) => (
              <div key={i} className={styles.historyCard} onClick={() => window.open(item.sourceUrl, '_blank')}>
                <img src={item.imageUrl} alt="History" className={styles.historyImage} />
                <div className={styles.historyOverlay}>
                  <span>▶️</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramDownloader;
