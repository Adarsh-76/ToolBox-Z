import React, { useState } from 'react';
import styles from './YoutubeDownloader.module.css';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'http://' + window.location.hostname + ':5000';

const formatNumber = (num) => {
  if (!num) return '0';
  return parseInt(num).toLocaleString();
};

const YoutubeDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setError('');
    setVideoData(null);
    if (!url) return;

    if (!url.includes('youtube.com/watch?v=') && !url.includes('youtu.be/') && !url.includes('youtube.com/shorts/')) {
      setError('Please enter a valid YouTube URL.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/youtube-download?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.success) {
        setVideoData(data);
      } else {
        setError(data.error || 'Failed to fetch video.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch video. Is the backend server running?');
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATED: Now passes 'height' instead of 'itag'
  const handleDownload = (height, quality, type) => {
    const safeTitle = (videoData?.details.title || 'youtube_video').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
    const ext = type === 'audio' ? 'mp3' : 'mp4';
    const fileName = `${safeTitle}_${quality}.${ext}`;

    const streamUrl = `${API_BASE_URL}/api/youtube-stream?url=${encodeURIComponent(url)}&height=${height || ''}&type=${type}&filename=${fileName}`;
    window.open(streamUrl, '_blank');
  };

  const handleClear = () => {
    setUrl('');
    setVideoData(null);
    setError('');
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
          {url && <button className={styles.clearBtn} onClick={handleClear}>✖️</button>}
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {videoData && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.postHeader}>
            <div className={styles.previewWrapper}>
              <img src={videoData.details.thumbnail} alt="YouTube Thumbnail" className={styles.videoPreview} />
            </div>
            <div className={styles.postInfo}>
              <h3 className={styles.resultTitle}>{videoData.details.title}</h3>
              <p className={styles.desc}>Select your preferred format to download.</p>
            </div>
          </div>

          {/* Video Info Section */}
          <div className={styles.videoInfoSection}>
            <div className={styles.channelInfo}>
              {videoData.details.authorAvatar && (
                <img src={videoData.details.authorAvatar} alt="Channel Avatar" className={styles.channelAvatar} />
              )}
              <div className={styles.channelText}>
                <p className={styles.channelName}>{videoData.details.authorName}</p>
                <p className={styles.videoStats}>
                  👁️ {formatNumber(videoData.details.views)} views • 📅 {videoData.details.uploadDate || 'Recently'}
                </p>
              </div>
              <div className={styles.likeCount}>
                👍 {formatNumber(videoData.details.likes)}
              </div>
            </div>

            <div className={styles.descriptionBox}>
              <h4 className={styles.descTitle}>Description</h4>
              <p className={styles.descText}>{videoData.details.description}</p>
            </div>
          </div>

          {/* Download Section */}
          <div className={styles.downloadHeader}>
            <span>Download Options (Video + Audio Merged):</span>
          </div>

          <div className={styles.downloadGrid}>
            {videoData.videoVariants.map((variant, i) => (
              <button
                key={i}
                className={`${styles.downloadBtn} ${styles.videoBtn}`}
                // Pass variant.height to handleDownload
                onClick={() => handleDownload(variant.height, variant.quality, 'video')}
              >
                ⬇️ Download {variant.quality} <span className={styles.tag}>(Video + Audio)</span>
              </button>
            ))}
            {videoData.audioVariants.map((variant, i) => (
              <button
                key={i}
                className={`${styles.downloadBtn} ${styles.audioBtn}`}
                onClick={() => handleDownload(null, 'High', 'audio')}
              >
                🎵 Extract Audio (MP3)
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubeDownloader;
