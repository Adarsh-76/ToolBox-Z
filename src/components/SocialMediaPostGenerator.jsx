import React, { useState } from 'react';
import styles from './SocialMediaPostGenerator.module.css';

const SocialMediaPostGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [tone, setTone] = useState('Professional');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = () => {
    if (!keyword) return;
    const cleanKeyword = keyword.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    if (!cleanKeyword) return;

    const hooks = {
      Professional: [`Navigating the world of ${cleanKeyword} just got easier.`, `Here is your ultimate guide to ${cleanKeyword}.`, `Why ${cleanKeyword} matters more than ever in today's landscape.`],
      Casual: [`Okay, let's talk about ${cleanKeyword}! 🧐`, `I just found the best ${cleanKeyword} hack and had to share.`, `Who else is obsessed with ${cleanKeyword} right now?`],
      Funny: [`My relationship status: in a committed relationship with ${cleanKeyword}.`, `Plot twist: ${cleanKeyword} is actually the real MVP.`, `I told my computer I needed a break, and it showed me ${cleanKeyword}.`],
      Exciting: [`🚀 BIG NEWS! We are diving deep into ${cleanKeyword} today!`, `You won't believe these ${cleanKeyword} secrets!`, `Get ready to level up your ${cleanKeyword} game! 🔥`]
    };

    const bodies = {
      Professional: `We understand that mastering ${cleanKeyword} can be challenging. That's why we've broken down the core concepts into actionable steps. Whether you're a beginner or looking to refine your skills, this insight will provide value.`,
      Casual: `Honestly, ${cleanKeyword} has been a game-changer for me lately. I was struggling at first, but once I figured out these tips, everything clicked. Let me know if you've tried this!`,
      Funny: `So I spent 3 hours trying to figure out ${cleanKeyword} and turns out, I was doing it backwards the whole time. 😂 If you need me, I'll be here with my ${cleanKeyword}.`,
      Exciting: `We are SO excited to share this ${cleanKeyword} update with you! It’s bigger, better, and faster. Say goodbye to the old way and hello to the future of ${cleanKeyword}!`
    };

    const ctas = {
      Instagram: `\n.\n👉 Tap the link in our bio to learn more!\n💬 Drop a comment below with your thoughts!`,
      Twitter: `\n.\nRetweet if you found this helpful! 🔄`,
      LinkedIn: `\n.\nWhat are your thoughts on ${cleanKeyword}? Share your experience in the comments! 👇`,
      Facebook: `\n.\nLike our page for more updates on ${cleanKeyword}! 👍`
    };

    const hashtags = `\n.\n#${cleanKeyword.replace(/\s+/g, '')} #${cleanKeyword.replace(/\s+/g, '')}Community #${cleanKeyword.replace(/\s+/g, '')}Life #Trending #Explore`;

    const randomHook = hooks[tone][Math.floor(Math.random() * hooks[tone].length)];
    
    let post = `${randomHook}\n\n${bodies[tone]}${ctas[platform]}${hashtags}`;
    
    if (platform === 'Twitter') {
      post = post.substring(0, 270); // Keep Twitter under 280 chars
    }

    setGeneratedPost(post);
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (!generatedPost) return;
    navigator.clipboard.writeText(generatedPost);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setKeyword('');
    setGeneratedPost('');
    setIsCopied(false);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.controlsArea}`}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label>Topic / Keyword</label>
            <input 
              type="text" 
              placeholder="e.g., Digital Marketing, Fitness, Coding" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter / X</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Facebook">Facebook</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>Tone</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Funny">Funny</option>
              <option value="Exciting">Exciting</option>
            </select>
          </div>
        </div>
        
        <div className={styles.btnRow}>
          <button className={styles.generateBtn} onClick={handleGenerate}>✍️ Generate Post</button>
          {keyword && <button className={styles.clearBtn} onClick={handleClear}>✖️ Reset</button>}
        </div>
      </div>

      {generatedPost && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.resultHeader}>
            <h3 className={styles.resultTitle}>Generated Post</h3>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {isCopied ? '✅ Copied!' : '📋 Copy Post'}
            </button>
          </div>
          <div className={styles.postContainer}>
            <pre className={styles.postText}>{generatedPost}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaPostGenerator;
