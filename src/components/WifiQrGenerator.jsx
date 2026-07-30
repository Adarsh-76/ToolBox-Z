import React, { useState, useMemo } from 'react';
import styles from './WifiQrGenerator.module.css';

const WifiQrGenerator = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  // Format the string according to Wi-Fi QR standards: WIFI:T:WPA;S:mynetwork;P:mypass;H:true;;
  const qrString = useMemo(() => {
    const escapeStr = (str) => str.replace(/([\\;,:"])/g, '\\$1');
    const s = escapeStr(ssid);
    const p = escapeStr(password);
    return `WIFI:T:${encryption};S:${s};P:${p};${hidden ? 'H:true' : ''};;`;
  }, [ssid, password, encryption, hidden]);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}`;

  const handleDownload = () => {
    fetch(qrImageUrl)
      .then(res => res.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `wifi-${ssid || 'network'}.png`;
        link.click();
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setSsid('');
    setPassword('');
    setEncryption('WPA');
    setHidden(false);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.inputGroup}>
          <label>Network Name (SSID)</label>
          <input type="text" value={ssid} onChange={(e) => setSsid(e.target.value)} className={styles.input} placeholder="e.g., MyHomeWifi" />
        </div>
        
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Encryption</label>
            <select className={styles.select} value={encryption} onChange={(e) => setEncryption(e.target.value)}>
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder="Password" disabled={encryption === 'nopass'} />
          </div>
        </div>

        <div className={styles.checkboxRow}>
          <input type="checkbox" id="hiddenNetwork" checked={hidden} onChange={(e) => setHidden(e.target.checked)} />
          <label htmlFor="hiddenNetwork">Hidden Network</label>
        </div>

        <div className={styles.buttonRow}>
          <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear</button>
        </div>
      </div>

      {ssid && (
        <div className={`liquid-glass ${styles.qrResult}`}>
          <h3>Scan to Connect</h3>
          <div className={styles.qrWrapper}>
            <img src={qrImageUrl} alt="Wi-Fi QR Code" className={styles.qrImage} />
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.downloadBtn} onClick={handleDownload}>⬇️ Download PNG</button>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? '✅ Copied!' : '📋 Copy String'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WifiQrGenerator;
