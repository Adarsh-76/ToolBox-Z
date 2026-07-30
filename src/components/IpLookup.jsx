import React, { useState } from 'react';
import styles from './IpLookup.module.css';

const IpLookup = () => {
  const [ip, setIp] = useState('');
  const [ipData, setIpData] = useState(null);
  const [ipLoading, setIpLoading] = useState(false);
  const [ipError, setIpError] = useState('');

  const [dnsDomain, setDnsDomain] = useState('example.com');
  const [dnsType, setDnsType] = useState('A');
  const [dnsData, setDnsData] = useState(null);
  const [dnsLoading, setDnsLoading] = useState(false);
  const [dnsError, setDnsError] = useState('');

  const handleIpLookup = async (e) => {
    e.preventDefault();
    setIpError('');
    setIpData(null);
    setIpLoading(true);

    try {
      const url = ip ? `https://ipwho.is/${ip}` : 'https://ipwho.is/';
      const response = await fetch(url);
      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message || 'Failed to fetch IP data.');
      }
      setIpData(data);
    } catch (err) {
      setIpError(err.message);
    } finally {
      setIpLoading(false);
    }
  };

  const handleDnsLookup = async (e) => {
    e.preventDefault();
    setDnsError('');
    setDnsData(null);
    setDnsLoading(true);

    try {
      const response = await fetch(`https://dns.google/resolve?name=${dnsDomain}&type=${dnsType}`);
      const data = await response.json();

      if (data.Status !== 0) {
        throw new Error('DNS query failed or no records found.');
      }

      const records = data.Answer ? data.Answer.map(record => {
        let type = record.type;
        if (type === 1) type = 'A';
        else if (type === 28) type = 'AAAA';
        else if (type === 15) type = 'MX';
        else if (type === 5) type = 'CNAME';
        else if (type === 16) type = 'TXT';
        else if (type === 2) type = 'NS';
        
        return { type, name: record.name, ttl: record.TTL, data: record.data };
      }) : [];

      if (records.length === 0) {
        throw new Error(`No ${dnsType} records found for ${dnsDomain}.`);
      }

      setDnsData(records);
    } catch (err) {
      setDnsError(err.message);
    } finally {
      setDnsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* IP Lookup Section */}
      <div className={`liquid-glass ${styles.section}`}>
        <h3 className={styles.sectionTitle}>🌐 IP Address Lookup</h3>
        <p className={styles.desc}>Check your IP or lookup details for any public IP address.</p>
        
        <form className={styles.form} onSubmit={handleIpLookup}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Enter IP (or leave blank for yours)..." 
            value={ip} 
            onChange={(e) => setIp(e.target.value)} 
          />
          <button type="submit" className={styles.button} disabled={ipLoading}>
            {ipLoading ? '⏳' : '🔍 Lookup'}
          </button>
        </form>

        {ipError && <div className={styles.errorBox}>{ipError}</div>}

        {ipData && (
          <div className={styles.resultBox}>
            <div className={styles.resultRow}>
              <span className={styles.label}>IP Address</span>
              <span className={styles.value}>{ipData.ip}</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.label}>Location</span>
              <span className={styles.value}>{ipData.city}, {ipData.region}, {ipData.country} {ipData.flag?.emoji || ''}</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.label}>ISP / Org</span>
              <span className={styles.value}>{ipData.connection?.isp || 'Unknown'}</span>
            </div>
          </div>
        )}
      </div>

      {/* DNS Lookup Section */}
      <div className={`liquid-glass ${styles.section}`}>
        <h3 className={styles.sectionTitle}>🛰️ DNS Lookup</h3>
        <p className={styles.desc}>Check domain records (A, AAAA, MX, CNAME, TXT).</p>
        
        <form className={styles.form} onSubmit={handleDnsLookup}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Enter domain..." 
            value={dnsDomain} 
            onChange={(e) => setDnsDomain(e.target.value)} 
          />
          <select 
            value={dnsType} 
            onChange={(e) => setDnsType(e.target.value)} 
            className={styles.select}
          >
            <option value="A">A (IPv4)</option>
            <option value="AAAA">AAAA (IPv6)</option>
            <option value="MX">MX (Mail)</option>
            <option value="CNAME">CNAME</option>
            <option value="TXT">TXT</option>
            <option value="NS">NS</option>
          </select>
          <button type="submit" className={styles.button} disabled={dnsLoading}>
            {dnsLoading ? '⏳' : '🔍 Resolve'}
          </button>
        </form>

        {dnsError && <div className={styles.errorBox}>{dnsError}</div>}

        {dnsData && (
          <div className={styles.dnsTable}>
            <div className={styles.tableHeader}>
              <span>Type</span>
              <span>Name</span>
              <span>Data</span>
              <span>TTL</span>
            </div>
            {dnsData.map((record, i) => (
              <div key={i} className={styles.tableRow}>
                <span className={styles.badge}>{record.type}</span>
                <span className={styles.dnsValue}>{record.name}</span>
                <span className={styles.dnsValue}>{record.data}</span>
                <span className={styles.ttl}>{record.ttl}s</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IpLookup;
