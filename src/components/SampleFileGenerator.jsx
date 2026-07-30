import React, { useState } from 'react';
import styles from './SampleFileGenerator.module.css';

const SampleFileGenerator = () => {
  const [generating, setGenerating] = useState('');
  const [error, setError] = useState('');

  const triggerDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    setGenerating('');
  };

  const handleGenerate = (type) => {
    setError('');
    setGenerating(type);

    try {
      if (type === 'json') {
        const dummyData = Array.from({ length: 1000 }, (_, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          isActive: Math.random() > 0.5,
          balance: (Math.random() * 5000).toFixed(2)
        }));
        const blob = new Blob([JSON.stringify(dummyData, null, 2)], { type: 'application/json' });
        triggerDownload(blob, 'sample-1000-users.json');
      } 
      else if (type === 'csv') {
        let csv = 'ID,Name,Email,Active,Balance\n';
        for (let i = 1; i <= 1000; i++) {
          csv += `${i},User ${i},user${i}@example.com,${Math.random() > 0.5 ? 'Yes' : 'No'},${(Math.random() * 5000).toFixed(2)}\n`;
        }
        const blob = new Blob([csv], { type: 'text/csv' });
        triggerDownload(blob, 'sample-1000-rows.csv');
      } 
      else if (type === 'image') {
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');
        
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, 1920, 1080);
        gradient.addColorStop(0, '#1B3C53');
        gradient.addColorStop(1, '#456A88');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1920, 1080);
        
        // Draw dummy shapes and text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 80px Arial';
        ctx.fillText('Sample HD Image', 100, 150);
        ctx.font = '40px Arial';
        ctx.fillText('1920x1080 - Perfect for testing compressors', 100, 220);
        
        for(let i = 0; i < 50; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * 1920, Math.random() * 1080, Math.random() * 100, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 171, ${Math.random() * 0.5})`;
          ctx.fill();
        }

        canvas.toBlob(blob => triggerDownload(blob, 'sample-hd-image.png'), 'image/png');
      } 
      else if (type === 'pdf') {
        // Generate a simple multi-page text PDF manually (No library needed)
        let pdfContent = "%PDF-1.4\n";
        const lines = [];
        let objNum = 1;
        let xref = [];

        const addObj = (content) => {
          xref.push(pdfContent.length);
          lines.push(`${objNum} 0 obj\n${content}\nendobj\n`);
          objNum++;
        };

        addObj("<< /Type /Catalog /Pages 2 0 R >>");
        addObj("<< /Type /Pages /Count 1 /Kids [3 0 R] >>");
        addObj("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>");
        
        let textStream = "BT /F1 24 Tf 50 700 Td (ToolBox Z - Sample PDF Document) Tj ET\n";
        textStream += "BT /F1 14 Tf 50 670 Td (This is a generated dummy PDF file.) Tj ET\n";
        for(let i=0; i<40; i++) {
          textStream += `BT /F1 12 Tf 50 ${650 - (i*15)} Td (Line ${i+1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.) Tj ET\n`;
        }
        
        addObj(`<< /Length ${textStream.length} >>\nstream\n${textStream}\nendstream`);
        addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

        pdfContent += lines.join('');
        xref.push(pdfContent.length);
        pdfContent += `trailer\n<< /Size ${objNum} /Root 1 0 R >>\nstartxref\n${xref[0]}\n%%EOF`;

        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        triggerDownload(blob, 'sample-document.pdf');
      }
      else if (type === 'text') {
        let text = "ToolBox Z - Sample Text File\n\n";
        for(let i=0; i<500; i++) {
          text += `Line ${i+1}: This is a sample line of text used for testing word counters, diff checkers, and other text tools. The quick brown fox jumps over the lazy dog.\n`;
        }
        const blob = new Blob([text], { type: 'text/plain' });
        triggerDownload(blob, 'sample-text.txt');
      }
    } catch (err) {
      setError('Failed to generate file: ' + err.message);
      setGenerating('');
    }
  };

  const files = [
    { id: 'json', icon: '📊', title: 'JSON Data', desc: '1,000 user records in JSON format (ID, Name, Email, Balance).', size: '~45 KB' },
    { id: 'csv', icon: '📈', title: 'CSV Spreadsheet', desc: '1,000 rows of tabular data for Excel/import testing.', size: '~35 KB' },
    { id: 'image', icon: '🖼️', title: 'HD Image (PNG)', desc: '1920x1080 HD image with graphics. Perfect for compressors.', size: '~2.5 MB' },
    { id: 'pdf', icon: '📄', title: 'PDF Document', desc: 'A multi-page PDF with text. Great for merging or splitting tests.', size: '~15 KB' },
    { id: 'text', icon: '📝', title: 'Text File (.txt)', desc: '500 lines of plain text for word counters or diff checkers.', size: '~40 KB' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.infoBanner}>
        💡 <strong>How it works:</strong> Click any button below to instantly download a safe, dummy file. Then, go to any ToolBox Z tool (like Image Compressor or PDF Merger) and upload this dummy file to see how it works without risking your own data!
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.grid}>
        {files.map((file) => (
          <div key={file.id} className={`liquid-glass ${styles.card}`}>
            <span className={styles.cardIcon}>{file.icon}</span>
            <h3 className={styles.cardTitle}>{file.title}</h3>
            <p className={styles.cardDesc}>{file.desc}</p>
            <span className={styles.sizeTag}>Size: {file.size}</span>
            <button 
              className={styles.generateBtn} 
              onClick={() => handleGenerate(file.id)}
              disabled={generating !== ''}
            >
              {generating === file.id ? '⏳ Generating...' : `⬇️ Download ${file.title}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleFileGenerator;
