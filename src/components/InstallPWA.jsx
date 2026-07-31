import React, { useState, useEffect } from 'react';
import styles from './InstallPWA.module.css';

// Global variable to catch the prompt the millisecond the page loads,
// even before React fully mounts!
let globalDeferredPrompt = null;

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIos && !isStandalone) {
      setIsIOS(true); // Show manual instructions for iOS
    }

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // If we already caught the prompt globally, enable the button
    if (globalDeferredPrompt) {
      setSupportsPWA(true);
    }

    const handler = (e) => {
      e.preventDefault();
      globalDeferredPrompt = e; // Save it to our global variable
      setSupportsPWA(true);     // Enable the button
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setSupportsPWA(false);
      setIsIOS(false);
      globalDeferredPrompt = null;
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!globalDeferredPrompt) {
      // Fallback if browser still refuses to show the prompt
      alert('To install: Open your browser menu (⋮) and select "Install App" or "Add to Home screen".');
      return;
    }
    
    // Trigger the native Android/Chrome install popup
    globalDeferredPrompt.prompt();
    const { outcome } = await globalDeferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    globalDeferredPrompt = null;
    setSupportsPWA(false);
  };

  if (isInstalled) {
    return (
      <div className={styles.installedBox}>
        ✅ <strong>Offline Pack Active!</strong> ToolBox Z is installed and ready for offline use.
      </div>
    );
  }

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
