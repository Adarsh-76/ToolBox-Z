import React, { useState } from 'react';
import styles from './YoutubeTagsExtractor.module.css';

const YoutubeTagsExtractor = () => {
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [videoInfo, setVideoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleFetch = async () => {
    setError('');
    setTags([]);
    setVideoInfo(null);
    setIsCopied(false);
    if (!url) return;

    // FIXED: Added |shorts to the regex to support YouTube Shorts URLs
    const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!match) {
      setError('Invalid YouTube URL. Please paste a valid video link.');
      return;
    }

    const videoId = match[1];
    setIsLoading(true);

    try {
      // Fetch from our Node.js Backend
      const response = await fetch(`http://localhost:5000/api/youtube-tags?v=${videoId}`);
      const data = await response.json();

      if (data.success && data.tags.length > 0) {
        setTags(data.tags);
      } else {
        setError(data.error || 'Could not find tags. YouTube may have hidden them for this video.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tags. Is the backend server running?');
    }
    setIsLoading(false);
  };

  const handleCopyAll = () => {
    if (tags.length === 0) return;
    navigator.clipboard.writeText(tags.join(', '));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyOne = (tag) => {
    navigator.clipboard.writeText(tag);
  };

  const handleClear = () => {
    setUrl('');
    setTags([]);
    setVideoInfo(null);
    setError('');
    setIsCopied(false);
  };

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
        <button className={styles.fetchBtn} onClick={handleFetch} disabled={isLoading}>
          {isLoading ? '⏳ Extracting...' : '🔍 Extract Tags'}
        </button>
        {url && <button className={styles.clearBtn} onClick={handleClear}>✖️ Reset</button>}
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {tags.length > 0 && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.resultHeader}>
            <div className={styles.videoInfo}>
              <h3 className={styles.resultTitle}>Extracted Tags ({tags.length})</h3>
            </div>
            <button className={styles.copyAllBtn} onClick={handleCopyAll}>
              {isCopied ? '✅ Copied!' : '📋 Copy All'}
            </button>
          </div>
          <div className={styles.tagsGrid}>
            {tags.map((tag, i) => (
              <div
                key={i}
                className={styles.tagChip}
                onClick={() => handleCopyOne(tag)}
                title="Click to copy"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubeTagsExtractor;
