import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MostUsedTools.module.css';

// The 6 official "Most Used" tools.
const staticTools = [
  { id: 'youtube-downloader', icon: '📺', name: 'YouTube Video Downloader', desc: 'Download videos in MP4 format or convert to high-quality MP3 audio.' },
  { id: 'instagram-downloader', icon: '📸', name: 'Instagram Downloader', desc: 'Download high-quality photos, stories, and posts from Instagram.' },
  { id: 'pinterest-downloader', icon: '📌', name: 'Pinterest Image Downloader', desc: 'Download high-quality images from Pinterest boards and pins.' },
  { id: 'tiktok-downloader', icon: '🎵', name: 'TikTok Downloader', desc: 'Download TikTok videos without watermark or extract MP3 audio.' },
  { id: 'dailymotion-downloader', icon: '📹', name: 'Dailymotion Downloader', desc: 'Download high-quality videos from Dailymotion in MP4 format instantly.' },
  { id: 'image-converter', icon: '🖼️', name: 'Image Converter', desc: 'Convert, enhance, and download images in any format.' }
];

const MostUsedTools = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>🔥 Our Most Used Tools</h2>
        <p className={styles.subtitle}>The crowd favorites. Quick access to the tools everyone loves.</p>
      </div>

      <div className={styles.grid}>
        {staticTools.map((tool, i) => (
          <div 
            key={i} 
            className={`liquid-glass ${styles.card}`}
            onClick={() => navigate(`/tools/${tool.id}`)}
          >
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{tool.icon}</span>
              <h3 className={styles.cardTitle}>{tool.name}</h3>
            </div>
            <p className={styles.cardDesc}>{tool.desc}</p>
            <button className={styles.openBtn}>Open <span className={styles.arrow}>→</span></button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MostUsedTools;
