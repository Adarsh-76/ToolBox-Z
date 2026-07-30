import React, { useState } from 'react';
import styles from './RedditDownloader.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;

const formatUpvotes = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
};

const RedditDownloader = () => {
  const [url, setUrl] = useState('');
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setError('');
    setPostData(null);
    if (!url) return;

    if (!url.includes('reddit.com/')) {
      setError('Please enter a valid Reddit URL.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/reddit?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.success) {
        setPostData(data.details);
      } else {
        setError(data.error || 'Failed to fetch Reddit post.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadVideo = (type) => {
    const safeTitle = (postData?.title || 'reddit_media').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
    const ext = type === 'audio' ? 'mp3' : 'mp4';
    const fileName = `${safeTitle}.${ext}`;
    
    const streamUrl = `${API_BASE_URL}/api/reddit-stream?url=${encodeURIComponent(url)}&type=${type}&filename=${fileName}`;
    window.open(streamUrl, '_blank');
  };

  const handleDownloadImage = () => {
    const safeTitle = (postData?.title || 'reddit_image').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
    const fileName = `${safeTitle}.jpg`;
    // Use the standard download proxy for images
    const downloadUrl = `${API_BASE_URL}/api/download?url=${encodeURIComponent(postData.imageUrl)}&filename=${fileName}`;
    window.open(downloadUrl, '_blank');
  };

  const handleClear = () => {
    setUrl('');
    setPostData(null);
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <h3 className={styles.title}>Reddit Downloader</h3>
        <p className={styles.subtitle}>Download Videos, Audio, or Images from Reddit</p>
        
        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder="Paste Reddit post URL..."
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
          {/* Post Info Header */}
          <div className={styles.postMeta}>
            <div className={styles.metaItem}>📌 r/{postData.subreddit}</div>
            <div className={styles.metaItem}>👤 u/{postData.author}</div>
            <div className={styles.metaItem}>⬆️ {formatUpvotes(postData.upvotes)}</div>
          </div>

          <h3 className={styles.postTitle}>{postData.title}</h3>

          <div className={styles.postHeader}>
            <div className={styles.previewWrapper}>
              <img src={postData.thumbnail || postData.imageUrl} alt="Reddit Thumbnail" className={styles.videoPreview} />
            </div>
          </div>

          {/* Dynamic Download Options */}
          <div className={styles.downloadHeader}>
            <span>Download Options:</span>
          </div>

          <div className={styles.downloadGrid}>
            {postData.isImage ? (
              <button
                className={`${styles.downloadBtn} ${styles.imageBtn}`}
                onClick={handleDownloadImage}
              >
                🖼️ Download Image (JPG)
              </button>
            ) : (
              <>
                <button
                  className={`${styles.downloadBtn} ${styles.videoBtn}`}
                  onClick={() => handleDownloadVideo('video')}
                >
                  🎬 Download Video (MP4)
                </button>
                <button
                  className={`${styles.downloadBtn} ${styles.audioBtn}`}
                  onClick={() => handleDownloadVideo('audio')}
                >
                  🎵 Extract Audio (MP3)
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RedditDownloader;
