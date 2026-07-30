import React, { useState, useRef } from 'react';
import styles from './ImageDescriber.module.css';

const ImageDescriber = () => {
  const [imagePath, setImagePath] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [colors, setColors] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [description, setDescription] = useState('');
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePath(URL.createObjectURL(file));
    setPredictions([]);
    setColors([]);
    setDescription('');
  };

  const analyzeImage = async () => {
    if (!imagePath || !imgRef.current) return;
    setIsProcessing(true);
    setDescription('Loading AI model... (This may take 10-15 seconds the first time)');
    
    let results = [];

    try {
      // 1. Dynamically import the AI libraries to prevent Vite bundling issues
      const tf = await import('@tensorflow/tfjs');
      const mobilenet = await import('@tensorflow-models/mobilenet');
      
      // 2. Force CPU backend if WebGL fails (fixes mobile/Termux crashes)
      try {
        await tf.setBackend('webgl');
      } catch (e) {
        console.log('WebGL not available, falling back to CPU');
        await tf.setBackend('cpu');
      }
      await tf.ready();

      // 3. Ensure image is fully loaded
      if (!imgRef.current.complete || imgRef.current.naturalWidth === 0) {
        await new Promise((resolve, reject) => {
          imgRef.current.onload = () => resolve();
          imgRef.current.onerror = () => reject(new Error("Image failed to load"));
        });
      }

      // 4. Load model and classify
      const model = await mobilenet.load();
      results = await model.classify(imgRef.current, 5);
      setPredictions(results);

    } catch (aiErr) {
      console.error("AI Model Error:", aiErr);
      setDescription('Error: The AI model failed to load or run. This device might not support WebGL/WASM required for browser AI.');
      setIsProcessing(false);
      return;
    }

    // 5. Build Description (Run separately so canvas errors don't kill the AI results)
    let desc = "This image appears to contain ";
    if (results.length > 0) {
      const topItems = results.slice(0, 3).map(p => p.className.split(',')[0]);
      desc += topItems.join(', ') + ". ";
    } else {
      desc = "The AI could not confidently identify the main objects. ";
    }

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imgRef.current.naturalWidth || 100;
      canvas.height = imgRef.current.naturalHeight || 100;
      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let brightness = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        brightness += (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3;
      }
      brightness = brightness / (imageData.data.length / 4);
      
      if (brightness < 85) desc += "The overall lighting is dark and moody.";
      else if (brightness > 170) desc += "The overall lighting is bright and vibrant.";
      else desc += "The lighting is well-balanced.";

      // Extract Colors
      const colorCanvas = document.createElement('canvas');
      const colorCtx = colorCanvas.getContext('2d');
      colorCanvas.width = 50;
      colorCanvas.height = 50;
      colorCtx.drawImage(imgRef.current, 0, 0, 50, 50);
      const data = colorCtx.getImageData(0, 0, 50, 50).data;
      
      let colorCounts = {};
      for (let i = 0; i < data.length; i += 4) {
        const r = Math.round(data[i] / 20) * 20;
        const g = Math.round(data[i+1] / 20) * 20;
        const b = Math.round(data[i+2] / 20) * 20;
        const rgb = `rgb(${r},${g},${b})`;
        colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
      }
      
      const topColors = Object.entries(colorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(entry => entry[0]);
        
      setColors(topColors);

    } catch (canvasErr) {
      console.error("Canvas Analysis Error:", canvasErr);
      desc += " (Could not analyze colors/lighting due to browser security restrictions)";
    }

    setDescription(desc);
    setIsProcessing(false);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          id="aiInput" 
          className={styles.hiddenInput}
        />
        <label htmlFor="aiInput" className={styles.uploadLabel}>
          <span className={styles.uploadIcon}>🧠</span>
          <span>Select Image for AI Analysis</span>
        </label>
      </div>

      {imagePath && (
        <div className={styles.grid}>
          <div className={styles.paneWrapper}>
            <label className={styles.paneLabel}>Image Preview</label>
            <div className={`liquid-glass ${styles.imagePreviewWrapper}`}>
              <img 
                ref={imgRef} 
                src={imagePath} 
                alt="preview" 
                className={styles.previewImg} 
              />
            </div>
            <button className={styles.analyzeBtn} onClick={analyzeImage} disabled={isProcessing}>
              {isProcessing ? '⏳ AI Analyzing...' : '✨ Analyze Image'}
            </button>
          </div>

          <div className={styles.paneWrapper}>
            <label className={styles.paneLabel}>AI Analysis Results</label>
            <div className={`liquid-glass ${styles.resultsArea}`}>
              {description ? (
                <>
                  <div className={styles.descriptionBox}>
                    <h3 className={styles.boxTitle}>📝 Summary</h3>
                    <p className={styles.descText}>{description}</p>
                  </div>

                  {predictions.length > 0 && (
                    <div className={styles.descriptionBox}>
                      <h3 className={styles.boxTitle}>🏷️ Detected Objects</h3>
                      <div className={styles.tagGrid}>
                        {predictions.map((pred, i) => (
                          <div key={i} className={styles.tag}>
                            {pred.className.split(',')[0]} ({Math.round(pred.probability * 100)}%)
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {colors.length > 0 && (
                    <div className={styles.descriptionBox}>
                      <h3 className={styles.boxTitle}>🎨 Dominant Colors</h3>
                      <div className={styles.colorSwatches}>
                        {colors.map((color, i) => (
                          <div 
                            key={i} 
                            className={styles.swatch} 
                            style={{ backgroundColor: color }}
                            title={color}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className={styles.placeholderText}>Analysis results will appear here...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDescriber;
