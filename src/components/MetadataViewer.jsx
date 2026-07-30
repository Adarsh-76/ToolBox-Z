import React, { useState } from 'react';
import * as piexif from 'piexifjs';
import styles from './MetadataViewer.module.css';

// Helper function to reverse the piexif dictionaries so we can look up names by ID
const reverseDict = (dict) => {
  const reversed = {};
  for (let key in dict) {
    reversed[dict[key]] = key;
  }
  return reversed;
};

// Create lookup maps for each section
const ifdMaps = {
  '0th': reverseDict(piexif.ImageIFD),
  'Exif': reverseDict(piexif.ExifIFD),
  'GPS': reverseDict(piexif.GPSIFD),
  'Interop': reverseDict(piexif.InteropIFD),
  '1st': reverseDict(piexif.ImageIFD),
};

const MetadataViewer = () => {
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setMetadata(null);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target.result;
      setImage(url);

      try {
        const exifObj = piexif.load(url);
        const data = [];
        
        for (let ifd in exifObj) {
          if (ifd === "thumbnail") continue;
          
          for (let tag in exifObj[ifd]) {
            let value = exifObj[ifd][tag];
            
            // Format arrays into strings
            if (value instanceof Array) {
              value = value.join(", ");
            } else {
              value = String(value);
            }

            // Look up the human-readable tag name
            const tagName = ifdMaps[ifd] && ifdMaps[ifd][tag] ? ifdMaps[ifd][tag] : `Unknown (${tag})`;
            
            data.push({ ifd, tag: tagName, value });
          }
        }
        
        // Sort data so it's easier to read (0th first, then Exif, then GPS)
        data.sort((a, b) => {
          const order = ['0th', 'Exif', 'GPS', 'Interop', '1st'];
          return order.indexOf(a.ifd) - order.indexOf(b.ifd);
        });

        setMetadata(data);
      } catch (err) {
        console.error(err);
        setError('No EXIF metadata found in this image, or it is not a JPEG.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setMetadata(null);
    document.getElementById('metaInput').value = '';
  };

  const handleStripExif = () => {
    if (!image) return;
    try {
      const strippedUrl = piexif.insert(piexif.dump({}), image);
      const link = document.createElement('a');
      link.href = strippedUrl;
      link.download = `toolverse_stripped.jpg`;
      link.click();
    } catch (err) {
      alert('Failed to strip EXIF data.');
    }
  };

  return (
    <div className={styles.container}>
      {!image && (
        <div className={`liquid-glass ${styles.uploadArea}`}>
          <input 
            type="file" 
            accept="image/jpeg" 
            onChange={handleFileChange} 
            id="metaInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="metaInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>🏷️</span>
            <span>Select JPEG to View Metadata</span>
          </label>
        </div>
      )}

      {image && (
        <div className={styles.grid}>
          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Image Preview</label>
              <button className={styles.removeBtn} onClick={handleRemoveImage}>
                🗑️ Remove
              </button>
            </div>
            <div className={`liquid-glass ${styles.imagePreviewWrapper}`}>
              <img src={image} alt="preview" className={styles.previewImg} />
            </div>
            <button className={styles.stripBtn} onClick={handleStripExif}>
              🛡️ Strip All EXIF & Download
            </button>
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>EXIF Data</label>
            </div>
            <div className={`liquid-glass ${styles.tableWrapper}`}>
              {error && <p className={styles.errorText}>{error}</p>}
              {!error && !metadata && <p className={styles.loadingText}>Reading data...</p>}
              
              {metadata && metadata.length === 0 && (
                <p className={styles.errorText}>No metadata found.</p>
              )}

              {metadata && metadata.length > 0 && (
                <table className={styles.metaTable}>
                  <thead>
                    <tr>
                      <th>Section</th>
                      <th>Tag</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metadata.map((item, i) => (
                      <tr key={i}>
                        <td className={styles.ifdCell}>{item.ifd}</td>
                        <td className={styles.tagCell}>{item.tag}</td>
                        <td className={styles.valCell}>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetadataViewer;
