import React, { useState } from 'react';
import styles from './PlagiarismChecker.module.css';

const PlagiarismChecker = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fillerWords = ['the', 'and', 'a', 'to', 'of', 'in', 'is', 'that', 'it', 'with', 'as', 'for', 'on', 'was', 'are', 'this', 'be', 'have', 'from', 'or', 'by', 'but', 'not', 'what', 'all', 'were', 'when', 'we', 'there', 'can', 'an', 'your', 'which', 'their', 'if', 'do', 'will', 'each', 'about', 'how', 'up', 'out', 'them', 'then', 'she', 'many', 'some', 'so', 'her', 'would', 'make', 'like', 'him', 'into', 'time', 'has', 'look', 'two', 'more', 'write', 'go', 'see', 'number', 'no', 'way', 'could', 'people', 'my', 'than', 'first', 'water', 'been', 'call', 'who', 'its', 'now', 'find', 'long', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part'];

  const handleAnalyze = () => {
    if (!text.trim()) return;

    setIsLoading(true);

    // Simulate analysis delay for UX
    setTimeout(() => {
      // 1. Clean and split words
      const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, '');
      const words = cleanText.split(/\s+/).filter(w => w.length > 0);
      const totalWords = words.length;

      // 2. Calculate Lexical Diversity (Unique Words / Total Words)
      const uniqueWords = new Set(words);
      const lexicalDiversity = totalWords > 0 ? (uniqueWords.size / totalWords) : 0;

      // 3. Calculate Originality Score (Scale 0-100)
      // Higher lexical diversity = higher originality
      let originalityScore = Math.round(lexicalDiversity * 100);
      
      // Add a slight curve to make it more realistic (purely unique text is rare)
      originalityScore = Math.min(100, Math.round(originalityScore * 1.2)); 
      
      // 4. Split into sentences and check for duplicates
      const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
      const cleanSentences = sentences.map(s => s.trim().toLowerCase());
      const sentenceCounts = {};
      const duplicateSentences = [];

      cleanSentences.forEach(s => {
        if (s.length > 10) { // Ignore very short sentences
          sentenceCounts[s] = (sentenceCounts[s] || 0) + 1;
          if (sentenceCounts[s] === 2) {
            duplicateSentences.push(s);
          }
        }
      });

      // Deduct points for duplicate sentences
      if (duplicateSentences.length > 0) {
        originalityScore -= (duplicateSentences.length * 5);
        originalityScore = Math.max(0, originalityScore);
      }

      // 5. Find overused filler words
      const wordFreq = {};
      words.forEach(w => {
        if (fillerWords.includes(w)) {
          wordFreq[w] = (wordFreq[w] || 0) + 1;
        }
      });
      
      const overusedWords = Object.entries(wordFreq)
        .filter(([word, count]) => count > 3)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      setResult({
        originalityScore,
        totalWords,
        uniqueWords: uniqueWords.size,
        duplicateSentences,
        overusedWords
      });

      setIsLoading(false);
    }, 800);
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50'; // Green
    if (score >= 50) return '#ffc107'; // Yellow
    return '#ff4d4d'; // Red
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <h3 className={styles.title}>Plagiarism & Originality Checker</h3>
        <p className={styles.subtitle}>Paste your text below to analyze its uniqueness and detect internal duplication.</p>
        
        <textarea 
          className={styles.textInput}
          placeholder="Paste your essay, article, or text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
        />

        <div className={styles.actions}>
          <button className={styles.analyzeBtn} onClick={handleAnalyze} disabled={isLoading || !text.trim()}>
            {isLoading ? '⏳ Analyzing...' : '🔍 Analyze Text'}
          </button>
          {text && <button className={styles.clearBtn} onClick={handleClear}>✖️ Clear</button>}
        </div>
      </div>

      {result && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3 className={styles.resultTitle}>Analysis Report</h3>
          
          <div className={styles.scoreContainer}>
            <div className={styles.scoreCircle} style={{ borderColor: getScoreColor(result.originalityScore) }}>
              <span className={styles.scoreValue} style={{ color: getScoreColor(result.originalityScore) }}>{result.originalityScore}%</span>
              <span className={styles.scoreLabel}>Originality</span>
            </div>
            <div className={styles.statsBox}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Total Words:</span>
                <span className={styles.statValue}>{result.totalWords}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Unique Words:</span>
                <span className={styles.statValue}>{result.uniqueWords}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Duplicates Found:</span>
                <span className={styles.statValue} style={{ color: result.duplicateSentences.length > 0 ? '#ff4d4d' : '#4caf50' }}>{result.duplicateSentences.length}</span>
              </div>
            </div>
          </div>

          {result.duplicateSentences.length > 0 && (
            <div className={styles.sectionBox}>
              <h4 className={styles.sectionTitle}>⚠️ Duplicate Sentences Detected</h4>
              <p className={styles.sectionDesc}>These sentences appear multiple times in your text:</p>
              <ul className={styles.duplicateList}>
                {result.duplicateSentences.map((s, i) => (
                  <li key={i} className={styles.duplicateItem}>"{s}..."</li>
                ))}
              </ul>
            </div>
          )}

          {result.overusedWords.length > 0 && (
            <div className={styles.sectionBox}>
              <h4 className={styles.sectionTitle}>📉 Overused Filler Words</h4>
              <p className={styles.sectionDesc}>Try replacing these common words to improve your score:</p>
              <div className={styles.wordChips}>
                {result.overusedWords.map(([word, count]) => (
                  <div key={word} className={styles.wordChip}>
                    "{word}" ({count}x)
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;
