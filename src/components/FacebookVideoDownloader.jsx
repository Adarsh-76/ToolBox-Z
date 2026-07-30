import React, { useState } from 'react';
import styles from './FacebookVideoDownloader.module.css';

const FacebookVideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setError('');
    setPostData(null);
    if (!url) return;

    if (!url.includes('facebook.com/')) {
      setError('Please enter a valid Facebook URL.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/facebook?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.success) {
        setPostData({
          details: data.details,
          variants: data.variants
        });
      } else {
        setError(data.error || 'Failed to fetch media.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch media. Is the backend server running?');
    }
    setIsLoading(false);
  };

  const handleDownload = async (mediaUrl, qualityLabel) => {
    try {
      const response = await fetch(mediaUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      
      const ext = mediaUrl.includes('.mp4') ? 'mp4' : 'jpg';
      const fileName = `facebook_${qualityLabel.replace(/\s+/g, '_')}.${ext}`;
        
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      window.open(mediaUrl, '_blank');
      alert('Automatic download blocked by browser. Right-click the media in the new tab and select "Save As..."');
    }
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
            placeholder="Paste Facebook URL..." 
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
              {postData.details.isImage ? (
                <img src={postData.details.cover} alt="Cover" className={styles.videoPreview} />
              ) : (
                <video controls poster={postData.details.cover} className={styles.videoPreview}>
                  {postData.variants.length > 0 && <source src={postData.variants[0].url} type="video/mp4" />}
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <div className={styles.postInfo}>
              <h3 className={styles.resultTitle}>{postData.details.title}</h3>
              {postData.details.desc && <p className={styles.desc}>{postData.details.desc}</p>}
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
                    <img src={imgUrl} alt={`Facebook Photo ${i + 1}`} className={styles.postImage} />
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

          {/* Video Download Section */}
          {!postData.details.isImage && postData.variants.length > 0 && (
            <>
              <div className={styles.downloadHeader}>
                <span>Select Download Quality:</span>
              </div>

              <div className={styles.downloadGrid}>
                {postData.variants.map((variant, i) => (
                  <button 
                    key={i} 
                    className={styles.downloadBtn} 
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

export default FacebookVideoDownloader;
