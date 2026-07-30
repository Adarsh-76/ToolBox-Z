import React, { useState, useEffect, useRef } from 'react';
import styles from './TextToHandwriting.module.css';

const TextToHandwriting = () => {
  const [text, setText] = useState('Hello! This is my handwriting.\nType anything here to see the magic.');
  const [font, setFont] = useState('Caveat');
  const [color, setColor] = useState('#1a4b8c'); // Pen ink blue
  const [size, setSize] = useState(28);
  const [paperColor, setPaperColor] = useState('#ffffff');
  const canvasRef = useRef(null);

  const fonts = [
    { name: 'Caveat', label: 'Neat Cursive' },
    { name: 'Homemade Apple', label: 'Messy Natural' },
    { name: 'Liu Jian Mao Cao', label: 'Sharp & artsy' }
  ];

  // Draw text on canvas whenever settings change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set canvas size (A4 aspect ratio roughly)
    canvas.width = 800;
    canvas.height = 1100;

    // Fill background
    ctx.fillStyle = paperColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ruled lines (margin + horizontal)
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let y = 80; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(canvas.width - 40, y);
      ctx.stroke();
    }
    // Red margin line
    ctx.strokeStyle = '#ff4d4d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 0);
    ctx.lineTo(80, canvas.height);
    ctx.stroke();

    // Set text styles
    ctx.fillStyle = color;
    ctx.font = `${size}px ${font}, cursive`;
    ctx.textBaseline = 'alphabetic';

    // Wrap text manually to fit the page width
    const lines = text.split('\n');
    let y = 70;
    const maxWidth = canvas.width - 120;
    const lineHeight = size + 12;

    lines.forEach((line) => {
      let words = line.split(' ');
      let currentLine = '';

      for (let n = 0; n < words.length; n++) {
        let testLine = currentLine + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(currentLine, 100, y);
          currentLine = words[n] + ' ';
          y += lineHeight;
        } else {
          currentLine = testLine;
        }
      }
      ctx.fillText(currentLine, 100, y);
      y += lineHeight;
    });
  }, [text, font, color, size, paperColor]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'my-handwriting.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.controlsArea}`}>
        <div className={styles.inputGroup}>
          <label>Text</label>
          <textarea 
            className={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Type your text here..."
          />
        </div>

        <div className={styles.settingsRow}>
          <div className={styles.inputGroup}>
            <label>Font Style</label>
            <select className={styles.select} value={font} onChange={(e) => setFont(e.target.value)}>
              {fonts.map(f => <option key={f.name} value={f.name}>{f.label}</option>)}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Ink Color</label>
            <input type="color" className={styles.colorPicker} value={color} onChange={(e) => setColor(e.target.value)} />
          </div>

          <div className={styles.inputGroup}>
            <label>Font Size</label>
            <input type="range" min="15" max="40" value={size} onChange={(e) => setSize(e.target.value)} className={styles.range} />
          </div>

          <div className={styles.inputGroup}>
            <label>Paper</label>
            <input type="color" className={styles.colorPicker} value={paperColor} onChange={(e) => setPaperColor(e.target.value)} />
          </div>
        </div>
      </div>

      <div className={styles.canvasWrapper}>
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.downloadBtn} onClick={handleDownload} disabled={!text}>
          ⬇️ Download as PNG
        </button>
        <button className={styles.clearBtn} onClick={handleClear} disabled={!text}>
          🗑️ Clear Text
        </button>
      </div>
    </div>
  );
};

export default TextToHandwriting;
