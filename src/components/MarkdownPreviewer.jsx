import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './MarkdownPreviewer.module.css';

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to ToolVerse Markdown!

This is a **live previewer**. Type your markdown on the left, and see the result on the right.

## Features
- **Bold** and *Italic* text
- [Links](https://www.google.com)
- \`Inline code\`
- Lists (like this one!)

\`\`\`javascript
// Code blocks work too!
const hello = () => {
  console.log("Hello World!");
};
\`\`\`

> Blockquotes are supported as well.
`);

  const handleClear = () => {
    // Ask for confirmation before clearing
    if (window.confirm("Are you sure you want to clear all the markdown code?")) {
      setMarkdown('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.paneWrapper}>
          <div className={styles.headerRow}>
            <label className={styles.paneLabel}>Markdown Input</label>
            <button className={styles.clayBtn} onClick={handleClear}>
              🗑️ Clear All
            </button>
          </div>
          <div className={`liquid-glass ${styles.textAreaWrapper}`}>
            <textarea 
              className={styles.textarea}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>
        </div>
        
        <div className={styles.paneWrapper}>
          <div className={styles.headerRow}>
            <label className={styles.paneLabel}>Live Preview</label>
          </div>
          <div className={`liquid-glass ${styles.previewWrapper}`}>
            <div className={styles.markdownBody}>
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreviewer;
