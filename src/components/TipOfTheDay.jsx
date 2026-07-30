import React, { useState, useEffect } from 'react';
import styles from './TipOfTheDay.module.css';

const tips = [
  "💡 Did you know? You can press `/` anywhere on the site to instantly focus the search bar!",
  "⌨️ Press `Ctrl + K` (or `Cmd + K` on Mac) to open the Command Palette and jump straight to a tool.",
  "❤️ Click the heart icon on any tool card to save it to your Favorites for quick access later.",
  "🖼️ Need to convert multiple images into one file? Try the 'Images to PDF' tool!",
  "🤖 Our AI Image Describer can identify objects in your photos 100% locally in your browser.",
  "📂 Check out the 'Collections' section to find curated tool packs for your specific workflow.",
  "⏱️ Struggling to focus? Use the Pomodoro Timer to break your work into 25-minute sprints.",
  "🔍 The Floating Assistant (bottom-right) can help you find tools instantly. Just type what you need!"
];

const TipOfTheDay = () => {
  const [tip, setTip] = useState('');

  useEffect(() => {
    // Check if a tip is already saved in sessionStorage for this visit
    const savedTip = sessionStorage.getItem('sessionTip');
    if (savedTip) {
      setTip(savedTip);
    } else {
      // Pick a random tip and save it to sessionStorage
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      sessionStorage.setItem('sessionTip', randomTip);
      setTip(randomTip);
    }
  }, []);

  if (!tip) return null;

  return (
    <div className={styles.wrapper}>
      <div className={`liquid-glass ${styles.card}`}>
        <span className={styles.icon}>💡</span>
        <p className={styles.text}>{tip}</p>
      </div>
    </div>
  );
};

export default TipOfTheDay;
