import React, { useState, useEffect } from 'react';
import styles from './CricketScores.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;

const CricketScores = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchScores = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/cricket-scores`);
      const data = await response.json();
      
      if (data.success) {
        setMatches(data.matches);
        setLastUpdated(new Date().toLocaleTimeString());
        setError('');
      } else {
        setError(data.error || 'Failed to fetch scores.');
      }
    } catch (err) {
      setError('Failed to connect to backend. Is the server running?');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

    useEffect(() => {
    fetchScores(); // Initial fetch
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => fetchScores(false), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => fetchScores(true);

  if (isLoading) {
    return <div className={styles.loading}>🏏 Loading live scores...</div>;
  }

  if (error) {
    return <div className={styles.errorBox}>{error}</div>;
  }

  if (matches.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noMatches}>
          No live matches at the moment. Please check back later!
          <button className={styles.refreshBtn} onClick={handleRefresh} disabled={isRefreshing} style={{marginTop: '1rem'}}>
            <span className={isRefreshing ? styles.spinning : ''}>🔄</span> Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header Row with Manual Refresh Button */}
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Live Matches</h2>
        <button className={styles.refreshBtn} onClick={handleRefresh} disabled={isRefreshing}>
          <span className={isRefreshing ? styles.spinning : ''}>🔄</span> 
          {isRefreshing ? 'Updating...' : 'Refresh'}
        </button>
      </div>

      {matches.map((match) => (
        <div key={match.id} className={`liquid-glass ${styles.matchCard} ${match.isLive ? styles.liveMatch : ''}`}>
          <div className={styles.matchHeader}>
            <span className={styles.seriesName}>{match.series}</span>
            {match.isLive && <span className={styles.liveBadge}>🔴 LIVE</span>}
          </div>

          <div className={styles.teamRow}>
            <div className={styles.teamInfo}>
              {match.team1.flag && <img src={match.team1.flag} alt={match.team1.name} className={styles.flag} />}
              <span className={styles.teamName}>{match.team1.name}</span>
            </div>
            <span className={styles.teamScore}>{match.team1.score}</span>
          </div>

          <div className={styles.teamRow}>
            <div className={styles.teamInfo}>
              {match.team2.flag && <img src={match.team2.flag} alt={match.team2.name} className={styles.flag} />}
              <span className={styles.teamName}>{match.team2.name}</span>
            </div>
            <span className={styles.teamScore}>{match.team2.score}</span>
          </div>

          <div className={styles.matchFooter}>
            <span className={styles.status}>{match.status}</span>
            {match.venue && <span className={styles.venue}>📍 {match.venue}</span>}
          </div>
        </div>
      ))}
      
      {lastUpdated && <p className={styles.updateTime}>Last updated: {lastUpdated} (Auto-refreshes in 30s)</p>}
    </div>
  );
};

export default CricketScores;
