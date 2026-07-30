import React, { useState } from 'react';
import styles from './HotstarDownloader.module.css';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'http://' + window.location.hostname + ':5000';

const HotstarDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExtracted, setIsExtracted] = useState(false); // Controls the popup

  const handleExtract = async () => {
    setError('');
    setVideoData(null);
    setIsExtracted(false);

    if (!url) return;

    if (!url.includes('hotstar.com') && !url.includes('jiocinema.com')) {
      setError('Please enter a valid Jio Hotstar URL.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/hotstar-download?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.success) {
        setVideoData(data);
        setIsExtracted(true); // Pop up the results
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
    // Use the backend proxy to force download the file
    const proxyUrl = `${API_BASE_URL}/api/download?url=${encodeURIComponent(streamUrl)}&filename=Hotstar_${quality}.mp4`;
    window.open(proxyUrl, '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder="Paste Jio Hotstar URL..."
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

      {/* Popup Result Area */}
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
          
          <p className={styles.note}>
            * Note: If the video doesn't play after downloading, it may be DRM-protected by Hotstar. 
            Free content and trailers will download perfectly.
          </p>
        </div>
      )}
    </div>
  );
};

export default HotstarDownloader;
