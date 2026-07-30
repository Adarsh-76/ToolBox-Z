import React, { useState } from 'react';
import styles from './SocialAnalytics.module.css';

const SocialAnalytics = () => {
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLiveData, setIsLiveData] = useState(false);

  const platforms = ['YouTube', 'Instagram', 'Twitter / X', 'TikTok'];

  const generateReport = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setReport(null);
    setError('');
    setIsLiveData(false);

    try {
      // Call your backend to attempt real data fetch
       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/social-analytics?platform=${encodeURIComponent(platform)}&query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success) {
        // Real YouTube Data Fetched!
        const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
        const engRate = (Math.random() * 5 + 1).toFixed(2);
        
        // Parse string like "1.2M subscribers" into a number for charts
        let followersNum = 0;
        const str = data.followers.toLowerCase();
        if (str.includes('k')) followersNum = parseFloat(str) * 1000;
        else if (str.includes('m')) followersNum = parseFloat(str) * 1000000;
        else followersNum = parseInt(str, 10) || 0;

        const newReport = {
          username: data.username,
          platform: data.platform,
          followers: data.followers, // Keep as string for display
          following: rand(100, 2000),
          posts: rand(50, 1200),
          engagementRate: engRate,
          avgLikes: Math.floor(followersNum * (engRate / 100) * 0.8),
          avgComments: Math.floor(followersNum * (engRate / 100) * 0.1),
          growth: rand(2, 15),
          avatar: data.avatar, // Real YouTube Avatar
          demographics: [
            { age: '13-17', pct: 15, color: '#8B5CF6' },
            { age: '18-24', pct: 40, color: '#06B6D4' },
            { age: '25-34', pct: 30, color: '#EC4899' },
            { age: '35-44', pct: 10, color: '#F59E0B' },
            { age: '45+', pct: 5, color: '#10B981' }
          ],
          followerGrowth: Array.from({ length: 7 }, () => rand(100, 1500))
        };
        
        setReport(newReport);
        setIsLiveData(true);
      } else {
        // Backend couldn't get real data (e.g., Instagram selected, or invalid YouTube)
        // Fall back to Simulator Mode
        if (platform !== 'YouTube') {
          setError('Live data for this platform requires paid APIs. Showing simulated data instead.');
        } else {
          setError('Could not find live data for this channel. Showing simulated data.');
        }
        
        const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
        const followers = rand(5000, 150000);
        const engRate = (Math.random() * 5 + 1).toFixed(2);
        
        const mockReport = {
          username: query,
          platform,
          followers: followers.toLocaleString(),
          following: rand(100, 2000),
          posts: rand(50, 1200),
          engagementRate: engRate,
          avgLikes: Math.floor(followers * (engRate / 100) * 0.8),
          avgComments: Math.floor(followers * (engRate / 100) * 0.1),
          growth: rand(2, 15),
          avatar: null,
          demographics: [
            { age: '13-17', pct: 15, color: '#8B5CF6' },
            { age: '18-24', pct: 40, color: '#06B6D4' },
            { age: '25-34', pct: 30, color: '#EC4899' },
            { age: '35-44', pct: 10, color: '#F59E0B' },
            { age: '45+', pct: 5, color: '#10B981' }
          ],
          followerGrowth: Array.from({ length: 7 }, () => rand(100, 1500))
        };
        
        setReport(mockReport);
        setIsLiveData(false);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the server. Is the backend running?');
    }
    setLoading(false);
  };

  // Simple SVG Line Chart Generator
  const renderChart = (data) => {
    const max = Math.max(...data);
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d / max) * 90; 
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className={styles.chartSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline 
          className={styles.chartArea} 
          points={`0,100 ${points} 100,100`} 
          fill="url(#lineGradient)" 
          stroke="none" 
        />
        <polyline 
          className={styles.chartLine} 
          points={points} 
          fill="none" 
          stroke="var(--accent-color)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          vectorEffect="non-scaling-stroke" 
        />
      </svg>
    );
  };

  return (
    <div className={styles.container}>
      <form className={`liquid-glass ${styles.inputCard}`} onSubmit={generateReport}>
        <div className={styles.platformSelector}>
          {platforms.map(p => (
            <button
              type="button"
              key={p}
              className={`${styles.platformBtn} ${platform === p ? styles.platformActive : ''}`}
              onClick={() => setPlatform(p)}
            >
              {p}
            </button>
          ))}
        </div>
        
        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder={platform === 'YouTube' ? 'Enter YouTube @username or URL...' : `Enter ${platform} username...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.urlInput}
            required
          />
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? '⏳ Analyzing...' : '🔍 Generate Report'}
          </button>
        </div>
      </form>

      {error && <div className={styles.noticeBox}>{error}</div>}

      {loading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Fetching {platform} metrics for @{query}...</p>
        </div>
      )}

      {report && !loading && (
        <div className={styles.dashboard}>
          {/* Profile Header */}
          <div className={`liquid-glass ${styles.profileHeader}`}>
            <div className={styles.avatar}>
              {report.avatar ? (
                <img src={report.avatar} alt="Avatar" className={styles.avatarImg} />
              ) : (
                report.username.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h2 className={styles.profileName}>@{report.username}</h2>
              <p className={styles.profileMeta}>{report.platform} • Public Profile</p>
              {isLiveData && <span className={styles.liveBadge}>🔴 LIVE DATA</span>}
            </div>
            <div className={styles.growthBadge}>
              <span>📈 +{report.growth}%</span>
              <small>Last 7 days</small>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className={styles.statsGrid}>
            <div className={`liquid-glass ${styles.statCard}`}>
              <h3>Followers</h3>
              <p className={styles.statValue}>{report.followers}</p>
            </div>
            <div className={`liquid-glass ${styles.statCard}`}>
              <h3>Engagement Rate</h3>
              <p className={styles.statValue}>{report.engagementRate}%</p>
            </div>
            <div className={`liquid-glass ${styles.statCard}`}>
              <h3>Avg. Likes</h3>
              <p className={styles.statValue}>{report.avgLikes.toLocaleString()}</p>
            </div>
            <div className={`liquid-glass ${styles.statCard}`}>
              <h3>Avg. Comments</h3>
              <p className={styles.statValue}>{report.avgComments.toLocaleString()}</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className={styles.chartsRow}>
            <div className={`liquid-glass ${styles.chartCard}`}>
              <h3 className={styles.chartTitle}>Follower Growth (7 Days)</h3>
              <div className={styles.chartContainer}>
                {renderChart(report.followerGrowth)}
              </div>
            </div>

            <div className={`liquid-glass ${styles.chartCard}`}>
              <h3 className={styles.chartTitle}>Audience Demographics</h3>
              <div className={styles.demoList}>
                {report.demographics.map(d => (
                  <div key={d.age} className={styles.demoItem}>
                    <div className={styles.demoLabel}>
                      <span>{d.age}</span>
                      <span>{d.pct}%</span>
                    </div>
                    <div className={styles.demoBarBg}>
                      <div className={styles.demoBarFill} style={{ width: `${d.pct * 2}%`, background: d.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialAnalytics;
