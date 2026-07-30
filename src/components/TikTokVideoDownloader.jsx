import React, { useState } from 'react';
import styles from './TikTokVideoDownloader.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;

const TikTokVideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setError('');
    setPostData(null);
    if (!url) return;

    if (!url.includes('tiktok.com/')) {
      setError('Please enter a valid TikTok URL.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/tiktok?url=${encodeURIComponent(url)}`);
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

  const handleDownload = (mediaUrl, qualityLabel) => {
    const ext = qualityLabel.includes('MP3') ? 'mp3' : 'mp4';
    const fileName = `tiktok_${qualityLabel.replace(/\s+/g, '_')}.${ext}`;
    const downloadProxyUrl = `${API_BASE_URL}/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${fileName}`;
    
    const link = document.createElement('a');
    link.href = downloadProxyUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            placeholder="Paste TikTok URL..."
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

      {postData && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.postHeader}>
            <div className={styles.previewWrapper}>
              <img src={postData.details.cover} alt="TikTok Cover" className={styles.videoPreview} />
            </div>
            <div className={styles.postInfo}>
              <h3 className={styles.resultTitle}>{postData.details.title}</h3>
              <p className={styles.desc}>Select your preferred format to download.</p>
            </div>
          </div>

          {/* Image Download Section */}
          {postData.details.isImage && postData.details.images.length > 0 && (
            <>
              <div className={styles.downloadHeader}>
                <span>Photos in this post ({postData.details.images.length}):</span>
              </div>
              <div className={styles.imageGrid}>
                {postData.details.images.map((imgUrl, i) => (
                  <div key={i} className={styles.imageCard}>
                    <img src={imgUrl} alt={`TikTok Photo ${i + 1}`} className={styles.postImage} />
                    <button
                      className={styles.imgDownloadBtn}
                      onClick={() => handleDownload(imgUrl, `Photo_${i + 1}`)}
                    >
                      ⬇️ Download
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Video & Audio Download Section */}
          {!postData.details.isImage && postData.variants.length > 0 && (
            <>
              <div className={styles.downloadHeader}>
                <span>Download Options:</span>
              </div>

              <div className={styles.downloadGrid}>
                {postData.variants.map((variant, i) => (
                  <button
                    key={i}
                    className={`${styles.downloadBtn} ${variant.type === 'audio' ? styles.audioBtn : styles.videoBtn}`}
                    onClick={() => handleDownload(variant.url, variant.quality)}
                  >
                    ⬇️ Download {variant.quality}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TikTokVideoDownloader;
