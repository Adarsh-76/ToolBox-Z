import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './QuickSearch.module.css';

const QuickSearch = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const trendingSearches = ['PDF', 'Image', 'Password', 'JSON', 'Downloader'];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(saved);
  }, []);

  const liveSuggestions = query 
    ? toolsList.filter(tool => 
        tool.name.toLowerCase().includes(query.toLowerCase()) || 
        tool.desc.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const saveSearch = (term) => {
    if (!term.trim()) return;
    let updated = [term, ...recentSearches.filter(s => s.toLowerCase() !== term.toLowerCase())];
    updated = updated.slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query) {
      saveSearch(query);
      navigate(`/tools?search=${encodeURIComponent(query)}`);
      setIsFocused(false);
    }
  };

  const handleToolClick = (toolId) => {
    saveSearch(query);
    navigate(`/tools/${toolId}`);
    setIsFocused(false);
  };

  const handleTermClick = (term) => {
    setQuery(term);
    saveSearch(term);
    navigate(`/tools?search=${encodeURIComponent(term)}`);
    setIsFocused(false);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const showDropdown = isFocused && (query || recentSearches.length > 0 || trendingSearches.length > 0);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Looking for something specific?</h2>
      
      <div className={styles.searchWrapper}>
        <div className={`liquid-glass ${styles.searchBox}`}>
          <span>🔍</span>
          <input 
            id="main-search-input"
            type="text" 
            placeholder="Search tools... (press / to focus)" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
        </div>

        {showDropdown && (
          <div className={`liquid-glass ${styles.resultsDropdown}`}>
            {query && liveSuggestions.length > 0 && (
              <div className={styles.dropdownSection}>
                <h4 className={styles.sectionHeader}>Tools</h4>
                {liveSuggestions.map(tool => (
                  <div 
                    key={tool.id} 
                    className={styles.resultItem}
                    onClick={() => handleToolClick(tool.id)}
                  >
                    <span className={styles.resultIcon}>{tool.icon}</span>
                    <div className={styles.resultText}>
                      <span className={styles.resultName}>{tool.name}</span>
                      <span className={styles.resultDesc}>{tool.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {query && liveSuggestions.length === 0 && (
              <div className={styles.noResults}>
                <p>No tools found for "{query}".</p>
                <button className={styles.viewAllBtn} onClick={() => handleTermClick(query)}>
                  Search all tools →
                </button>
              </div>
            )}

            {!query && (
              <div className={styles.suggestionsGrid}>
                <div className={styles.dropdownSection}>
                  <div className={styles.sectionHeaderRow}>
                    <h4 className={styles.sectionHeader}>Recent</h4>
                    {recentSearches.length > 0 && (
                      <button className={styles.clearBtn} onClick={clearRecent}>Clear</button>
                    )}
                  </div>
                  {recentSearches.length > 0 ? (
                    recentSearches.map((term, i) => (
                      <div key={i} className={styles.termItem} onClick={() => handleTermClick(term)}>
                        <span className={styles.termIcon}>🕒</span> {term}
                      </div>
                    ))
                  ) : (
                    <p className={styles.emptyText}>No recent searches yet.</p>
                  )}
                </div>

                <div className={styles.dropdownSection}>
                  <h4 className={styles.sectionHeader}>Trending</h4>
                  {trendingSearches.map((term, i) => (
                    <div key={i} className={styles.termItem} onClick={() => handleTermClick(term)}>
                      <span className={styles.termIcon}>🔥</span> {term}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickSearch;
