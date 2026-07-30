import React, { useState } from 'react';
import styles from './YoutubeThumbnail.module.css';

const YoutubeThumbnail = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = () => {
    setError('');
    if (!url) return;

    // FIXED: Added |shorts to the regex to support YouTube Shorts URLs
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    if (match && match[1]) {
      setVideoId(match[1]);
    } else {
      setError('Invalid YouTube URL. Please paste a valid video link.');
      setVideoId(null);
    }
  };

  const handleDownload = async (imageUrl, quality) => {
    try {
      // Fetch the image as a blob to force download
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `youtube_thumbnail_${quality}.jpg`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      // Fallback if fetch fails due to CORS
      window.open(imageUrl, '_blank');
      alert('Your browser blocked the automatic download. Please right-click the image in the new tab and select "Save Image As..."');
    }
  };

  const thumbnails = videoId ? [
    { name: 'Max Resolution (1080p/2K if available)', code: 'maxresdefault' },
    { name: 'Standard Definition (640x480)', code: 'sddefault' },
    { name: 'High Quality (480x360)', code: 'hqdefault' },
    { name: 'Medium Quality (320x180)', code: 'mqdefault' },
  ] : [];

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <input
          type="text"
          placeholder="Paste YouTube Video or Shorts URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.urlInput}
        />
        <button className={styles.fetchBtn} onClick={handleFetch}>
          Get Thumbnails
        </button>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {videoId && (
        <div className={styles.grid}>
          {thumbnails.map((thumb, i) => (
            <div key={i} className={`liquid-glass ${styles.card}`}>
              <div className={styles.imageWrapper}>
                <img
                  src={`https://img.youtube.com/vi/${videoId}/${thumb.code}.jpg`}
                  alt={thumb.name}
                  className={styles.previewImg}
                  onError={(e) => e.target.parentElement.style.display = 'none'}
                />
              </div>
              <h3 className={styles.cardTitle}>{thumb.name}</h3>
              <button
                className={styles.downloadBtn}
                onClick={() => handleDownload(`https://img.youtube.com/vi/${videoId}/${thumb.code}.jpg`, thumb.code)}
              >
                ⬇️ Download JPG
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YoutubeThumbnail;
