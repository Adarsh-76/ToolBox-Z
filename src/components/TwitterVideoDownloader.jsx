import React, { useState } from 'react';
import styles from './TwitterVideoDownloader.module.css';

const TwitterVideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Helper to format bitrate into a readable quality label
  const formatQuality = (variant) => {
    const bitrate = variant.bitrate || 0;
    
    // If API provides dimensions, use them (e.g., 1080p)
    if (variant.width && variant.height) {
      return `${variant.height}p`;
    }
    
    // Otherwise, estimate quality based on bitrate
    if (bitrate >= 3000000) return '1080p (HD)';
    if (bitrate >= 1500000) return '720p (HD)';
    if (bitrate >= 800000) return '480p';
    if (bitrate >= 400000) return '360p';
    if (bitrate > 0) return '240p / 144p (Mobile)';
    return 'Standard Quality';
  };

  const handleFetch = async () => {
    setError('');
    setVideoData(null);
    if (!url) return;

    // Extract Tweet ID from URL
    const match = url.match(/status\/(\d+)/);
    if (!match) {
      setError('Invalid Twitter URL. Please paste a full tweet link.');
      return;
    }

    const tweetId = match[1];
    setIsLoading(true);

    try {
      // Using fxtwitter API to bypass CORS and get video metadata
      const response = await fetch(`https://api.fxtwitter.com/status/${tweetId}`);
      if (!response.ok) throw new Error('Failed to fetch tweet.');
      
      const data = await response.json();
      const media = data.tweet?.media?.videos?.[0];

      if (media) {
        // Filter for MP4s and sort by bitrate (highest first)
        const sortedVariants = media.variants
          .filter(v => v.content_type === 'video/mp4')
          .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
        
        if (sortedVariants.length === 0) {
          throw new Error('No downloadable MP4 video found.');
        }

        setVideoData({
          thumbnail: media.thumbnail_url,
          variants: sortedVariants
        });
      } else {
        setError('No video found in this tweet. It might be an image or text-only post.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch video. Twitter may be blocking the request or the URL is invalid.');
    }
    setIsLoading(false);
  };

  const handleDownload = async (videoUrl, qualityLabel) => {
    try {
      // Fetch the video as a blob to force download
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `twitter_video_${qualityLabel.replace(/\s+/g, '_')}.mp4`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      // Fallback to opening in a new tab if CORS blocks the download
      window.open(videoUrl, '_blank');
      alert('Automatic download blocked by browser. Right-click the video in the new tab and select "Save Video As..."');
    }
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
          placeholder="Paste Twitter Video URL (e.g., https://twitter.com/.../status/...)" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.urlInput}
        />
        <button className={styles.fetchBtn} onClick={handleFetch} disabled={isLoading}>
          {isLoading ? '⏳ Extracting...' : '🔍 Extract Video'}
        </button>
        {url && <button className={styles.clearBtn} onClick={handleClear}>✖️ Reset</button>}
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {videoData && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3 className={styles.resultTitle}>Video Found!</h3>
          <div className={styles.previewWrapper}>
            <video controls poster={videoData.thumbnail} className={styles.videoPreview}>
              <source src={videoData.variants[0].url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className={styles.downloadHeader}>
            <span>Select Download Quality:</span>
          </div>

          <div className={styles.downloadGrid}>
            {videoData.variants.map((variant, i) => {
              const qualityLabel = formatQuality(variant);
              return (
                <button 
                  key={i} 
                  className={styles.downloadBtn} 
                  onClick={() => handleDownload(variant.url, qualityLabel)}
                >
                  ⬇️ Download {qualityLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TwitterVideoDownloader;
