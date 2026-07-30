import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';
import { fireSchoolPride, fireSideCannons } from '../utils/celebrate';
import InstallPWA from '../components/InstallPWA';

// Define badges to check against localStorage
const profileBadges = [
  { id: 'rookie', icon: '👶', name: 'Rookie', requirement: 1 },
  { id: 'explorer', icon: '🥇', name: 'Explorer', requirement: 25 },
  { id: 'pro', icon: '🛠️', name: 'Tool Pro', requirement: 50 },
  { id: 'power', icon: '🚀', name: 'Power User', requirement: 100 },
  { id: 'master', icon: '👑', name: 'Tool Master', requirement: 102 }
];

const Toggle = ({ isOn, onChange }) => (
  <div className={`${styles.toggleSwitch} ${isOn ? styles.toggleOn : ''}`} onClick={() => onChange(!on)}>
    <div className={styles.toggleKnob}></div>
  </div>
);

const Settings = () => {
  const navigate = useNavigate();                                       
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('account');
  const [isDirty, setIsDirty] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Modal & Password Reset States
  const [modal, setModal] = useState(null);
  const [pwStep, setPwStep] = useState(1);
  const [pwData, setPwData] = useState({ code: '', new: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Tool Request State
  const [reqData, setReqData] = useState({ toolName: '', category: 'Image & Design', description: '' });
                                                                        
  const [settings, setSettings] = useState({
    name: '', username: '', email: '', phone: '', bio: '',
    notifPush: true, notifEmail: false, notifTools: true, notifSecurity: true,
    language: 'English (US)', timezone: 'GMT-5 (EST)', timeFormat: '12h'
  });

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;                                     
    let browser = "Unknown Browser";
    let os = "Unknown OS";

    if (ua.includes("Firefox/")) browser = "Firefox";
    else if (ua.includes("Edg/")) browser = "Edge";
    else if (ua.includes("Chrome/")) browser = "Chrome";
    else if (ua.includes("Safari/")) browser = "Safari";

    if (ua.includes("Windows NT")) os = "Windows PC";
    else if (ua.includes("Mac OS")) os = "Macbook";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS Device";

    return `${os} - ${browser}`;
  };

  const calcCompletion = () => {
    const fields = [settings.name, settings.username, settings.email, settings.phone, settings.bio];
    const filled = fields.filter(f => f && f.trim() !== '').length;
    return Math.round((filled / 5) * 100);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setSettings(prev => ({
        ...prev,
        name: parsedUser.name || '',
        username: parsedUser.username || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        bio: parsedUser.bio || ''
      }));
    } else { navigate('/auth'); }
  }, [navigate]);

  const showToastMsg = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    const updatedUser = { ...user, name: settings.name, username: settings.username, phone: settings.phone, bio: settings.bio };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    window.dispatchEvent(new Event('storage'));
    setIsDirty(false);
    showToastMsg('✅ Settings saved successfully!');

    const completion = calcCompletion();
    if (completion === 100) {
      fireSideCannons();
    } else {
      fireSchoolPride();
    }
  };

  // --- Password Reset Logic ---
  const handleSendCode = async (e) => {
    e.preventDefault();
    setPwError('');
    setPwLoading(true);
    try {
      const response = fetch(`${import.meta.env.VITE_API_URL}/api/auth/sendresetcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: settings.email })
      });
      const data = await response.json();
      if (data.success) {
        setPwStep(2);
        showToastMsg('✅ Code sent! (Check terminal if in Dev Mode)');
      } else {
        setPwError(data.error || 'Failed to send code.');
      }
    } catch (err) {
      setPwError('Network error. Is the backend running?');
    }
    setPwLoading(false);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setPwError('');
    if (pwData.new !== pwData.confirm) { setPwError('New passwords do not match.'); return; }
    if (pwData.new.length < 6) { setPwError('Password must be at least 6 characters.'); return; }

    setPwLoading(true);
    try {
      const response = fetch(`${import.meta.env.VITE_API_URL}/api/auth/sendresetcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: settings.email, code: pwData.code, newPassword: pwData.new })
      });
      const data = await response.json();
      if (data.success) {
        setModal(null);
        setPwStep(1);
        setPwData({ code: '', new: '', confirm: '' });
        showToastMsg('✅ Password updated successfully!');
      } else {
        setPwError(data.error || 'Failed to update password.');
      }
    } catch (err) {
      setPwError('Network error. Is the backend running?');
    }                                                                   
    setPwLoading(false);
  };

  const handleDownloadData = () => {
    const dataStr = localStorage.getItem('user') || '{}';
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'toolboxz_my_data.json';
    link.click();
    URL.revokeObjectURL(url);                                           
    setModal(null);
    showToastMsg('✅ Data downloaded!');
  };

  const handleClearHistory = () => {
    localStorage.removeItem('recentSearches');
    showToastMsg('✅ Search history cleared!');
  };

  const handleClearRecent = () => {
    localStorage.removeItem('recentTools');
    showToastMsg('✅ Recently used tools cleared!');
  };

  // --- Delete Account Logic ---
  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/sendresetcode`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        localStorage.clear();
        navigate('/auth');
      } else {
        showToastMsg('❌ Failed to delete account.');
        setDeleteLoading(false);
      }
    } catch (err) {
      showToastMsg('❌ Network error.');
      setDeleteLoading(false);
    }
  };

  // --- Tool Request Logic ---
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setPwLoading(true); 
    setPwError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/sendresetcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(reqData)
      });
      const data = await response.json();
      if (data.success) {
        setModal(null);
        setReqData({ toolName: '', category: 'Image & Design', description: '' });
        showToastMsg('✅ Tool request submitted! We will review it shortly.');
      } else {
        setPwError(data.error || 'Failed to submit request.');
      }
    } catch (err) {
      setPwError('Network error. Is the backend running?');
    }
    setPwLoading(false);
  };

  const goToContact = () => navigate('/contact');

  const tabs = [
    { id: 'account', icon: '👤', label: 'Account' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'privacy', icon: '🔒', label: 'Privacy & Security' },
    { id: 'favorites', icon: '❤️', label: 'Favorites' },
    { id: 'language', icon: '🌍', label: 'Language & Region' },
    { id: 'support', icon: '📞', label: 'Support' },
    { id: 'about', icon: 'ℹ️', label: 'About' },
  ];

  const renderModal = () => {
    if (!modal) return null;
    return (                                                            
      <div className={styles.modalOverlay} onClick={() => setModal(null)}>                                                                      
        <div className={`liquid-glass ${styles.modalContent}`} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modalCloseBtn} onClick={() => { setModal(null); setPwStep(1); setPwError(''); }}>✖️</button>
                                                                        
          {modal === 'password' && (
            <div>                                                       
              <h3 className={styles.modalTitle}>🔑 Change Password</h3>
              {pwError && <div className={styles.errorBox}>{pwError}</div>}

              {pwStep === 1 ? (
                <form onSubmit={handleSendCode}>
                  <p className={styles.modalDesc}>A 6-digit verification code will be sent to:</p>
                  <div className={styles.inputGroup}>
                    <label>Email Address</label>
                    <input type="email" value={settings.email} readOnly className={`${styles.input} ${styles.readOnly}`} />
                  </div>
                  <button type="submit" className={styles.modalSubmitBtn} disabled={pwLoading}>
                    {pwLoading ? '⏳ Sending...' : 'Send Verification Code'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode}>
                  <p className={styles.modalDesc}>Enter the 6-digit code from your email and your new password.</p>
                  <div className={styles.inputGroup}>
                    <label>Verification Code</label>
                    <input type="text" required maxLength="6" value={pwData.code} onChange={(e) => setPwData({...pwData, code: e.target.value})} className={styles.input} placeholder="123456" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>New Password</label>
                    <input type="password" required value={pwData.new} onChange={(e) => setPwData({...pwData, new: e.target.value})} className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Confirm New Password</label>
                    <input type="password" required value={pwData.confirm} onChange={(e) => setPwData({...pwData, confirm: e.target.value})} className={styles.input} />
                  </div>
                  <button type="submit" className={styles.modalSubmitBtn} disabled={pwLoading}>
                    {pwLoading ? '⏳ Updating...' : 'Update Password'}
                  </button>
                </form>
              )}                                                        
            </div>
          )}

          {modal === '2fa' && (
            <div>
              <h3 className={styles.modalTitle}>📱 Two-Factor Authentication (2FA)</h3>
              <p className={styles.modalDesc}>Add an extra layer of security. You'll need a code from your authenticator app to log in.</p>
              <div className={styles.settingRow} style={{border:'none'}}>
                <div><strong>Enable 2FA</strong><p>Scan QR code in Google Authenticator</p></div>
                <Toggle isOn={twoFA} onChange={setTwoFA} />
              </div>
              {twoFA && (
                <div className={styles.qrPlaceholder}>
                  <div className={styles.qrBox}>QR</div>
                  <p>Scan this code with your authenticator app.</p>
                  <input type="text" placeholder="Enter 6-digit code" className={styles.input} />
                  <button className={styles.modalSubmitBtn} onClick={() => { setModal(null); showToastMsg('✅ 2FA Enabled!'); }}>Verify & Enable</button>
                </div>
              )}
            </div>
          )}

          {modal === 'devices' && (
            <div>
              <h3 className={styles.modalTitle}>💻 Active Devices</h3>
              <p className={styles.modalDesc}>Devices currently logged into your account.</p>
              <div className={styles.deviceList}>
                <div className={styles.deviceItem}>
                  <span>💻 {getDeviceInfo()}</span> <span className={styles.activeDot}>Active Now</span>
                </div>
                <div className={styles.deviceItem}>
                  <span>📱 iPhone 13 - Safari</span> <button className={styles.smallBtn} onClick={() => showToastMsg('✅ Device signed out.')}>Sign Out</button>
                </div>
                <div className={styles.deviceItem}>
                  <span>💻 Macbook Pro - Firefox</span> <button className={styles.smallBtn} onClick={() => showToastMsg('✅ Device signed out.')}>Sign Out</button>
                </div>
              </div>
            </div>
          )}

          {modal === 'accounts' && (
            <div>
              <h3 className={styles.modalTitle}>🔗 Connected Accounts</h3>
              <p className={styles.modalDesc}>Manage your social logins.</p>
              <div className={styles.socialList}>
                <div className={styles.socialItem}><span>🔵 Google</span> <button className={styles.connectedBtn}>Connected</button></div>
                <div className={styles.socialItem}><span>⚫ GitHub</span> <button className={styles.connectBtn} onClick={() => showToastMsg('✅ GitHub connected!')}>Connect</button></div>
                <div className={styles.socialItem}><span>🔵 Facebook</span> <button className={styles.connectBtn} onClick={() => showToastMsg(' ✅ Facebook connected!')}>Connect</button></div>
              </div>
            </div>
          )}

          {modal === 'data' && (
            <div>
              <h3 className={styles.modalTitle}>📥 Download My Data</h3>
              <p className={styles.modalDesc}>Export a copy of your ToolBox Z account data.</p>
              <button className={styles.modalSubmitBtn} onClick={handleDownloadData}>⬇️ Download JSON File</button>
            </div>
          )}

          {modal === 'delete' && (
            <div>
              <h3 className={styles.modalTitle} style={{color: '#ff4d4d'}}>🗑️ Delete Account</h3>
              <p className={styles.modalDesc}>This action is permanent and cannot be undone. All your saved tools, history, and account data will be permanently erased.</p>
              <div className={styles.dangerZone} style={{marginTop: '1rem', borderTop: 'none'}}>
                <button className={styles.dangerBtn} onClick={handleDeleteAccount} disabled={deleteLoading}>
                  {deleteLoading ? '⏳ Deleting...' : 'Yes, delete my account permanently'}
                </button>
                <button className={styles.modalSubmitBtn} style={{background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-dark)', marginTop: '1rem'}} onClick={() => setModal(null)} disabled={deleteLoading}>Cancel</button>
              </div>
            </div>
          )}

          {modal === 'rate' && (
            <div>
              <h3 className={styles.modalTitle}>⭐ Rate ToolBox Z</h3>
              <p className={styles.modalDesc}>How would you rate your experience using ToolBox Z?</p>

              <div className={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={styles.star}
                    style={{ color: star <= (hoverRating || rating) ? "#FFD700" : "#444" }}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <button
                className={styles.modalSubmitBtn}
                disabled={rating === 0}
                onClick={() => {
                  setModal(null);
                  showToastMsg(`⭐ Thank you for rating us ${rating} stars!`);
                  setRating(0);
                  setHoverRating(0);
                }}
              >
                Submit Rating
              </button>
            </div>
          )}

          {modal === 'request' && (
            <form onSubmit={handleRequestSubmit}>
              <h3 className={styles.modalTitle}>✨ Request a Tool</h3>
              <p className={styles.modalDesc}>Missing a tool? Let us know what you need!</p>
              {pwError && <div className={styles.errorBox}>{pwError}</div>}
              <div className={styles.inputGroup}>
                <label>Tool Name</label>
                <input
                  type="text"
                  required
                  value={reqData.toolName}
                  onChange={(e) => setReqData({...reqData, toolName: e.target.value})}
                  className={styles.input}
                  placeholder="e.g., PDF Merger"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Category</label>
                <select
                  className={styles.select}
                  value={reqData.category}
                  onChange={(e) => setReqData({...reqData, category: e.target.value})}
                >
                  <option>Image & Design</option>
                  <option>Text Tools</option>
                  <option>Developer Tools</option>
                  <option>Social Media Tools</option>
                  <option>Math & Calculators</option>
                  <option>PDF Tools</option>
                  <option>Security & Encryption</option>
                  <option>Generators</option>
                  <option>Productivity</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Description</label>
                <textarea
                  required
                  value={reqData.description}
                  onChange={(e) => setReqData({...reqData, description: e.target.value})}
                  className={styles.textarea}
                  placeholder="Describe what the tool should do..."
                ></textarea>
              </div>
              <button type="submit" className={styles.modalSubmitBtn} disabled={pwLoading}>
                {pwLoading ? '⏳ Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  };

  const completion = calcCompletion();
  const circleCircumference = 283;
  const strokeOffset = circleCircumference - (circleCircumference * (completion / 100));

  // Get dynamically unlocked badges for the showcase
  const uniqueUsedIds = JSON.parse(localStorage.getItem('uniqueToolsUsed') || '[]');
  const usedCount = uniqueUsedIds.length;
  const unlockedBadges = profileBadges.filter(b => usedCount >= b.requirement);

  const renderTab = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.tabTitle}>Account Settings</h2>
            <div className={styles.profileHeader}>
              <div className={styles.completionRing}>
                <svg width="100" height="100">
                  <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                  <circle 
                    cx="50" cy="50" r="45" 
                    stroke="var(--accent-color)" strokeWidth="8" fill="none" 
                    strokeDasharray={circleCircumference} 
                    strokeDashoffset={strokeOffset} 
                    strokeLinecap="round" 
                    transform="rotate(-90 50 50)" 
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <div className={styles.profileAvatarLarge}>{settings.name.charAt(0) || 'U'}</div>
              </div>
              <div className={styles.profileMeta}>
                <h3>{settings.name || 'User'}</h3>
                <p>Profile Completion: <span className={styles.highlight}>{completion}%</span></p>
                
                {/* --- DYNAMIC ACHIEVEMENT SHOWCASE --- */}
                <div className={styles.badgesRow}>
                  {unlockedBadges.length > 0 ? (
                    unlockedBadges.map(badge => (
                      <span key={badge.id} className={styles.badge}>{badge.icon} {badge.name}</span>
                    ))
                  ) : (
                    <span className={styles.badge} style={{opacity: 0.5, borderStyle: 'dashed'}}>
                      🔒 Explore tools to unlock badges!
                    </span>
                  )}
                </div>
                
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Display Name</label>
                <input type="text" value={settings.name} onChange={(e) => handleChange('name', e.target.value)} className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Username</label>
                <input type="text" value={settings.username} readOnly className={`${styles.input} ${styles.readOnly}`} />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" value={settings.email} readOnly className={`${styles.input} ${styles.readOnly}`} />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number (Optional)</label>
                <input type="tel" value={settings.phone} onChange={(e) => handleChange('phone', e.target.value)} className={styles.input} />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Bio</label>
              <textarea value={settings.bio} onChange={(e) => handleChange('bio', e.target.value)} placeholder='Tell us about yourself...' className={styles.textarea}></textarea>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.tabTitle}>Notifications</h2>
            <div className={styles.settingRow}><div><strong>Push Notifications</strong><p>Get alerts on your device.</p></div><Toggle isOn={settings.notifPush} onChange={(val) => handleChange('notifPush', val)} /></div>
            <div className={styles.settingRow}><div><strong>Email Notifications</strong><p>Receive updates via email.</p></div><Toggle isOn={settings.notifEmail} onChange={(val) => handleChange('notifEmail', val)} /></div>
            <div className={styles.settingRow}><div><strong>New Tool Alerts</strong><p>Notify me when a new tool is added.</p></div><Toggle isOn={settings.notifTools} onChange={(val) => handleChange('notifTools', val)} /></div>
            <div className={styles.settingRow}><div><strong>Security Alerts</strong><p>Important account security warnings.</p></div><Toggle isOn={settings.notifSecurity} onChange={(val) => handleChange('notifSecurity', val)} /></div>
          </div>
        );

      case 'privacy':
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.tabTitle}>Privacy & Security</h2>
            <button className={styles.listBtn} onClick={() => { setModal('password'); setPwStep(1); }}>🔑 Change Password</button>
            <button className={styles.listBtn} onClick={() => setModal('2fa')}>📱 Two-Factor Authentication (2FA)</button>
            <button className={styles.listBtn} onClick={() => setModal('devices')}>💻 Active Devices</button>
            <button className={styles.listBtn} onClick={() => setModal('accounts')}>🔗 Connected Accounts</button>
            <button className={styles.listBtn} onClick={() => setModal('data')}>📥 Download My Data</button>
            <div className={styles.dangerZone}>
              <button className={styles.dangerBtn} onClick={() => setModal('delete')}>🗑️ Delete Account</button>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.tabTitle}>Favorites & History</h2>
            <div className={styles.statsGrid}>
              <div className={`liquid-glass ${styles.statBox}`}><h3>12</h3><p>Favorite Tools</p></div>
              <div className={`liquid-glass ${styles.statBox}`}><h3>34</h3><p>Recently Used</p></div>
              <div className={`liquid-glass ${styles.statBox}`}><h3>2</h3><p>Saved Collections</p></div>
            </div>
            <button className={styles.listBtn} onClick={handleClearHistory}>🧹 Clear Search History</button>
            <button className={styles.listBtn} onClick={handleClearRecent}>🗑️ Clear Recently Used</button>
          </div>
        );

      case 'language':
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.tabTitle}>Language & Region</h2>
            <div className={styles.inputGroup}>
              <label>Language</label>
              <select className={styles.select} onChange={(e) => handleChange('language', e.target.value)}>
                <option>English (US)</option><option>Spanish</option><option>French</option><option>German</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Time Zone</label>
              <select className={styles.select} onChange={(e) => handleChange('timezone', e.target.value)}>
                <option>GMT-5 (EST)</option><option>GMT-0 (UTC)</option><option>GMT+1 (CET)</option>
              </select>
            </div>
            <div className={styles.settingRow}>
              <div><strong>Time Format</strong><p>Choose between 12-hour and 24-hour clock.</p></div>
              <div className={styles.segmentedControl}>
                {['12h', '24h'].map(opt => (
                  <button key={opt} className={`${styles.segBtn} ${settings.timeFormat === opt ? styles.segActive : ''}`} onClick={() => handleChange('timeFormat', opt)}>{opt}</button>                                
                ))}
              </div>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.tabTitle}>Support</h2>
            <InstallPWA />
	    <button className={styles.listBtn} onClick={goToContact}>❓ Help Center</button>
            <button className={styles.listBtn} onClick={goToContact}>🐞 Report a Bug</button>
            <button className={styles.listBtn} onClick={() => setModal('request')}>✨ Request a Tool</button>
            <button className={styles.listBtn} onClick={goToContact}>📞 Contact Support</button>                                                
            <button className={styles.listBtn} onClick={() => setModal('rate')}>⭐ Rate the App</button>
          </div>
        );

      case 'about':
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.tabTitle}>About ToolBox Z</h2>        
            <div className={styles.aboutInfo}>
              <p><strong>App Version:</strong> 1.0.0</p>
              <p><strong>Latest Update:</strong> Added Settings UI, 3D Auth, and Collections.</p>
              <button className={styles.listBtn} onClick={() => showToastMsg('📜 Opening Privacy Policy...')}>📜 Privacy Policy</button>
              <button className={styles.listBtn} onClick={() => showToastMsg('📄 Opening Terms of Service...')}>📄 Terms of Service</button>
              <button className={styles.listBtn} onClick={() => showToastMsg('⚖️ Opening Licenses...')}>⚖️ Licenses</button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  if (!user) return null;

  return (
    <div className={styles.settingsPage}>
      <h1 className={styles.pageHeader}>Profile Settings</h1>

      <div className={styles.layoutGrid}>
        <aside className={styles.sidebar}>                              
          {tabs.map(tab => (
            <button                                                     
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </aside>

        <main className={`liquid-glass ${styles.mainContent}`}>
          {renderTab()}
        </main>
      </div>

      {isDirty && (
        <div className={styles.floatingSave}>
          <button className={styles.saveBtn} onClick={handleSave}>💾 Save Changes</button>
        </div>
      )}

      {showToast && (
        <div className={styles.toast}>{showToast}</div>
      )}

      {renderModal()}
    </div>
  );
};

export default Settings;
