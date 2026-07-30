import React, { useState, useEffect } from 'react';
import styles from './FuelPriceTracker.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;

const USD_TO_INR = 83.50; // Simulated exchange rate for display

const FuelPriceTracker = () => {
  const [data, setData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchPrices = async () => {
    if (!isLoading) setIsRefreshing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/fuel-prices`);
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

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.headerArea}`}>
        <h3 className={styles.title}>⛽ Live Fuel Prices</h3>
        <div className={styles.statusRow}>
          {isLoading ? (
            <span className={styles.loadingText}>Fetching latest prices...</span>
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
        
        <p className={styles.subtitle}>Prices are simulated and auto-update every 30 seconds.</p>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.countryGrid}>
        {data.map((country, i) => (
          <div key={i} className={`liquid-glass ${styles.countryCard}`}>
            <div className={styles.countryHeader}>
              <span className={styles.flag}>{country.flag}</span>
              <h3 className={styles.countryName}>{country.country}</h3>
            </div>
            <div className={styles.cityList}>
              {country.cities.map((city, j) => (
                <div key={j} className={styles.cityRow}>
                  <span className={styles.cityName}>{city.name}</span>
                  <div className={styles.priceGrid}>
                    <div className={styles.priceBox}>
                      <span className={styles.priceLabel}>Petrol</span>
                      <div className={styles.priceValues}>
                        <span className={styles.priceValue}>${city.petrol.toFixed(2)}</span>
                        <span className={styles.priceValueInr}>₹{(city.petrol * USD_TO_INR).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className={styles.priceBox}>
                      <span className={styles.priceLabel}>Diesel</span>
                      <div className={styles.priceValues}>
                        <span className={styles.priceValue}>${city.diesel.toFixed(2)}</span>
                        <span className={styles.priceValueInr}>₹{(city.diesel * USD_TO_INR).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuelPriceTracker;
