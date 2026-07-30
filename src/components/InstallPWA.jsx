import React, { useState, useEffect } from 'react';
import styles from './InstallPWA.module.css';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Check if running on iOS (which doesn't support beforeinstallprompt)
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIos && !isStandalone) {
      setIsIOS(true); // Show manual instructions for iOS
    }

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 2. Listen for the automatic Android/Desktop prompt
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setSupportsPWA(false);
      setIsIOS(false);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!promptInstall) {
      // Fallback if the prompt isn't ready yet
      alert('To install: Open your browser menu (⋮) and select "Add to Home screen" or "Install App".');
      return;
    }
    promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setPromptInstall(null);
    setSupportsPWA(false);
  };

  // If already installed, show success message
  if (isInstalled) {
    return (
      <div className={styles.installedBox}>
        ✅ <strong>Offline Pack Active!</strong> ToolBox Z is installed and ready for offline use.
      </div>
    );
  }

  // If on iOS, show manual instructions
  if (isIOS) {
    return (
      <div className={styles.iosBox}>
        <h4>📲 Install on iOS</h4>
        <p>To install the Offline Pack:</p>
        <ol>
          <li>Tap the <strong>Share</strong> icon (⎋) in Safari.</li>
          <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
          <li>Tap <strong>Add</strong>.</li>
        </ol>
      </div>
    );
  }

  // For Android/Desktop Chrome/Edge
  return (
    <button className={styles.installBtn} onClick={handleInstallClick}>
      📲 Install Offline Pack
    </button>
  );
};

export default InstallPWA;
