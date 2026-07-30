import React, { useState } from 'react';
import styles from './ApiResponseViewer.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;

// Custom Syntax Highlighter for JSON
const syntaxHighlight = (json) => {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 2);
  }
  // Escape HTML tags
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    let cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return `<span class="${styles[cls]}">${match}</span>`;
  });
};

const ApiResponseViewer = () => {
  const [url, setUrl] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!url) return;

    // Prepend https:// if missing
    let fetchUrl = url;
    if (!fetchUrl.startsWith('http://') && !fetchUrl.startsWith('https://')) {
      fetchUrl = 'https://' + fetchUrl;
    }

    setIsLoading(true);
    setError('');
    setResponseData(null);
    setMetaData(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/fetch-url?url=${encodeURIComponent(fetchUrl)}`);
      const data = await response.json();

      if (data.success) {
        setResponseData(data.data);
        setMetaData({ status: data.status, type: data.contentType });
      } else {
        setError(data.error || 'Failed to fetch API.');
      }
    } catch (err) {
      setError('Failed to connect to backend. Is the server running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setResponseData(null);
    setMetaData(null);
    setError('');
  };

  const handleCopy = () => {
    if (responseData) {
      navigator.clipboard.writeText(JSON.stringify(responseData, null, 2));
      alert('JSON copied to clipboard!');
    }
  };

  return (
    <div className={styles.container}>
      
      {/* Informational Banner */}
      <div className={styles.infoBanner}>
        💡 <strong>How to use:</strong> Paste any public <strong>GET API URL</strong> that returns JSON data.
        <br/>
        <em>e.g., <code>https://api.github.com/users/lebron</code></em>
        <br/>
        <small>Note: POST requests or APIs requiring auth headers/keys are not supported.</small>
      </div>

      <form className={`liquid-glass ${styles.inputArea}`} onSubmit={handleFetch}>
        <input
          type="text"
          placeholder="Enter API endpoint URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.urlInput}
          disabled={isLoading}
        />
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.fetchBtn} disabled={isLoading || !url}>
            {isLoading ? '⏳ Fetching...' : '🚀 Send Request'}
          </button>
          <button type="button" className={styles.clearBtn} onClick={handleClear} disabled={isLoading}>
            🗑️ Clear
          </button>
        </div>
      </form>

      {error && <div className={styles.errorBox}>{error}</div>}

      {responseData && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.headerRow}>
            <div className={styles.metaTags}>
              {metaData?.status && (
                <span className={`${styles.tag} ${styles.statusTag}`}>
                  Status: {metaData.status}
                </span>
              )}
              {metaData?.type && (
                <span className={`${styles.tag} ${styles.typeTag}`}>
                  {metaData.type.includes('json') ? 'JSON' : 'Text'}
                </span>
              )}
            </div>
            <button className={styles.copyBtn} onClick={handleCopy}>📋 Copy JSON</button>
          </div>

          <div className={styles.codeBlockWrapper}>
            <pre className={styles.codeBlock}>
              <code 
                dangerouslySetInnerHTML={{ __html: syntaxHighlight(responseData) }} 
              />
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiResponseViewer;
