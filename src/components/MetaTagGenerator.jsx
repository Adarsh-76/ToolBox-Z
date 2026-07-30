import React, { useState, useMemo } from 'react';
import styles from './MetaTagGenerator.module.css';

const MetaTagGenerator = () => {
  const [data, setData] = useState({
    title: 'ToolBox Z - All Your Everyday Tools',
    description: 'Fast, free, modern online tools built for everyone.',
    url: 'https://toolboxz.com',
    image: 'https://toolboxz.com/preview.png',
    author: 'ToolBox Z Team'
  });

  const [copied, setCopied] = useState(false);

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const generatedCode = useMemo(() => {
    return `<!-- Primary Meta Tags -->
<title>${data.title}</title>
<meta name="title" content="${data.title}" />
<meta name="description" content="${data.description}" />
<meta name="author" content="${data.author}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${data.url}" />
<meta property="og:title" content="${data.title}" />
<meta property="og:description" content="${data.description}" />
<meta property="og:image" content="${data.image}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${data.url}" />
<meta property="twitter:title" content="${data.title}" />
<meta property="twitter:description" content="${data.description}" />
<meta property="twitter:image" content="${data.image}" />`;
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setData({ title: '', description: '', url: '', image: '', author: '' });
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.inputGroup}>
          <label>Title</label>
          <input type="text" value={data.title} onChange={(e) => handleChange('title', e.target.value)} className={styles.input} placeholder="Website Title" />
        </div>
        <div className={styles.inputGroup}>
          <label>Description</label>
          <textarea value={data.description} onChange={(e) => handleChange('description', e.target.value)} className={styles.textarea} placeholder="Short description of your website" rows={3}></textarea>
        </div>
        <div className={styles.inputGroup}>
          <label>Website URL</label>
          <input type="text" value={data.url} onChange={(e) => handleChange('url', e.target.value)} className={styles.input} placeholder="https://example.com" />
        </div>
        <div className={styles.inputGroup}>
          <label>Image URL</label>
          <input type="text" value={data.image} onChange={(e) => handleChange('image', e.target.value)} className={styles.input} placeholder="https://example.com/image.png" />
        </div>
        <div className={styles.inputGroup}>
          <label>Author</label>
          <input type="text" value={data.author} onChange={(e) => handleChange('author', e.target.value)} className={styles.input} placeholder="Author Name" />
        </div>
        <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear All</button>
      </div>

      {/* Live Preview */}
      <div className={styles.previewArea}>
        <h3>Live Preview (Google & Social)</h3>
        <div className={`liquid-glass ${styles.previewCard}`}>
          <div className={styles.previewImgWrapper}>
            {data.image ? <img src={data.image} alt="Preview" className={styles.previewImg} onError={(e) => e.target.style.display='none'} /> : <div className={styles.imgPlaceholder}>No Image</div>}
          </div>
          <div className={styles.previewContent}>
            <span className={styles.previewUrl}>{data.url ? data.url.replace(/https?:\/\//, '') : 'example.com'}</span>
            <h4 className={styles.previewTitle}>{data.title || 'Website Title'}</h4>
            <p className={styles.previewDesc}>{data.description || 'Website description will appear here.'}</p>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div className={`liquid-glass ${styles.codeArea}`}>
        <div className={styles.codeHeader}>
          <h3>Generated Meta Tags</h3>
          <button className={styles.copyBtn} onClick={handleCopy}>
            {copied ? '✅ Copied!' : '📋 Copy Code'}
          </button>
        </div>
        <pre className={styles.codeBlock}>{generatedCode}</pre>
      </div>
    </div>
  );
};

export default MetaTagGenerator;
