import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './MissionControl.module.css';

const MissionControl = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    discovered: 0,
    actions: 0,
    favorites: 0,
    pins: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Aggregate all local data
    const uniqueUsed = JSON.parse(localStorage.getItem('uniqueToolsUsed') || '[]');
    const counts = JSON.parse(localStorage.getItem('toolCounts') || '{}');
    const favs = JSON.parse(localStorage.getItem('toolFavs') || '[]');
    const pins = JSON.parse(localStorage.getItem('workspacePins') || '[]');
    const recentIds = JSON.parse(localStorage.getItem('recentTools') || '[]');

    const totalActions = Object.values(counts).reduce((sum, count) => sum + count, 0);

    setStats({
      discovered: uniqueUsed.length,
      actions: totalActions,
      favorites: favs.length,
      pins: pins.length
    });

    // Map recent IDs to tool data
    const activity = recentIds.map(id => {
      const tool = toolsList.find(t => t.id === id);
      const count = counts[id] || 1;
      return tool ? { ...tool, count } : null;
    }).filter(Boolean);

    setRecentActivity(activity);
  }, []);

  const handleClearCache = () => {
    if (window.confirm('Are you sure you want to clear your local usage cache? This will reset your heatmap and stats.')) {
      localStorage.removeItem('toolCounts');
      localStorage.removeItem('recentTools');
      localStorage.removeItem('uniqueToolsUsed');
      window.location.reload();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>🛰️ Mission Control</h1>
          <p className={styles.subtitle}>Your personal ToolBox Z command center.</p>
        </div>
        <div className={styles.statusBadge}>
          <span className={styles.liveDot}></span> All Systems Operational
        </div>
      </div>

      {/* Vital Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={`liquid-glass ${styles.statCard}`}>
          <span className={styles.statIcon}>🚀</span>
          <h3>{stats.actions}</h3>
          <p>Total Actions</p>
        </div>
        <div className={`liquid-glass ${styles.statCard}`}>
          <span className={styles.statIcon}>🧭</span>
          <h3>{stats.discovered}</h3>
          <p>Tools Discovered</p>
        </div>
        <div className={`liquid-glass ${styles.statCard}`}>
          <span className={styles.statIcon}>❤️</span>
          <h3>{stats.favorites}</h3>
          <p>Favorites Saved</p>
        </div>
        <div className={`liquid-glass ${styles.statCard}`}>
          <span className={styles.statIcon}>📌</span>
          <h3>{stats.pins}</h3>
          <p>Workspace Pins</p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Recent Activity Feed */}
        <div className={`liquid-glass ${styles.panel}`}>
          <h3 className={styles.panelTitle}>Recent Activity</h3>
          {recentActivity.length > 0 ? (
            <div className={styles.activityList}>
              {recentActivity.map((tool, i) => (
                <div key={i} className={styles.activityItem} onClick={() => navigate(`/tools/${tool.id}`)}>
                  <span className={styles.activityIcon}>{tool.icon}</span>
                  <div className={styles.activityInfo}>
                    <h4>{tool.name}</h4>
                    <p>Used {tool.count} time{tool.count > 1 ? 's' : ''} total</p>
                  </div>
                  <span className={styles.activityArrow}>→</span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>No recent activity yet. Go explore some tools!</p>
          )}
        </div>

        {/* Quick Actions & System Status */}
        <div className={styles.sidePanel}>
          <div className={`liquid-glass ${styles.panel}`}>
            <h3 className={styles.panelTitle}>Quick Actions</h3>
            <div className={styles.quickActions}>
              <button className={styles.actionBtn} onClick={() => navigate('/workspace')}>🧰 Open Workspace</button>
              <button className={styles.actionBtn} onClick={() => navigate('/favorites')}>⭐ View Favorites</button>
              <button className={styles.actionBtn} onClick={() => navigate('/my-downloads')}>⬇️ My Downloads</button>
              <button className={styles.actionBtn} onClick={() => navigate('/settings')}>⚙️ Settings</button>
            </div>
          </div>

          <div className={`liquid-glass ${styles.panel}`}>
            <h3 className={styles.panelTitle}>System Status</h3>
            <div className={styles.statusList}>
              <div className={styles.statusItem}>
                <span>Backend API</span>
                <span className={`${styles.statusDot} ${styles.online}`}></span>
              </div>
              <div className={styles.statusItem}>
                <span>Database Cluster</span>
                <span className={`${styles.statusDot} ${styles.online}`}></span>
              </div>
              <div className={styles.statusItem}>
                <span>AI Processing</span>
                <span className={`${styles.statusDot} ${styles.online}`}></span>
              </div>
              <div className={styles.statusItem}>
                <span>Local Cache</span>
                <span className={`${styles.statusDot} ${styles.online}`}></span>
              </div>
            </div>
            <button className={styles.clearCacheBtn} onClick={handleClearCache}>🗑️ Clear Local Cache</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionControl;
