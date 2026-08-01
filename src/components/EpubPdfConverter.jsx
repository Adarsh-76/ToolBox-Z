import React, { useState, useEffect, useRef } from 'react';
import styles from './EpubPdfConverter.module.css';

const EpubPdfConverter = () => {
  const [mode, setMode] = useState('pdf-to-epub'); // 'pdf-to-epub' or 'epub-to-pdf'
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const libsLoaded = useRef(false);

  // Dynamically load required libraries
  useEffect(() => {
    if (libsLoaded.current) return;
    
    const loadScript = (src) => new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js')
    ]).then(() => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      libsLoaded.current = true;
    }).catch(() => setError('Failed to load conversion libraries.'));
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus('');
      setError('');
      setDownloadUrl('');
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    if (!libsLoaded.current || !window.JSZip) {
      setError('Libraries are still loading. Please wait 2 seconds and try again.');
      return;
    }

    setIsProcessing(true);
    setStatus('Processing... This may take a moment for large files.');
    setError('');
    setDownloadUrl('');

    try {
      if (mode === 'pdf-to-epub') {
        await convertPdfToEpub(file);
      } else {
        await convertEpubToPdf(file);
      }
    } catch (err) {
      console.error(err);
      setError('Conversion failed: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // 1. PDF to ePub Logic
  const convertPdfToEpub = async (pdfFile) => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullHtml = '';
    let toc = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      setStatus(`Extracting text from page ${i} of ${pdf.numPages}...`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      let pageText = '';
      let lastY = -1;
      
      textContent.items.forEach((item) => {
        if (lastY !== -1 && Math.abs(lastY - item.transform[5]) > 5) {
          pageText += '\n';
        }
        pageText += item.str + ' ';
        lastY = item.transform[5];
      });

      // Basic paragraph formatting
      const paragraphs = pageText.split('\n').filter(p => p.trim().length > 0).map(p => `<p>${p.trim()}</p>`).join('');
      fullHtml += `<h2>Page ${i}</h2>${paragraphs}`;
      toc.push({ id: `page-${i}`, title: `Page ${i}` });
    }

    setStatus('Building ePub archive...');
    const zip = new window.JSZip();

    // 1. mimetype file (must be uncompressed)
    zip.file("mimetype", "application/epub+zip", { compression: "STORE" });

    // 2. META-INF/container.xml
    zip.file("META-INF/container.xml", 
      `<?xml version="1.0"?>
      <container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
        <rootfiles>
          <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
        </rootfiles>
      </container>`
    );

    // 3. OEBPS/content.opf
    const manifestItems = toc.map(t => `<item id="${t.id}" href="${t.id}.xhtml" media-type="application/xhtml+xml"/>`).join('');
    const spineItems = toc.map(t => `<itemref idref="${t.id}"/>`).join('');
    
    zip.file("OEBPS/content.opf", 
      `<?xml version="1.0" encoding="UTF-8"?>
      <package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="3.0">
        <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
          <dc:title>${pdfFile.name.replace('.pdf', '')}</dc:title>
          <dc:language>en</dc:language>
          <dc:identifier id="bookid">toolbox-${Date.now()}</dc:identifier>
        </metadata>
        <manifest>
          <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
          ${manifestItems}
        </manifest>
        <spine toc="ncx">
          ${spineItems}
        </spine>
      </package>`
    );

    // 4. OEBPS/toc.ncx
    const navPoints = toc.map((t, i) => `
      <navPoint id="navpoint-${i+1}" playOrder="${i+1}">
        <navLabel><text>${t.title}</text></navLabel>
        <content src="${t.id}.xhtml"/>
      </navPoint>
    `).join('');

    zip.file("OEBPS/toc.ncx", 
      `<?xml version="1.0" encoding="UTF-8"?>
      <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
        <head>
          <meta name="dtb:uid" content="toolbox-${Date.now()}"/>
        </head>
        <docTitle><text>${pdfFile.name.replace('.pdf', '')}</text></docTitle>
        <navMap>
          ${navPoints}
        </navMap>
      </ncx>`
    );

    // 5. OEBPS/page-X.xhtml files
    toc.forEach(t => {
      const regex = new RegExp(`<h2>${t.title}</h2>(.*)`, 's');
      const match = fullHtml.match(regex);
      const content = match ? match[1] : '';
      
      zip.file(`OEBPS/${t.id}.xhtml`, 
        `<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head><title>${t.title}</title></head>
          <body><h1>${t.title}</h1>${content}</body>
        </html>`
      );
    });

    const blob = await zip.generateAsync({ type: "blob", mimeType: "application/epub+zip" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setStatus('✅ ePub generated successfully!');
  };

  // 2. ePub to PDF Logic
  const convertEpubToPdf = async (epubFile) => {
    setStatus('Extracting ePub contents...');
    const arrayBuffer = await epubFile.arrayBuffer();
    const zip = await window.JSZip.loadAsync(arrayBuffer);
    
    let htmlContent = '';
    const opfFile = zip.file(/^OEBPS\/content\.opf$/i)[0] || Object.values(zip.files).find(f => f.name.endsWith('.opf'));
    
    if (!opfFile) throw new Error("Invalid ePub: Missing OPF file.");
    
    const opfText = await opfFile.async('string');
    const spineMatch = opfText.match(/<spine[^>]*>([\s\S]*?)<\/spine>/);
    const manifestMatch = opfText.match(/<manifest[^>]*>([\s\S]*?)<\/manifest>/);
    
    if (!spineMatch || !manifestMatch) throw new Error("Invalid ePub structure.");

    // Parse manifest to map IDs to file paths
    const manifest = {};
    manifestMatch[1].match(/<item[^>]+>/g).forEach(item => {
      const idMatch = item.match(/id="([^"]+)"/);
      const hrefMatch = item.match(/href="([^"]+)"/);
      if (idMatch && hrefMatch) manifest[idMatch[1]] = hrefMatch[1];
    });

    // Parse spine to get reading order
    const spineIds = [];
    spineMatch[1].match(/idref="([^"]+)"/g).forEach(idRef => {
      spineIds.push(idRef.replace('idref="', '').replace('"', ''));
    });

    // Extract HTML content in order
    const opfDir = opfFile.name.split('/').slice(0, -1).join('/');
    for (const id of spineIds) {
      const href = manifest[id];
      if (!href) continue;
      
      const fullPath = opfDir ? `${opfDir}/${href}` : href;
      const file = zip.file(fullPath);
      if (file) {
        let html = await file.async('string');
        // Remove XML declarations and DOCTYPEs for clean HTML rendering
        html = html.replace(/<\?xml[^>]*\?>/, '').replace(/<!DOCTYPE[^>]*>/, '');
        // Extract body content to avoid nested html/head tags
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        if (bodyMatch) html = bodyMatch[1];
        htmlContent += html;
      }
    }

    if (!htmlContent) throw new Error("No readable HTML content found in ePub.");

    setStatus('Rendering PDF... This may take a moment.');
    
    // Create a hidden container to render the HTML
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '800px';
    container.style.padding = '20px';
    container.style.color = '#000';
    container.style.fontFamily = 'Arial, sans-serif';
    container.innerHTML = `<div>${htmlContent}</div>`;
    document.body.appendChild(container);

    const opt = {
      margin: [10, 10, 10, 10],
      filename: epubFile.name.replace('.epub', '.pdf'),
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    await window.html2pdf().set(opt).from(container).save();
    document.body.removeChild(container);
    setStatus('✅ PDF generated successfully!');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.modeSelector}`}>
        <button 
          className={`${styles.modeBtn} ${mode === 'pdf-to-epub' ? styles.activeMode : ''}`}
          onClick={() => setMode('pdf-to-epub')}
        >
          📄 ➔ 📚 PDF to ePub
        </button>
        <button 
          className={`${styles.modeBtn} ${mode === 'epub-to-pdf' ? styles.activeMode : ''}`}
          onClick={() => setMode('epub-to-pdf')}
        >
          📚 ➔ 📄 ePub to PDF
        </button>
      </div>

      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.label}>Upload {mode === 'pdf-to-epub' ? 'PDF' : 'ePub'} File</h3>
        <input 
          type="file" 
          accept={mode === 'pdf-to-epub' ? '.pdf' : '.epub'}
          onChange={handleFileChange}
          className={styles.fileInput}
          id="epub-pdf-upload"
        />
        <label htmlFor="epub-pdf-upload" className={styles.fileLabel}>
          {file ? `📄 ${file.name}` : 'Click to select file'}
        </label>
      </div>

      <button 
        className={styles.convertBtn} 
        onClick={handleConvert}
        disabled={!file || isProcessing}
      >
        {isProcessing ? '⏳ Converting...' : '⚡ Convert File'}
      </button>

      {status && <p className={styles.status}>{status}</p>}
      {error && <p className={styles.error}>{error}</p>}
      
      {downloadUrl && (
        <div className={`liquid-glass ${styles.downloadBox}`}>
          <h4>✅ Success!</h4>
          <a href={downloadUrl} download={mode === 'pdf-to-epub' ? 'converted.epub' : 'converted.pdf'} className={styles.downloadLink}>
            ⬇️ Click here to download your file
          </a>
        </div>
      )}

      <div className={`liquid-glass ${styles.noteBox}`}>
        <h4>📝 Conversion Notes</h4>
        <ul>
          <li>PDFs are fixed-layout, while ePubs are reflowable like websites. This tool extracts the text from PDFs to create a readable ePub.</li>
          <li>When converting ePub to PDF, inline images may be skipped if they are blocked by browser CORS security.</li>
          <li>All processing happens 100% in your browser. No files are uploaded to any server.</li>
        </ul>
      </div>
    </div>
  );
};

export default EpubPdfConverter;
