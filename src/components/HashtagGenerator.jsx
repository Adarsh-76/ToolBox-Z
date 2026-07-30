import React, { useState } from 'react';
import styles from './HashtagGenerator.module.css';

const HashtagGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = () => {
    if (!keyword) return;
    
    const cleanKeyword = keyword.replace(/[^a-zA-Z0-9]/g, '');
    if (!cleanKeyword) return;

    const mods = [
      '', 'gram', 'life', 'daily', 'photography', 'community', 'world', 
      'lover', 'addict', 'goals', 'vibes', 'time', 'blog', 'insta', 
      'picoftheday', 'photooftheday', 'like4like', 'follow4follow', 
      'instadaily', 'instagood', 'bestoftheday', 'trending'
    ];
    
    const prefixes = ['insta', 'iLove', 'the', 'my'];
    
    const generated = new Set();
    
    // Add base keyword
    generated.add(`#${cleanKeyword.toLowerCase()}`);
    
    // Add suffixes
    mods.forEach(mod => {
      generated.add(`#${cleanKeyword.toLowerCase()}${mod}`);
    });

    // Add prefixes
    prefixes.forEach(pre => {
      generated.add(`#${pre}${cleanKeyword}`);
    });

    // Add trending generic hashtags
    const trending = ['#explore', '#explorepage', '#viral', '#trending', '#fyp', '#foryou', '#love', '#instagood', '#photooftheday', '#lifestyle'];
    trending.forEach(tag => generated.add(tag));

    // Convert Set to Array and limit to 30 (Instagram max)
    const finalTags = Array.from(generated).slice(0, 30);
    setHashtags(finalTags);
    setIsCopied(false);
  };

  const handleCopyAll = () => {
    if (hashtags.length === 0) return;
    navigator.clipboard.writeText(hashtags.join(' '));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyOne = (tag) => {
    navigator.clipboard.writeText(tag);
  };

  const handleClear = () => {
    setKeyword('');
    setHashtags([]);
    setIsCopied(false);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <input 
          type="text" 
          placeholder="Enter a keyword (e.g., travel, food, tech)" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={styles.keywordInput}
        />
        <button className={styles.generateBtn} onClick={handleGenerate}>
          ✨ Generate
        </button>
        {keyword && <button className={styles.clearBtn} onClick={handleClear}>✖️ Clear</button>}
      </div>

      {hashtags.length > 0 && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.resultHeader}>
            <h3 className={styles.resultTitle}>Generated Hashtags ({hashtags.length})</h3>
            <button className={styles.copyAllBtn} onClick={handleCopyAll}>
              {isCopied ? '✅ Copied!' : '📋 Copy All'}
            </button>
          </div>
          <div className={styles.tagsGrid}>
            {hashtags.map((tag, i) => (
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

export default HashtagGenerator;
