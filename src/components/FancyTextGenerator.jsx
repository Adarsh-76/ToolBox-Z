import React, { useState } from 'react';
import styles from './FancyTextGenerator.module.css';

// Pre-defined Unicode maps for reliable, instant rendering
const maps = {
  Bold: { 'A':'𝐀','B':'𝐁','C':'𝐂','D':'𝐃','E':'𝐄','F':'𝐅','G':'𝐆','H':'𝐇','I':'𝐈','J':'𝐉','K':'𝐊','L':'𝐋','M':'𝐌','N':'𝐍','O':'𝐎','P':'𝐏','Q':'𝐐','R':'𝐑','S':'𝐒','T':'𝐓','U':'𝐔','V':'𝐕','W':'𝐖','X':'𝐗','Y':'𝐘','Z':'𝐙', 'a':'𝐚','b':'𝐛','c':'𝐜','d':'𝐝','e':'𝐞','f':'𝐟','g':'𝐠','h':'𝐡','i':'𝐢','j':'𝐣','k':'𝐤','l':'𝐥','m':'𝐦','n':'𝐧','o':'𝐨','p':'𝐩','q':'𝐪','r':'𝐫','s':'𝐬','t':'𝐭','u':'𝐮','v':'𝐯','w':'𝐰','x':'𝐱','y':'𝐲','z':'𝐳', '0':'𝟎','1':'𝟏','2':'𝟐','3':'𝟑','4':'𝟒','5':'𝟓','6':'𝟔','7':'𝟕','8':'𝟖','9':'𝟗' },
  Italic: { 'A':'𝐴','B':'𝐵','C':'𝐶','D':'𝐷','E':'𝐸','F':'𝐹','G':'𝐺','H':'𝐻','I':'𝐼','J':'𝐽','K':'𝐾','L':'𝐿','M':'𝑀','N':'𝑁','O':'𝑂','P':'𝑃','Q':'𝑄','R':'𝑅','S':'𝑆','T':'𝑇','U':'𝑈','V':'𝑉','W':'𝑊','X':'𝑋','Y':'𝑌','Z':'𝑍', 'a':'𝑎','b':'𝑏','c':'𝑐','d':'𝑑','e':'𝑒','f':'𝑓','g':'𝑔','h':'ℎ','i':'𝑖','j':'𝑗','k':'𝑘','l':'𝑙','m':'𝑚','n':'𝑛','o':'𝑜','p':'𝑝','q':'𝑞','r':'𝑟','s':'𝑠','t':'𝑡','u':'𝑢','v':'𝑣','w':'𝑤','x':'𝑥','y':'𝑦','z':'𝑧' },
  BoldItalic: { 'A':'𝑨','B':'𝑩','C':'𝑪','D':'𝑫','E':'𝑬','F':'𝑭','G':'𝑮','H':'𝑯','I':'𝑰','J':'𝑱','K':'𝑲','L':'𝑳','M':'𝑴','N':'𝑵','O':'𝑶','P':'𝑷','Q':'𝑸','R':'𝑹','S':'𝑺','T':'𝑻','U':'𝑼','V':'𝑽','W':'𝑾','X':'𝑿','Y':'𝒀','Z':'𝒁', 'a':'𝒂','b':'𝒃','c':'𝒄','d':'𝒅','e':'𝒆','f':'𝒇','g':'𝒈','h':'𝒉','i':'𝒊','j':'𝒋','k':'𝒌','l':'𝒍','m':'𝒎','n':'𝒏','o':'𝒐','p':'𝒑','q':'𝒒','r':'𝒓','s':'𝒔','t':'𝒕','u':'𝒖','v':'𝒗','w':'𝒘','x':'𝒙','y':'𝒚','z':'𝒛' },
  Monospace: { 'A':'𝙰','B':'𝙱','C':'𝙲','D':'𝙳','E':'𝙴','F':'𝙵','G':'𝙶','H':'𝙷','I':'𝙸','J':'𝙹','K':'𝙺','L':'𝙻','M':'𝙼','N':'𝙽','O':'𝙾','P':'𝙿','Q':'𝚀','R':'𝚁','S':'𝚂','T':'𝚃','U':'𝚄','V':'𝚅','W':'𝚆','X':'𝚇','Y':'𝚈','Z':'𝚉', 'a':'𝚊','b':'𝚋','c':'𝚌','d':'𝚍','e':'𝚎','f':'𝚏','g':'𝚐','h':'𝚑','i':'𝚒','j':'𝚓','k':'𝚔','l':'𝚕','m':'𝚖','n':'𝚗','o':'𝚘','p':'𝚙','q':'𝚚','r':'𝚛','s':'𝚜','t':'𝚝','u':'𝚞','v':'𝚟','w':'𝚠','x':'𝚡','y':'𝚢','z':'𝚣', '0':'𝟶','1':'𝟷','2':'𝟸','3':'𝟹','4':'𝟺','5':'𝟻','6':'𝟼','7':'𝟽','8':'𝟾','9':'𝟿' },
  DoubleStruck: { 'A':'𝔸','B':'𝔹','C':'ℂ','D':'𝔻','E':'𝔼','F':'𝔽','G':'𝔾','H':'ℍ','I':'𝕀','J':'𝕁','K':'𝕂','L':'𝕃','M':'𝕄','N':'ℕ','O':'𝕆','P':'ℙ','Q':'ℚ','R':'ℝ','S':'𝕊','T':'𝕋','U':'𝕌','V':'𝕍','W':'𝕎','X':'𝕏','Y':'𝕐','Z':'ℤ', 'a':'𝕒','b':'𝕓','c':'𝕔','d':'𝕕','e':'𝕖','f':'𝕗','g':'𝕘','h':'𝕙','i':'𝕚','j':'𝕛','k':'𝕜','l':'𝕝','m':'𝕞','n':'𝕟','o':'𝕠','p':'𝕡','q':'𝕢','r':'𝕣','s':'𝕤','t':'𝕥','u':'𝕦','v':'𝕧','w':'𝕨','x':'𝕩','y':'𝕪','z':'𝕫', '0':'𝟘','1':'𝟙','2':'𝟚','3':'𝟛','4':'𝟜','5':'𝟝','6':'𝟞','7':'𝟟','8':'𝟠','9':'𝟡' },
  Circled: { 'A':'Ⓐ','B':'Ⓑ','C':'Ⓒ','D':'Ⓓ','E':'Ⓔ','F':'Ⓕ','G':'Ⓖ','H':'Ⓗ','I':'Ⓘ','J':'Ⓙ','K':'Ⓚ','L':'Ⓛ','M':'Ⓜ','N':'Ⓝ','O':'Ⓞ','P':'Ⓟ','Q':'Ⓠ','R':'Ⓡ','S':'Ⓢ','T':'Ⓣ','U':'Ⓤ','V':'Ⓥ','W':'Ⓦ','X':'Ⓧ','Y':'Ⓨ','Z':'Ⓩ', 'a':'ⓐ','b':'ⓑ','c':'ⓒ','d':'ⓓ','e':'ⓔ','f':'ⓕ','g':'ⓖ','h':'ⓗ','i':'ⓘ','j':'ⓙ','k':'ⓚ','l':'ⓛ','m':'ⓜ','n':'ⓝ','o':'ⓞ','p':'ⓟ','q':'ⓠ','r':'ⓡ','s':'ⓢ','t':'ⓣ','u':'ⓤ','v':'ⓥ','w':'ⓦ','x':'ⓧ','y':'ⓨ','z':'ⓩ', '0':'⓪','1':'①','2':'②','3':'③','4':'④','5':'⑤','6':'⑥','7':'⑦','8':'⑧','9':'⑨' },
  Squared: { 'A':'🄰','B':'🄱','C':'🄲','D':'🄳','E':'🄴','F':'🄵','G':'🄶','H':'🄷','I':'🄸','J':'🄹','K':'🄺','L':'🄻','M':'🄼','N':'🄽','O':'🄾','P':'🄿','Q':'🅀','R':'🅁','S':'🅂','T':'🅃','U':'🅄','V':'🅅','W':'🅆','X':'🅇','Y':'🅈','Z':'🅉', 'a':'🅐','b':'🅑','c':'🅒','d':'🅓','e':'🅔','f':'🅕','g':'🅖','h':'🅗','i':'🅘','j':'🅙','k':'🅚','l':'🅛','m':'🅜','n':'🅝','o':'🅞','p':'🅟','q':'🅠','r':'🅡','s':'🅢','t':'🅣','u':'🅤','v':'🅥','w':'🅦','x':'🅧','y':'🅨','z':'🅩' },
  Fullwidth: { 'A':'Ａ','B':'Ｂ','C':'Ｃ','D':'Ｄ','E':'Ｅ','F':'Ｆ','G':'Ｇ','H':'Ｈ','I':'Ｉ','J':'Ｊ','K':'Ｋ','L':'Ｌ','M':'Ｍ','N':'Ｎ','O':'Ｏ','P':'Ｐ','Q':'Ｑ','R':'Ｒ','S':'Ｓ','T':'Ｔ','U':'Ｕ','V':'Ｖ','W':'Ｗ','X':'Ｘ','Y':'Ｙ','Z':'Ｚ', 'a':'ａ','b':'ｂ','c':'ｃ','d':'ｄ','e':'ｅ','f':'ｆ','g':'ｇ','h':'ｈ','i':'ｉ','j':'ｊ','k':'ｋ','l':'ｌ','m':'ｍ','n':'ｎ','o':'ｏ','p':'ｐ','q':'ｑ','r':'ｒ','s':'ｓ','t':'ｔ','u':'ｕ','v':'ｖ','w':'ｗ','x':'ｘ','y':'ｙ','z':'ｚ', '0':'０','1':'１','2':'２','3':'３','4':'４','5':'５','6':'６','7':'７','8':'８','9':'９' }
};

