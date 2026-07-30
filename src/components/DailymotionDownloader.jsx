import React, { useState } from 'react';
import styles from './DailymotionDownloader.module.css';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'http://' + window.location.hostname + ':5000';

const DailymotionDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExtracted, setIsExtracted] = useState(false);

  const handleExtract = async () => {
    setError('');
    setVideoData(null);
    setIsExtracted(false);

    if (!url) return;

    if (!url.includes('dailymotion.com') && !url.includes('dai.ly')) {
      setError('Please enter a valid Dailymotion URL.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/dailymotion-download?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.success) {
        setVideoData(data);
        setIsExtracted(true);
      } else {
        setError(data.error || 'Failed to extract video.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to backend. Is the server running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    setUrl('');
    setVideoData(null);
    setIsExtracted(false);
    setError('');
  };

  const handleDownload = (streamUrl, quality) => {
    const proxyUrl = `${API_BASE_URL}/api/download?url=${encodeURIComponent(streamUrl)}&filename=Dailymotion_${quality}.mp4`;
    window.open(proxyUrl, '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder="Paste Dailymotion URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={styles.urlInput}
            disabled={isLoading}
          />
          <button 
            className={styles.extractBtn} 
            onClick={handleExtract} 
            disabled={isLoading || !url}
          >
            {isLoading ? '⏳ Extracting...' : '⚡ Extract'}
          </button>
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {isExtracted && videoData && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <button className={styles.removeBtn} onClick={handleRemove}>
            ✖️ Remove
          </button>

          <div className={styles.postHeader}>
            {videoData.details.thumbnail && (
              <div className={styles.previewWrapper}>
                <img src={videoData.details.thumbnail} alt="Thumbnail" className={styles.videoPreview} />
              </div>
            )}
            <div className={styles.postInfo}>
              <h3 className={styles.resultTitle}>{videoData.details.title}</h3>
              <p className={styles.desc}>Uploader: {videoData.details.uploader}</p>
            </div>
          </div>

          <div className={styles.downloadHeader}>
            <span>Available Download Options:</span>
          </div>

          <div className={styles.downloadGrid}>
            {videoData.variants.map((variant, i) => (
              <button
                key={i}
                className={`${styles.downloadBtn} ${styles.videoBtn}`}
                onClick={() => handleDownload(variant.url, variant.quality)}
              >
                ⬇️ Download {variant.quality} <span className={styles.tag}>({variant.size})</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailymotionDownloader;
