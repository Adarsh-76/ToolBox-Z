import React, { useState, useEffect } from 'react';
import styles from './Achievements.module.css';
import Reveal from './Reveal';
import { fireConfetti, fireSideCannons } from '../utils/celebrate';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'http://' + window.location.hostname + ':5000';

const badges = [
  { id: 'rookie', icon: '👶', name: 'Rookie', desc: 'Used your first tool', requirement: 1 },
  { id: 'starter', icon: '🌱', name: 'Starter', desc: 'Used 10 different tools', requirement: 10 }, // NEW BADGE
  { id: 'explorer', icon: '🥇', name: 'Explorer', desc: 'Used 25 different tools', requirement: 25 },
  { id: 'pro', icon: '🛠️', name: 'Tool Pro', desc: 'Used 50 different tools', requirement: 50 },
  { id: 'power', icon: '🚀', name: 'Power User', desc: 'Used 100 different tools', requirement: 100 },
  { id: 'master', icon: '👑', name: 'Tool Master', desc: 'Used every single tool', requirement: 102 }
];

const Achievements = () => {
  const [usedCount, setUsedCount] = useState(0);

  useEffect(() => {
    const fetchAchievements = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        // Fetch from backend if logged in
        try {
          const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            processCount(data.user.uniqueToolsUsed.length);
            return;
          }
        } catch (err) {
          console.error('Failed to fetch achievements:', err);
        }
      }
      
      // Fallback to local storage if not logged in or fetch fails
      const localUnique = JSON.parse(localStorage.getItem('uniqueToolsUsed') || '[]');
      processCount(localUnique.length);
    };

    const processCount = (newCount) => {
      setUsedCount(newCount);

      // Celebration Logic
      const lastSeenStr = sessionStorage.getItem('lastSeenToolCount');
      if (lastSeenStr !== null) {
        const lastSeen = parseInt(lastSeenStr, 10);
        if (newCount > lastSeen) {
          badges.forEach(badge => {
            if (newCount >= badge.requirement && lastSeen < badge.requirement) {
              if (badge.id === 'master' || badge.id === 'power') {
                fireSideCannons();
              } else {
                fireConfetti();
              }
            }
          });
        }
      }
      sessionStorage.setItem('lastSeenToolCount', newCount.toString());
    };

    fetchAchievements();
  }, []);

  return (
    <Reveal>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Achievements</h2>
          <p className={styles.subtitle}>Keep exploring to unlock all badges!</p>
        </div>

        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.min((usedCount / badges[badges.length-1].requirement) * 100, 100)}%` }}
            ></div>
          </div>
          <span className={styles.progressText}>{usedCount} / {badges[badges.length-1].requirement} Tools</span>
        </div>

        <div className={styles.grid}>
          {badges.map((badge, i) => {
            const isUnlocked = usedCount >= badge.requirement;
            return (
              <div
                key={i}
                className={`liquid-glass ${styles.card} ${isUnlocked ? styles.unlocked : styles.locked}`}
              >
                <div className={styles.iconWrapper}>{badge.icon}</div>
                <h3 className={styles.badgeName}>{badge.name}</h3>
                <p className={styles.badgeDesc}>{badge.desc}</p>

                {!isUnlocked && (
                  <div className={styles.lockOverlay}>
                    <span>🔒 Locked</span>
                  </div>
                )}

                {isUnlocked && (
                  <div className={styles.unlockedBadge}>
                    <span>✅ Unlocked</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </Reveal>
  );
};

export default Achievements;