const convertText = (text, map) => {
  return text.split('').map(char => map[char] || char).join('');
};

const FancyTextGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Bold');
  const [resultText, setResultText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = () => {
    if (!inputText.trim()) {
      setError('Please enter some text first.');
      setResultText('');
      return;
    }
    setError('');
    const map = maps[selectedStyle];
    const converted = convertText(inputText, map);
    setResultText(converted);
    setCopied(false);
  };

  const handleClear = () => {
    setInputText('');
    setResultText('');
    setError('');
    setCopied(false);
  };

  const handleCopy = () => {
    if (!resultText) return;
    
    // Fallback for non-secure contexts (HTTP Local IP)
    const textArea = document.createElement("textarea");
    textArea.value = resultText;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
      alert('Failed to copy. Please copy manually.');
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <h3 className={styles.title}>Fancy Text Generator</h3>
        <p className={styles.subtitle}>Type your text, choose a style, and generate</p>
        
        <input 
          type="text"
          className={styles.textInput}
          placeholder="Type your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className={styles.optionsGrid}>
          {Object.keys(maps).map((name) => (
            <button 
              key={name} 
              className={`${styles.optionBtn} ${selectedStyle === name ? styles.optionActive : ''}`}
              onClick={() => setSelectedStyle(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.generateBtn} onClick={handleGenerate}>
            ✨ Generate Text
          </button>
          <button className={styles.clearBtn} onClick={handleClear}>
            ✖️ Clear
          </button>
        </div>
        {error && <div className={styles.errorBox}>{error}</div>}
      </div>

      {resultText && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3 className={styles.resultTitle}>Your Result</h3>
          <div className={styles.resultBox}>
            <p className={styles.resultText}>{resultText}</p>
          </div>
          <button className={styles.copyBtn} onClick={handleCopy}>
            {copied ? '✅ Copied!' : '📋 Copy to Clipboard'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FancyTextGenerator;
