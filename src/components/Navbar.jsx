import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const navigate = useNavigate();
  const location = useLocation();
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
      if (token) {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserName(user?.name || user?.username || 'User');
      }
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        btnRef.current && !btnRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!profileOpen) return;
    const handleScroll = () => setProfileOpen(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [profileOpen]);

  const handleLogoutClick = () => {
    setProfileOpen(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  const toggleProfile = () => {
    if (!profileOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const menuWidth = 240;
      let leftPos = rect.right - menuWidth;
      if (leftPos < 10) leftPos = 10;
      setMenuPos({ top: rect.bottom + 10, left: leftPos });
    }
    setProfileOpen(!profileOpen);
  };

  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'U';

  return (
    <Fragment>
      <nav className={`liquid-glass ${styles.navbar}`}>
        {/* Top Row: Logo & User Actions */}
        <div className={styles.topRow}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🧰</span>
            <span className={styles.logoText}>ToolBox <span className={styles.accent}>Z</span></span>
          </Link>

          {/* Right Icons (Always Visible) */}
          <div className={styles.rightIcons}>
            <Link to="/mission-control" className={styles.iconLink} title="Mission Control">🛰️</Link>
            <Link to="/labs" className={styles.iconLink} title="Labs (Beta Tools)">🧪</Link>
            <Link to="/favorites" className={styles.iconLink} title="Favorites">❤️</Link>
            <Link to="/my-downloads" className={styles.iconLink} title="My Downloads">📂</Link>
            <Link to="/chat" className={styles.iconLink} title="Live Discussion">💬</Link>
            <Link to="/my-tools" className={styles.iconLink} title="My Custom Tools">🛠️</Link>

            {isLoggedIn ? (
              <div className={styles.profileContainer}>
                <button
                  ref={btnRef}
                  className={`${styles.profileCircle} ${profileOpen ? styles.profileActive : ''}`}
                  onClick={toggleProfile}
                  title="Profile"
                >
                  {userInitial}
                </button>
              </div>
            ) : (
              <Link to="/auth" className={styles.loginBtn}>Login</Link>
            )}
          </div>
        </div>

        {/* Bottom Row: Main Navigation Links (Always Visible) */}
        <div className={styles.bottomRow}>
          <Link to="/" className={location.pathname === '/' ? styles.active : ''}>Home</Link>
          <Link to="/tools" className={location.pathname === '/tools' ? styles.active : ''}>Explore Tools</Link>
          <Link to="/workspace" className={location.pathname === '/workspace' ? styles.active : ''}>Workspace</Link>
          <Link to="/about" className={location.pathname === '/about' ? styles.active : ''}>About</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? styles.active : ''}>Contact</Link>
          <Link to="/workflows" className={location.pathname === '/workflows' ? styles.active : ''}>Workflow</Link>
        </div>
      </nav>

      {/* Floating Dropdown (Sibling to Navbar) */}
      {profileOpen && (
        <div
          ref={menuRef}
          className={styles.profileDropdown}
          style={{ top: `${menuPos.top}px`, left: `${menuPos.left}px` }}
        >
          <div className={styles.dropdownHeader}>
            <div className={styles.dropdownAvatar}>{userInitial}</div>
            <div>
              <p className={styles.dropdownName}>{userName}</p>
              <p className={styles.dropdownSub}>Welcome back!</p>
            </div>
          </div>

          <div className={styles.dropdownDivider}></div>

          <Link to="/mission-control" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>
            <span className={styles.itemIcon}>🛰️</span> Mission Control
          </Link>
          <Link to="/labs" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>
            <span className={styles.itemIcon}>🧪</span> Tool Labs
          </Link>
          <Link to="/settings" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>
            <span className={styles.itemIcon}>⚙️</span> Profile Settings
          </Link>
          <button className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={handleLogoutClick}>
            <span className={styles.itemIcon}>⏻</span> Logout
          </button>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className={styles.logoutModalOverlay} onClick={() => setShowLogoutModal(false)}>
          <div className={styles.logoutModalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Confirm Logout</h3>
            <p className={styles.modalText}>Are you sure you want to log out of your account?</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button className={styles.confirmLogoutBtn} onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;
