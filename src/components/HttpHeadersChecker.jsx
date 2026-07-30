import React, { useState } from 'react';
import styles from './HttpHeadersChecker.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;

const HttpHeadersChecker = () => {
  const [url, setUrl] = useState('example.com');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    setError('');
    setData(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/http-headers?url=${encodeURIComponent(url)}`);
      const result = await response.json();
      if (result.success) {
        setData(result);
      } else {
        setError(result.error || 'Failed to fetch headers.');
      }
    } catch (err) {
      setError('Failed to connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <h3 className={styles.title}>📡 HTTP Headers Checker</h3>
        <p className={styles.subtitle}>Inspect HTTP response headers and security configurations.</p>
        
        <form className={styles.form} onSubmit={handleCheck}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Enter website URL (e.g., google.com)..." 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
          />
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? '⏳' : '🔍 Check'}
          </button>
        </form>
        {error && <div className={styles.errorBox}>{error}</div>}
      </div>

      {data && (
        <div className={styles.resultArea}>
          <div className={`liquid-glass ${styles.statusBox} ${data.status >= 200 && data.status < 300 ? styles.success : data.status >= 300 && data.status < 500 ? styles.redirect : styles.error}`}>
            <span className={styles.statusCode}>{data.status}</span>
            <span className={styles.statusText}>{data.statusText || 'Response'}</span>
          </div>

          <div className={`liquid-glass ${styles.section}`}>
            <h4 className={styles.sectionTitle}>🛡️ Security Headers Summary</h4>
            <div className={styles.headersList}>
              {Object.entries(data.securityHeaders).map(([key, val]) => (
                <div key={key} className={styles.headerRow}>
                  <span className={styles.headerKey}>{key}</span>
                  <span className={`${styles.headerVal} ${val === 'Not Set' ? styles.missing : styles.found}`}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`liquid-glass ${styles.section}`}>
            <h4 className={styles.sectionTitle}>📋 All Response Headers</h4>
            <div className={styles.headersList}>
              {Object.entries(data.headers).map(([key, val]) => (
                <div key={key} className={styles.headerRow}>
                  <span className={styles.headerKey}>{key}</span>
                  <span className={styles.headerVal}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HttpHeadersChecker;
