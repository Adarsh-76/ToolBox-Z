import React, { useState } from 'react';
import styles from './YoutubeDownloader.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const YoutubeDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      setError('');
      setVideoData(null);
      if (!url) return;

      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/youtube-download?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.success) {
        setVideoData(data);
      } else {
        setError(data.error || 'Failed to fetch video.');
      }
    } catch (err) {
      setError('Failed to connect to backend.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (directUrl, quality) => {
    if (!directUrl) return;
    const fileName = `youtube_${quality}.mp4`;
    const proxyUrl = `${API_BASE_URL}/api/youtube-proxy?url=${encodeURIComponent(directUrl)}&filename=${fileName}`;
    window.open(proxyUrl, '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder="Paste YouTube URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={styles.urlInput}
          />
          <button className={styles.fetchBtn} onClick={handleFetch} disabled={isLoading}>
            {isLoading ? '⏳' : '🔍'}
          </button>
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {videoData && videoData.details && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3>{videoData.details.title}</h3>
          <img src={videoData.details.thumbnail} alt="Thumbnail" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
          
          <div className={styles.downloadGrid}>
            {videoData.videoVariants && videoData.videoVariants.length > 0 ? (
              videoData.videoVariants.map((variant, i) => (
                <button
                  key={i}
                  className={`${styles.downloadBtn} ${styles.videoBtn}`}
                  onClick={() => handleDownload(variant.url, variant.quality)}
                >
                  ⬇️ Download {variant.quality}
                </button>
              ))
            ) : (
              <p>No formats available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubeDownloader;
