import React, { useState, useEffect } from 'react';
import styles from './GoldPriceChecker.module.css';

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'http://' + window.location.hostname + ':5000';

const currencyOptions = [
  { code: 'USD', name: '🇺🇸 US Dollar (USD)' },
  { code: 'EUR', name: '🇪🇺 Euro (EUR)' },
  { code: 'GBP', name: '🇬🇧 British Pound (GBP)' },
  { code: 'INR', name: '🇮🇳 Indian Rupee (INR)' },
  { code: 'JPY', name: '🇯🇵 Japanese Yen (JPY)' },
  { code: 'AUD', name: '🇦🇺 Australian Dollar (AUD)' },
  { code: 'CAD', name: '🇨🇦 Canadian Dollar (CAD)' },
  { code: 'AED', name: '🇦🇪 UAE Dirham (AED)' },
  { code: 'CNY', name: '🇨🇳 Chinese Yuan (CNY)' }
];

const karatOptions = ['24K', '22K', '18K'];

const GoldPriceChecker = () => {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [karat, setKarat] = useState('24k');

  const today = new Date().getDay();
  const isWeekend = today === 0 || today === 6;

  const fetchPrices = async () => {
    if (!isLoading) setIsRefreshing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/gold-prices`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setLastUpdated(new Date(result.timestamp).toLocaleTimeString());
        setError('');
      } else {
        setError('Failed to fetch live prices.');
      }
    } catch (err) {
      setError('Failed to connect to server.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (unit) => {
    if (!data || !data[currency] || !data[currency][karat]) return '---';
    const val = data[currency][karat][unit];
    const symbol = data[currency].symbol;
    return `${symbol}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.headerArea}`}>
        <h3 className={styles.title}>🥇 Live Gold Prices</h3>
        
        <div className={styles.controlsRow}>
          <div className={styles.inputGroup}>
            <label>Currency</label>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)} 
              className={styles.selectInput}
              disabled={isLoading}
            >
              {currencyOptions.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Purity</label>
            <select 
              value={karat} 
              onChange={(e) => setKarat(e.target.value.toLowerCase())} 
              className={styles.selectInput}
              disabled={isLoading}
            >
              {karatOptions.map(k => <option key={k} value={k.toLowerCase()}>{k}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.statusRow}>
          {isLoading ? (
            <span className={styles.loadingText}>Fetching latest rates...</span>
          ) : (
            <>
              <span className={styles.liveDot}></span>
              <span className={styles.updatedText}>Last Updated: {lastUpdated}</span>
            </>
          )}
        </div>
        
        <button className={styles.refreshBtn} onClick={fetchPrices} disabled={isRefreshing}>
          {isRefreshing ? '⏳ Refreshing...' : '🔄 Refresh Prices'}
        </button>
        
        <p className={styles.subtitle}>Prices are live and auto-update every 30 seconds.</p>

        {isWeekend && (
          <div className={styles.marketNotice}>
            <span className={styles.noticeIcon}>ℹ️</span>
            <p className={styles.noticeText}>
              <strong>Market Closed:</strong> Markets are closed over the weekend. Prices resume Monday.
            </p>
          </div>
        )}
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {data && (
        <div className={styles.grid}>
          <div className={`liquid-glass ${styles.card}`}>
            <span className={styles.icon}>🪙</span>
            <h4 className={styles.cardTitle}>1 Gram</h4>
            <p className={styles.priceValue}>{formatPrice('per1g')}</p>
          </div>
          <div className={`liquid-glass ${styles.card}`}>
            <span className={styles.icon}>🥇</span>
            <h4 className={styles.cardTitle}>10 Grams</h4>
            <p className={styles.priceValue}>{formatPrice('per10g')}</p>
          </div>
          <div className={`liquid-glass ${styles.card}`}>
            <span className={styles.icon}>🧈</span>
            <h4 className={styles.cardTitle}>1 Tola (11.66g)</h4>
            <p className={styles.priceValue}>{formatPrice('perTola')}</p>
          </div>
          <div className={`liquid-glass ${styles.card}`}>
            <span className={styles.icon}>🏅</span>
            <h4 className={styles.cardTitle}>1 Kilogram</h4>
            <p className={styles.priceValue}>{formatPrice('per1kg')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoldPriceChecker;
