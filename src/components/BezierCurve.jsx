import React, { useState, useRef, useEffect } from 'react';
import styles from './BezierCurve.module.css';

const BezierCurve = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState({ p1: { x: 50, y: 250 }, p2: { x: 250, y: 50 } });
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);

    // Draw Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    for (let i = 0; i <= 300; i += 30) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 300); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(300, i); ctx.stroke();
    }

    // Draw Control Lines
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(0, 300); ctx.lineTo(points.p1.x, points.p1.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(300, 0); ctx.lineTo(points.p2.x, points.p2.y); ctx.stroke();
    ctx.setLineDash([]);

    // Draw Curve
    ctx.strokeStyle = '#C77777'; // Theme Red/Pink
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.bezierCurveTo(points.p1.x, points.p1.y, points.p2.x, points.p2.y, 300, 0);
    ctx.stroke();

    // Draw Points
    ctx.fillStyle = '#86A788'; // Theme Green
    ctx.beginPath(); ctx.arc(points.p1.x, points.p1.y, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#D9E3A6'; // Theme Yellow
    ctx.beginPath(); ctx.arc(points.p2.x, points.p2.y, 12, 0, Math.PI * 2); ctx.fill();
  }, [points]);

  // Helper to calculate correct canvas coordinates even if canvas is scaled by CSS
  const getCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Handle both Touch and Mouse events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    return {
      x: Math.max(0, Math.min(300, (clientX - rect.left) * scaleX)),
      y: Math.max(0, Math.min(300, (clientY - rect.top) * scaleY))
    };
  };

  const handleStart = (e) => {
    const { x, y } = getCoords(e);
    const dist1 = Math.hypot(x - points.p1.x, y - points.p1.y);
    const dist2 = Math.hypot(x - points.p2.x, y - points.p2.y);
    
    // If user taps near a point, start dragging it
    if (dist1 < 30 || dist2 < 30) {
      setDragging(dist1 < dist2 ? 'p1' : 'p2');
    }
  };

  const handleMove = (e) => {
    if (!dragging) return;
    e.preventDefault(); // Prevent screen from scrolling while dragging on mobile
    const { x, y } = getCoords(e);
    setPoints(prev => ({ ...prev, [dragging]: { x, y } }));
  };

  const handleEnd = () => setDragging(null);

  // Convert pixels (0-300) to CSS cubic-bezier values (0-1)
  const x1 = (points.p1.x / 300).toFixed(2);
  const y1 = (1 - (points.p1.y / 300)).toFixed(2);
  const x2 = (points.p2.x / 300).toFixed(2);
  const y2 = (1 - (points.p2.y / 300)).toFixed(2);

  const cssCode = `transition: all 0.5s cubic-bezier(${x1}, ${y1}, ${x2}, ${y2});`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.canvasArea}`}>
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={300} 
          className={styles.canvas}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          style={{ cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none' }}
        />
        <p className={styles.hint}>Drag the colored dots to adjust the curve.</p>
      </div>

      <div className={`liquid-glass ${styles.codeArea}`}>
        <button className={styles.copyBtn} onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy CSS'}</button>
        <pre className={styles.codeBlock}>{cssCode}</pre>
      </div>
    </div>
  );
};

export default BezierCurve;
