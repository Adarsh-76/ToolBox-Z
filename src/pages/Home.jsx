import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import TipOfTheDay from '../components/TipOfTheDay';
import QuickSearch from '../components/QuickSearch';
import Collections from '../components/Collections';
import DailyTool from '../components/DailyTool';
import RecentlyAdded from '../components/RecentlyAdded';
import MostUsedTools from '../components/MostUsedTools'; // Added import
import UserTools from '../components/UserTools';
import Achievements from '../components/Achievements';
import PopularTools from '../components/PopularTools';
import Recommendations from '../components/Recommendations';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Comments from '../components/Comments';
import ToolRequest from '../components/ToolRequest'; 
import InstallPWA from '../components/InstallPWA';
import HomepageBuilder from '../components/HomepageBuilder';
import styles from './Home.module.css';

// Define all available sections (MostUsedTools placed high up!)
const allSections = [
  { id: 'hero', name: 'Hero Banner', icon: '🦸‍♂️', component: <Hero /> },
  { id: 'pwa', name: 'Install App', icon: '📲', component: (
    <div className={styles.installWrapper}>
      <InstallPWA />
    </div>
  ) },
  { id: 'most-used', name: 'Most Used Tools', icon: '🔥', component: <MostUsedTools /> }, // NEW SECTION HERE
  { id: 'tip', name: 'Tip of the Day', icon: '💡', component: <TipOfTheDay /> },
  { id: 'search', name: 'Quick Search', icon: '🔍', component: <QuickSearch /> },
  { id: 'collections', name: 'Collections', icon: '🗂️', component: <Collections /> },
  { id: 'daily', name: 'Daily Tool', icon: '⏰', component: <DailyTool /> },
  { id: 'recent', name: 'Recently Added', icon: '🆕', component: <RecentlyAdded /> },
  { id: 'myRecent', name: 'My Recent Tools', icon: '🕘', component: <UserTools type="recent" /> },
  { id: 'myFavs', name: 'My Favorites', icon: '❤️', component: <UserTools type="favorites" /> },
  { id: 'recommendations', name: 'Smart Recommendations', icon: '🎯', component: <Recommendations /> },
  { id: 'achievements', name: 'Achievements', icon: '🏆', component: <Achievements /> },
  { id: 'popular', name: 'Popular Tools', icon: '📈', component: <PopularTools /> },
  { id: 'features', name: 'Features', icon: '✨', component: <Features /> },
  { id: 'faq', name: 'FAQ', icon: '❓', component: <FAQ /> },
  { id: 'comments', name: 'Comments', icon: '💬', component: <Comments toolId="home-page" /> },
  { id: 'request', name: 'Tool Request', icon: '✍️', component: <ToolRequest /> },
];

const Home = () => {
  const [activeSections, setActiveSections] = useState(allSections);
  const [showBuilder, setShowBuilder] = useState(false);

  useEffect(() => {
    // Load saved order from local storage
    const savedOrder = JSON.parse(localStorage.getItem('homeOrder'));
    if (savedOrder && Array.isArray(savedOrder)) {
      const sorted = [...allSections].sort((a, b) => {
        return savedOrder.indexOf(a.id) - savedOrder.indexOf(b.id);
      });
      setActiveSections(sorted);
    }

    const handleReorder = () => {
      const newOrder = JSON.parse(localStorage.getItem('homeOrder'));
      if (newOrder) {
        const sorted = [...allSections].sort((a, b) => newOrder.indexOf(a.id) - newOrder.indexOf(b.id));
        setActiveSections(sorted);
      } else {
        setActiveSections(allSections);
      }
    };

    window.addEventListener('homeReordered', handleReorder);
    return () => window.removeEventListener('homeReordered', handleReorder);
  }, []);

  const handleResetLayout = () => {
    localStorage.removeItem('homeOrder');
    setActiveSections(allSections);
  };

  return (
    <>
      <div className={styles.customizeWrapper}>
        <button className={styles.customizeBtn} onClick={() => setShowBuilder(true)}>
          ⚙️ Customize Homepage
        </button>
      </div>

      <div className={styles.sectionsContainer}>
        {activeSections.map(section => (
          <React.Fragment key={section.id}>
            {section.component}
          </React.Fragment>
        ))}
      </div>

      {showBuilder && (
        <HomepageBuilder 
          sections={activeSections} 
          setSections={setActiveSections} 
          onClose={() => setShowBuilder(false)} 
          onReset={handleResetLayout}
        />
      )}
    </>
  );
};

export default Home;
