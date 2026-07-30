import React, { useState, useEffect } from 'react';
import styles from './PinterestDownloader.module.css';

const PinterestDownloader = () => {
  const [url, setUrl] = useState('');
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/history/pinterest-downloader`, {
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
    setImageData(null);
    if (!url) return;

    if (!url.includes('pinterest.com/pin/') && !url.includes('pin.it/')) {
      setError('Please enter a valid Pinterest Pin URL.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pinterest?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.success) {
        setImageData({ 
          variants: data.variants, 
          preview: data.imageUrl, 
          source: url 
        });
      } else {
        setError(data.error || 'Failed to fetch image.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch image. Is the backend server running?');
    }
    setIsLoading(false);
  };

  const handleDownload = (mediaUrl, quality, sourceUrl) => {
    // Use the backend proxy to force download instead of opening in a new tab
    const safeQuality = quality.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `pinterest_${safeQuality}_${Date.now()}.jpg`;
    const downloadProxyUrl = `${import.meta.env.VITE_API_URL}/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${fileName}`;
    
    // Create a hidden anchor tag to trigger the download stream
    const link = document.createElement('a');
    link.href = downloadProxyUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Save to MongoDB History if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/api/history/pinterest-downloader`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ imageUrl: mediaUrl, sourceUrl: sourceUrl || url })
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
    setImageData(null);
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder="Paste Pinterest Pin URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={styles.urlInput}
          />
          <button className={styles.fetchBtn} onClick={handleFetch} disabled={isLoading}>
            {isLoading ? '⏳' : '🔍'}
          </button>
          {url && <button className={styles.clearBtn} onClick={handleClear}>✖️</button>}
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {imageData && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.postHeader}>
            <div className={styles.previewWrapper}>
              <img src={imageData.preview} alt="Pinterest Preview" className={styles.videoPreview} />
            </div>
            <div className={styles.postInfo}>
              <h3 className={styles.resultTitle}>Pinterest Image</h3>
              <p className={styles.desc}>Select your preferred resolution to download.</p>
            </div>
          </div>

          <div className={styles.downloadHeader}>
            <span>Download Options:</span>
          </div>

          <div className={styles.downloadGrid}>
            {imageData.variants.map((variant, i) => (
              <button
                key={i}
                className={styles.downloadBtn}
                onClick={() => handleDownload(variant.url, variant.quality, imageData.source)}
              >
                ⬇️ Download {variant.quality} <span className={styles.fileSize}>({variant.size})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.downloadHeader}>
            <span>Your Download History</span>
          </div>
          <div className={styles.historyGrid}>
            {history.map((item, i) => (
              <div key={i} className={styles.historyCard} onClick={() => handleDownload(item.imageUrl, 'History', item.sourceUrl)}>
                <img src={item.imageUrl} alt="History" className={styles.historyImage} />
                <div className={styles.historyOverlay}>
                  <span>⬇️</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PinterestDownloader;
