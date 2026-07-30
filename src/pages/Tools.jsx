import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import { collectionsList } from '../data/collections';
import Comments from '../components/Comments';                         
import ToolRequest from '../components/ToolRequest';
import { fireConfetti } from '../utils/celebrate'; // Added celebration import
import styles from './Tools.module.css';                                

const Tools = () => {
  const navigate = useNavigate();                                         
  const [searchParams, setSearchParams] = useSearchParams();
                                                                          
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');                                                              
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');                                                   
  const [activeCollection, setActiveCollection] = useState(searchParams.get('collection') || null);

const categories = ['All', 'Text Tools', 'Developer Tools', 'Image & Design','Finance & Market', 'Social Media Tools', 'Math & Calculators', 'Productivity', 'PDF Tools', 'Security & Encryption', 'Generators', 'Fun & Games'];

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'All');           
    setActiveCollection(searchParams.get('collection') || null);            
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);                                             
    searchParams.delete('collection');                                     
    setActiveCollection(null);                                                                                                                     
    if (cat === 'All') {                                                     
      searchParams.delete('category');
    } else {                                                                 
      searchParams.set('category', cat);
    }                                                                   
    setSearchParams(searchParams);                                       
  };

  const handleSearchChange = (e) => {                                       
    setSearchQuery(e.target.value);                                        
    if (e.target.value) {                                               
      searchParams.set('search', e.target.value);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams, { replace: true });
  };

  const [favorites, setFavorites] = useState([]);                         
  const [pins, setPins] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('toolFavs') || '[]'));
    setPins(JSON.parse(localStorage.getItem('workspacePins') || '[]'));
  }, []);

  const toggleFavorite = (e, toolId) => {                               
    e.stopPropagation();
    let updatedFavs;                                                    
    if (favorites.includes(toolId)) {
      updatedFavs = favorites.filter(id => id !== toolId);              
    } else {
      updatedFavs = [...favorites, toolId];
      fireConfetti(); // 🎉 Trigger celebration when ADDING a favorite!
    }
    setFavorites(updatedFavs);
    localStorage.setItem('toolFavs', JSON.stringify(updatedFavs));
  };

  const togglePin = (e, toolId) => {                                       
    e.stopPropagation();                                                
    let updatedPins;
    if (pins.includes(toolId)) {                                        
      updatedPins = pins.filter(id => id !== toolId);
    } else {                                                            
      updatedPins = [...pins, toolId];
    }                                                                   
    setPins(updatedPins);
    localStorage.setItem('workspacePins', JSON.stringify(updatedPins)); 
  };                                                                    

  const collectionToolIds = activeCollection                               
    ? collectionsList.find(c => c.name === activeCollection)?.tools || []                                                                       
    : [];
                                                                        
  const filteredTools = toolsList.filter((tool) => {
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollection = !activeCollection || collectionToolIds.includes(tool.id);
    return matchesCategory && matchesSearch && matchesCollection;
  }).sort((a, b) => a.name.localeCompare(b.name));
                                                                        
  return (                                                                  
    <div className={styles.toolsPage}>
      <div className={styles.header}>                                   
        <h1 className={styles.title}>{activeCollection ? `${activeCollection} Collection` : 'Explore Tools'}</h1>
        <p className={styles.subtitle}>
          {activeCollection
            ? `Hand-picked tools for ${activeCollection}.`              
            : 'Select a tool below to get started. All tools are free and fast.'}
        </p>

        <div className={`liquid-glass ${styles.searchBar}`}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            id="main-search-input"
            type="text"
            placeholder="Search for a tool... (press / to focus)"                   
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
                                                                                
        {!activeCollection && (
          <div className={styles.categoryTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}                                                         
          </div>
        )}
      </div>

      <div className={styles.grid}>
        {filteredTools.length > 0 ? (
          filteredTools.map((tool, index) => (                                     
            <div
              key={index}                                                             
              className={`liquid-glass ${styles.card}`}                               
              onClick={() => navigate(`/tools/${tool.id}`)}
            >
              {/* NEW Badge (Top Left) */}                                            
              {tool.isNew && <div className={styles.newBadge}>NEW</div>}

              {/* Action Buttons Group (Top Right) */}
              <div className={styles.cardActions}>
                <button                                                                   
                  className={`${styles.favBtn} ${favorites.includes(tool.id) ? styles.favActive : ''}`}
                  onClick={(e) => toggleFavorite(e, tool.id)}
                  title="Add to Favorites"
                >
                  {favorites.includes(tool.id) ? '❤️' : '🤍'}            
                </button>

                <button
                  className={`${styles.pinBtn} ${pins.includes(tool.id) ? styles.pinActive : ''}`}                                                                
                  onClick={(e) => togglePin(e, tool.id)}
                  title="Pin to Workspace"
                >
                  📌
                </button>                                                            
              </div>

              <div className={styles.icon}>{tool.icon}</div>
              <h3 className={styles.cardTitle}>{tool.name}</h3>
              <p className={styles.cardDesc}>{tool.desc}</p>            
              
              <div className={styles.cardFooter}>
                <div className={styles.stats}>
                  <span className={styles.stars}>⭐️⭐️⭐️⭐️⭐️</span>
                  <span className={styles.rating}>{tool.rating}</span>                    
                  <span className={styles.dot}>•</span>
                  <span className={styles.users}>{tool.users} users</span>
                </div>
                <button className={styles.openBtn}>Open <span className={styles.arrow}>→</span></button>                                                                                                                              
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No tools found. Try another search!</p>
        )}
      </div>                                                                                                                                                                                                                                                                                          

      {/* Comments & Tool Request Section */}                                 
      <Comments toolId="tools-page" />                                                                                                               
      <ToolRequest />                                                       
    </div>                                                                
  );
};                                                                                                                                             

export default Tools;
