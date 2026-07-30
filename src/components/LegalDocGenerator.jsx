import React, { useState, useMemo } from 'react';
import styles from './LegalDocGenerator.module.css';

const LegalDocGenerator = () => {
  const [docType, setDocType] = useState('privacy');
  const [data, setData] = useState({
    company: 'Your Company Name',
    website: 'https://yourwebsite.com',
    email: 'contact@yourwebsite.com',
    country: 'United States',
    usesCookies: true,
    usesAnalytics: true,
    usesAds: false,
  });

  const [copied, setCopied] = useState(false);

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const generatedDoc = useMemo(() => {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    if (docType === 'privacy') {
      return `PRIVACY POLICY

Last updated: ${date}

This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.

1. Interpretation and Definitions
1.1. "Company" (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to ${data.company}.
1.2. "Service" refers to the Website (${data.website}).
1.3. "You" means the individual accessing or using the Service.

2. Collecting and Using Your Personal Data
2.1. Log Files: We use log files to collect information automatically when You visit our Service.
 ${data.usesCookies ? `2.2. Cookies: We use Cookies to provide a better user experience. You can choose to disable Cookies through your browser settings.` : `2.2. Cookies: We do not use cookies on our Service.`}
 ${data.usesAnalytics ? `2.3. Analytics: We may use Third-Party Services (like Google Analytics) to monitor and analyze the use of our Service.` : `2.3. Analytics: We do not use third-party analytics services.`}
 ${data.usesAds ? `2.4. Advertising: We may use Third-Party advertising services (like Google AdSense) to serve ads on our Service.` : `2.4. Advertising: We do not serve third-party advertising.`}

3. Contact Us
If you have any questions about this Privacy Policy, You can contact us:
By email: ${data.email}
Company located in: ${data.country}

*Note: This is a generated template. Please review with a legal professional to ensure compliance with local laws.*`;
    } else if (docType === 'terms') {
      return `TERMS AND CONDITIONS

Last updated: ${date}

Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the ${data.website} website (the "Service") operated by ${data.company} ("Us", "We", or "Our").

1. Acceptance of Terms
By accessing or using the Service, You agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.

2. Intellectual Property
The Service and its original content, features, and functionality are the exclusive property of ${data.company} and its licensors.

3. Termination
We may terminate or suspend Your access immediately, without prior notice or liability, if You breach these Terms.

4. Limitation of Liability
To the maximum extent permitted by applicable law, in no event shall ${data.company} be liable for any special, incidental, indirect, or consequential damages whatsoever.

5. Governing Law
The laws of ${data.country}, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.

6. Contact Us
If you have any questions about these Terms, please contact us:
By email: ${data.email}

*Note: This is a generated template. Please review with a legal professional to ensure compliance with local laws.*`;
    } else if (docType === 'cookie') {
      return `COOKIE POLICY

Last updated: ${date}

This Cookie Policy explains how ${data.company} ("We", "Us") uses cookies and similar technologies on ${data.website} (the "Service").

1. What are Cookies?
Cookies are small text files stored on your device when you visit a website.

2. How We Use Cookies
We use cookies for the following purposes:
- Essential Cookies: Required for the website to function correctly.
 ${data.usesAnalytics ? '- Analytics Cookies: To understand how visitors interact with the website and improve user experience.\n' : ''}${data.usesAds ? '- Advertising Cookies: To display relevant and personalized ads to you.\n' : ''}3. Managing Cookies
You can control or delete cookies through your browser settings. Disabling cookies may affect the functionality of the Service.

4. Contact Us
If you have any questions about our Cookie Policy, please contact us at ${data.email}.

*Note: This is a generated template. Please review with a legal professional to ensure compliance with local laws.*`;
    } else if (docType === 'disclaimer') {
      return `DISCLAIMER

Last updated: ${date}

The information provided by ${data.company} on ${data.website} is for general informational purposes only. All information is provided in good faith, however, we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the Service.

1. No Professional Advice
The Service does not contain professional advice. You should consult a professional where appropriate.

2. External Links Disclaimer
The Service may contain links to other websites or content belonging to or originating from third parties. We do not warrant, endorse, or assume responsibility for the accuracy or reliability of any information offered by third-party websites.

3. Limitation of Liability
Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided.

4. Contact Us
For questions about this Disclaimer, please contact us at ${data.email}.

*Note: This is a generated template. Please review with a legal professional to ensure compliance with local laws.*`;
    } else if (docType === 'refund') {
      return `REFUND POLICY

Last updated: ${date}

This Refund Policy applies to purchases and subscriptions made on ${data.website} operated by ${data.company}.

1. Digital Products
Due to the nature of digital products and services, all sales are generally final and non-refundable once the product has been accessed or downloaded.

2. Subscription Cancellations
You can cancel your subscription at any time. Cancellations will take effect at the end of the current billing cycle. We do not provide refunds for the unused portion of a subscription period.

3. Exceptions
If you believe you have been charged in error or have experienced a severe technical issue preventing the use of the Service, please contact us within 7 days of the charge.

4. Contact Us
For refund requests or questions, please contact us at ${data.email}.

*Note: This is a generated template. Please review with a legal professional to ensure compliance with local laws.*`;
    } else if (docType === 'eula') {
      return `END USER LICENSE AGREEMENT (EULA)

Last updated: ${date}

This End User License Agreement ("EULA") is a legal agreement between you and ${data.company} ("We", "Us") for the use of the software or service provided at ${data.website}.

1. License Grant
We grant you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the Service for your personal or internal business use.

2. Restrictions
You agree not to, and you will not permit others to:
- License, sell, rent, lease, assign, distribute, transmit, host, outsource, or otherwise commercially exploit the Service;
- Modify, make derivative works of, disassemble, decompile, or reverse engineer any part of the Service;
- Use the Service for any illegal purpose.

3. Termination
We may terminate or suspend your access to the Service immediately, without prior notice or liability, if you breach any of the terms or conditions of this EULA.

4. Governing Law
This EULA shall be governed by and construed in accordance with the laws of ${data.country}.

5. Contact Us
If you have any questions about this EULA, please contact us at ${data.email}.

*Note: This is a generated template. Please review with a legal professional to ensure compliance with local laws.*`;
    }
  }, [docType, data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedDoc], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = docType === 'privacy' ? 'Privacy-Policy' : 
                     docType === 'terms' ? 'Terms-and-Conditions' : 
                     docType === 'cookie' ? 'Cookie-Policy' : 
                     docType === 'disclaimer' ? 'Disclaimer' : 
                     docType === 'refund' ? 'Refund-Policy' : 'EULA';
    link.download = `${fileName}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setData({
      company: '',
      website: '',
      email: '',
      country: '',
      usesCookies: false,
      usesAnalytics: false,
      usesAds: false,
    });
  };

  const docOptions = [
    { value: 'privacy', label: 'Privacy Policy' },
    { value: 'terms', label: 'Terms & Conditions' },
    { value: 'cookie', label: 'Cookie Policy' },
    { value: 'disclaimer', label: 'Disclaimer' },
    { value: 'refund', label: 'Refund Policy' },
    { value: 'eula', label: 'EULA' }
  ];

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.inputGroup}>
          <label>Document Type</label>
          <select value={docType} onChange={(e) => setDocType(e.target.value)} className={styles.select}>
            {docOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label>Company / Name</label>
            <input type="text" value={data.company} onChange={(e) => handleChange('company', e.target.value)} className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label>Website URL</label>
            <input type="text" value={data.website} onChange={(e) => handleChange('website', e.target.value)} className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label>Contact Email</label>
            <input type="email" value={data.email} onChange={(e) => handleChange('email', e.target.value)} className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label>Country / State</label>
            <input type="text" value={data.country} onChange={(e) => handleChange('country', e.target.value)} className={styles.input} />
          </div>
        </div>

        <div className={styles.checkboxRow}>
          <label><input type="checkbox" checked={data.usesCookies} onChange={(e) => handleChange('usesCookies', e.target.checked)} /> Uses Cookies</label>
          <label><input type="checkbox" checked={data.usesAnalytics} onChange={(e) => handleChange('usesAnalytics', e.target.checked)} /> Uses Analytics (Google)</label>
          <label><input type="checkbox" checked={data.usesAds} onChange={(e) => handleChange('usesAds', e.target.checked)} /> Uses Ads (AdSense)</label>
        </div>
        <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear Form</button>
      </div>

      <div className={`liquid-glass ${styles.outputArea}`}>
        <div className={styles.outputHeader}>
          <h3>{docOptions.find(opt => opt.value === docType).label}</h3>
          <div className={styles.btnGroup}>
            <button className={styles.copyBtn} onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy'}</button>
            <button className={styles.downloadBtn} onClick={handleDownload}>⬇️ Download</button>
          </div>
        </div>
        <pre className={styles.codeBlock}>{generatedDoc}</pre>
      </div>
    </div>
  );
};

export default LegalDocGenerator;
