import React, { useState, useMemo } from 'react';
import styles from './UtmBuilder.module.css';

const UtmBuilder = () => {
  const [data, setData] = useState({
    url: 'https://example.com',
    source: 'twitter',
    medium: 'social',
    campaign: 'summer_sale',
    term: '',
    content: ''
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const generatedUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (data.source) params.append('utm_source', data.source);
    if (data.medium) params.append('utm_medium', data.medium);
    if (data.campaign) params.append('utm_campaign', data.campaign);
    if (data.term) params.append('utm_term', data.term);
    if (data.content) params.append('utm_content', data.content);

    let baseUrl = data.url;
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = 'https://' + baseUrl;
    }

    const queryStr = params.toString();
    return queryStr ? `${baseUrl}?${queryStr}` : baseUrl;
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setData({ url: '', source: '', medium: '', campaign: '', term: '', content: '' });
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label>Website URL *</label>
            <input type="text" value={data.url} onChange={(e) => handleChange('url', e.target.value)} className={styles.input} placeholder="https://yoursite.com" />
          </div>
          <div className={styles.inputGroup}>
            <label>Campaign Source *</label>
            <input type="text" value={data.source} onChange={(e) => handleChange('source', e.target.value)} className={styles.input} placeholder="google, twitter, newsletter" />
          </div>
          <div className={styles.inputGroup}>
            <label>Campaign Medium *</label>
            <input type="text" value={data.medium} onChange={(e) => handleChange('medium', e.target.value)} className={styles.input} placeholder="cpc, social, email" />
          </div>
          <div className={styles.inputGroup}>
            <label>Campaign Name *</label>
            <input type="text" value={data.campaign} onChange={(e) => handleChange('campaign', e.target.value)} className={styles.input} placeholder="summer_sale, promo_2024" />
          </div>
          <div className={styles.inputGroup}>
            <label>Campaign Term (Optional)</label>
            <input type="text" value={data.term} onChange={(e) => handleChange('term', e.target.value)} className={styles.input} placeholder="running+shoes" />
          </div>
          <div className={styles.inputGroup}>
            <label>Campaign Content (Optional)</label>
            <input type="text" value={data.content} onChange={(e) => handleChange('content', e.target.value)} className={styles.input} placeholder="logolink, textlink" />
          </div>
        </div>
        <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear Form</button>
      </div>

      <div className={`liquid-glass ${styles.outputArea}`}>
        <div className={styles.outputHeader}>
          <h3>Generated Tracking URL</h3>
          <button className={styles.copyBtn} onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy URL'}</button>
        </div>
        <pre className={styles.codeBlock}>{generatedUrl}</pre>
      </div>
    </div>
  );
};

export default UtmBuilder;
