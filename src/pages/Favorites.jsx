import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import toolsStyles from './Tools.module.css'; // Reuse Tools page styles!
import EmptyState from '../components/EmptyState'; // Import Empty State
import { fireConfetti } from '../utils/celebrate'; // Added celebration import

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem('toolFavs') || '[]');
    setFavorites(savedFavs);
  }, []);

  const toggleFavorite = (e, toolId) => {
    e.stopPropagation();
    let updatedFavs;
    
    // If it's already in favorites, remove it
    if (favorites.includes(toolId)) {
      updatedFavs = favorites.filter(id => id !== toolId);
    } else {
      // If it's not in favorites, we are ADDING it -> CELEBRATE!
      updatedFavs = [...favorites, toolId];
      fireConfetti(); 
    }
    
    setFavorites(updatedFavs);
    localStorage.setItem('toolFavs', JSON.stringify(updatedFavs));
  };

  const favTools = toolsList.filter(tool => favorites.includes(tool.id));

  return (
    <div className={toolsStyles.toolsPage}>
      <div className={toolsStyles.header}>
        <h1 className={toolsStyles.title}>My Favorites</h1>
        <p className={toolsStyles.subtitle}>Your saved tools for quick access.</p>
      </div>

      {favTools.length > 0 ? (
        <div className={toolsStyles.grid}>
          {favTools.map((tool, index) => (
            <div
              key={index}
              className={`liquid-glass ${toolsStyles.card}`}
              onClick={() => navigate(`/tools/${tool.id}`)}
            >
              {tool.isNew && <div className={toolsStyles.newBadge}>NEW</div>}

              <button
                className={`${toolsStyles.favBtn} ${toolsStyles.favActive}`}
                onClick={(e) => toggleFavorite(e, tool.id)}
              >
                ❤️
              </button>

              <div className={toolsStyles.icon}>{tool.icon}</div>
              <h3 className={toolsStyles.cardTitle}>{tool.name}</h3>
              <p className={toolsStyles.cardDesc}>{tool.desc}</p>

              <div className={toolsStyles.cardFooter}>
                <div className={toolsStyles.stats}>
                  <span className={toolsStyles.stars}>⭐️⭐️⭐️⭐️⭐️</span>
                  <span className={toolsStyles.rating}>{tool.rating}</span>
                  <span className={toolsStyles.dot}>•</span>
                  <span className={toolsStyles.users}>{tool.users} users</span>
                </div>
                <button className={toolsStyles.openBtn}>Open <span className={toolsStyles.arrow}>→</span></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Beautiful Empty State */
        <EmptyState
          icon="⭐"
          title="Your favorites are empty"
          description="Save your favorite tools here for quick access. Click the heart icon on any tool card to add it to your favorites."
          actionText="Browse Tools"
          onAction={() => navigate('/tools')}
        />
      )}
    </div>
  );
};

export default Favorites;
