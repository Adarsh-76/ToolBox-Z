import React, { useState, useRef, useEffect } from 'react';
import styles from './IgStoryMaker.module.css';

const IgStoryMaker = () => {
  const [bgImage, setBgImage] = useState(null);
  const [bgColor, setBgColor] = useState('#833AB4'); // Default Instagram Purple
  const [text, setText] = useState('Your Story Text Here');
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [overlay, setOverlay] = useState(30);
  const [shapes, setShapes] = useState([]); // Array for shapes
  const canvasRef = useRef(null);

  const templates = [
    { name: 'Purple', color: '#833AB4' },
    { name: 'Pink', color: '#FD1D1D' },
    { name: 'Blue', color: '#405DE6' },
    { name: 'Green', color: '#5851DB' },
    { name: 'Orange', color: '#F77737' },
    { name: 'White', color: '#FFFFFF' }
  ];

  const tips = [
    'Use high contrast colors',
    'Keep text readable',
    'Use Instagram colors',
    'Test on mobile view'
  ];

  // Draw on Canvas whenever settings change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    const drawContent = (image = null) => {
      ctx.clearRect(0, 0, width, height);
      
      // 1. Draw Background Color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Background Image (if exists)
      if (image) {
        const scale = Math.max(width / image.width, height / image.height);
        const newWidth = image.width * scale;
        const newHeight = image.height * scale;
        const x = (width - newWidth) / 2;
        const y = (height - newHeight) / 2;
        ctx.drawImage(image, x, y, newWidth, newHeight);
      }

      // 3. Draw Shapes
      shapes.forEach(s => {
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x, s.y, s.w, s.h);
      });

      // 4. Draw Overlay
      ctx.fillStyle = `rgba(0, 0, 0, ${overlay / 100})`;
      ctx.fillRect(0, 0, width, height);

      // 5. Draw Text
      if (text) {
        ctx.fillStyle = textColor;
        ctx.font = `bold ${fontSize * 4}px Arial`; 
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const maxWidth = width * 0.8;
        const lineHeight = fontSize * 5;
        const words = text.split(' ');
        let line = '';
        let lines = [];
        
        for(let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line);

        const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
        
        lines.forEach((l, i) => {
          ctx.fillText(l, width / 2, startY + (i * lineHeight));
        });
      }
    };

    if (bgImage) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => drawContent(img);
      img.src = bgImage;
    } else {
      drawContent(null);
    }
  }, [bgImage, bgColor, text, fontSize, textColor, overlay, shapes]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBgImage(URL.createObjectURL(file));
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'instagram_story_toolboxz.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const addShape = () => {
    // Add a random semi-transparent rectangle to the center
    const colors = ['rgba(255,255,255,0.3)', 'rgba(0,0,0,0.4)', 'rgba(131,58,180,0.5)', 'rgba(253,29,29,0.5)'];
    const newShape = {
      x: 340 + Math.random() * 200,
      y: 760 + Math.random() * 200,
      w: 300 + Math.random() * 100,
      h: 200 + Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setShapes([...shapes, newShape]);
  };

  const clearAll = () => {
    setBgImage(null);
    setBgColor('#833AB4');
    setText('');
    setShapes([]);
    setOverlay(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Hidden Canvas for HD Download */}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        
        <div className={styles.canvasWrapper}>
          {/* Live HTML Preview */}
          <div className={styles.previewArea}>
            <div 
              className={styles.phoneFrame}
              style={{ 
                backgroundImage: bgImage ? `url(${bgImage})` : 'none', 
                backgroundColor: bgColor,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className={styles.overlay} style={{ backgroundColor: `rgba(0,0,0,${overlay/100})` }}></div>
              
              {/* Render Shapes in HTML Preview */}
              {shapes.map((s, i) => (
                <div 
                  key={i} 
                  className={styles.shapePreview} 
                  style={{ 
                    left: `${(s.x/1080)*100}%`, 
                    top: `${(s.y/1920)*100}%`, 
                    width: `${(s.w/1080)*100}%`, 
                    height: `${(s.h/1920)*100}%`, 
                    backgroundColor: s.color 
                  }}
                ></div>
              ))}

              <div className={styles.textPreview} style={{ color: textColor, fontSize: `${fontSize}px` }}>
                {text || ' '}
              </div>
            </div>
          </div>

          {/* Toolbar Area (Like Canva) */}
          <div className={`liquid-glass ${styles.toolbarArea}`}>
            <div className={styles.toolbar}>
              <label className={styles.toolBtn}>
                📁 Upload BG
                <input type="file" accept="image/*" onChange={handleFileChange} className={styles.hiddenInput} />
              </label>
              <button className={styles.toolBtn} onClick={() => setText(text ? text : 'New Text')}>✍️ Add Text</button>
              <button className={styles.toolBtn} onClick={addShape}>⬜ Add Shape</button>
              <button className={styles.clearBtn} onClick={clearAll}>🗑️ Clear All</button>
              <button className={styles.exportBtn} onClick={handleDownload}>⬇️ Export Story</button>
            </div>

            <div className={styles.templatesRow}>
              <span>Quick Templates:</span>
              {templates.map(t => (
                <button 
                  key={t.name} 
                  className={styles.templateBtn} 
                  style={{ background: t.color }} 
                  onClick={() => { setBgImage(null); setBgColor(t.color); }}
                  title={t.name}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <div className={`liquid-glass ${styles.controlsArea}`}>
          <div className={styles.controlRow}>
            <label>Story Text</label>
            <textarea 
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your text here..."
            />
          </div>

          <div className={styles.sliderRow}>
            <div className={styles.controlGroup}>
              <label>Font Size: <span>{fontSize}px</span></label>
              <input type="range" min="20" max="80" value={fontSize} onChange={(e) => setFontSize(e.target.value)} className={styles.slider} />
            </div>
            <div className={styles.controlGroup}>
              <label>Overlay: <span>{overlay}%</span></label>
              <input type="range" min="0" max="90" value={overlay} onChange={(e) => setOverlay(e.target.value)} className={styles.slider} />
            </div>
          </div>

          <div className={styles.sliderRow}>
            <div className={styles.controlGroup}>
              <label>Text Color</label>
              <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className={styles.colorPicker} />
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className={`liquid-glass ${styles.tipsArea}`}>
        <h3 className={styles.tipsTitle}>Quick Tips for Perfect Stories</h3>
        <div className={styles.tipsGrid}>
          {tips.map((tip, i) => (
            <div key={i} className={styles.tipItem}>
              <span className={styles.tipIcon}>✅</span> {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IgStoryMaker;
