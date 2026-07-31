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

      if (!url.includes('youtube.com/watch?v=') && !url.includes('youtu.be/') && !url.includes('youtube.com/shorts/')) {
        setError('Please enter a valid YouTube URL.');
        return;
      }

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

  const handleDownload = (height, quality, type) => {
    const safeTitle = (videoData?.details?.title || 'youtube_video').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
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
        <input
          type="text"
          placeholder="Paste YouTube URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.urlInput}
        />
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', width: '100%' }}>
          <button 
            className={styles.fetchBtn} 
            onClick={handleFetch} 
            disabled={isLoading}
            style={{ flex: 1 }}
          >
            {isLoading ? '⏳ Extracting...' : '🔍 Extract'}
          </button>
          {url && (
            <button 
              className={styles.clearBtn} 
              onClick={handleClear}
              style={{ width: '100px' }}
            >
              ✖️ Clear
            </button>
          )}
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {videoData && videoData.details && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3>{videoData.details.title}</h3>
          {videoData.details.thumbnail && (
            <img src={videoData.details.thumbnail} alt="Thumbnail" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
          )}
          
          <div className={styles.downloadGrid}>
            {videoData.videoVariants && videoData.videoVariants.length > 0 ? (
              videoData.videoVariants.map((variant, i) => (
                <button
                  key={i}
                  className={`${styles.downloadBtn} ${styles.videoBtn}`}
                  onClick={() => handleDownload(variant.height, variant.quality, 'video')}
                >
                  ⬇️ Download {variant.quality}
                </button>
              ))
            ) : (
              <p>No video formats available.</p>
            )}

            {videoData.audioVariants && videoData.audioVariants.length > 0 && (
              videoData.audioVariants.map((variant, i) => (
                <button
                  key={i}
                  className={`${styles.downloadBtn} ${styles.audioBtn}`}
                  onClick={() => handleDownload(null, 'High', 'audio')}
                >
                  🎵 Extract Audio (MP3)
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubeDownloader;
