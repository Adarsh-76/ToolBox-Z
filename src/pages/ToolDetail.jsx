import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import { toolsRegistry } from '../toolsRegistry';
import PrivacyBanner from '../components/PrivacyBanner';
import SaveSnippet from '../components/SaveSnippet';
import styles from './ToolDetail.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;

const LoadingFallback = () => <div className={styles.placeholder}><h2>Loading Tool...</h2></div>;

const ToolDetail = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const tool = toolsList.find((t) => t.id === toolId);
  
  const [resetKey, setResetKey] = useState(0);
  const [isToolActive, setIsToolActive] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // NEW: Dynamic SEO Meta Tags & Document Title
  useEffect(() => {
    if (tool) {
      // Update Tab Title
      document.title = `${tool.name} - ToolBox Z`;
      
      // Update or create Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = tool.desc;

      // Update Open Graph tags for WhatsApp/Twitter rich previews
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = `${tool.name} - ToolBox Z`;

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.content = tool.desc;
    }
  }, [tool]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (tool) {
      let recent = JSON.parse(localStorage.getItem('recentTools') || '[]');
      recent = recent.filter(id => id !== tool.id);
      recent.unshift(tool.id);
      recent = recent.slice(0, 4);
      localStorage.setItem('recentTools', JSON.stringify(recent));

      let uniqueUsed = JSON.parse(localStorage.getItem('uniqueToolsUsed') || '[]');
      if (!uniqueUsed.includes(tool.id)) {
        uniqueUsed.push(tool.id);
        localStorage.setItem('uniqueToolsUsed', JSON.stringify(uniqueUsed));
        window.dispatchEvent(new Event('storage'));
      }

      let toolCounts = JSON.parse(localStorage.getItem('toolCounts') || '{}');
      toolCounts[tool.id] = (toolCounts[tool.id] || 0) + 1;
      localStorage.setItem('toolCounts', JSON.stringify(toolCounts));

      if (token) {
        fetch(`${API_BASE_URL}/api/tools/track`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ toolId: tool.id })
        }).catch(err => console.error('Failed to track tool usage:', err));
      }
    }
  }, [tool]);

  const handleClearData = () => {
    setResetKey(prev => prev + 1);
    setIsToolActive(false);
  };

  const handleWorkspaceInteraction = (e) => {
    if (e.target.closest('button')) setIsToolActive(true);
    if (e.target.closest('a')) setIsToolActive(true);
    if (e.target.type === 'file' && e.target.files && e.target.files.length > 0) setIsToolActive(true);
  };

  const handleWorkspaceDrop = (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) setIsToolActive(true);
  };
   // NEW: Native Share Function with Bulletproof Fallback
  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: `${tool.name} - ToolBox Z`,
      text: `Check out this awesome tool: ${tool.name}. ${tool.desc}`,
      url: shareUrl
    };

    // 1. Try Native Share Sheet (Works on HTTPS or Localhost)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled');
      }
      return;
    }

    // 2. Try Clipboard API (Requires HTTPS or Localhost)
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('✅ Link copied to clipboard! Share it anywhere.');
        return;
      } catch (err) {
        // Fall through to fallback if blocked
      }
    }

    // 3. Fallback for Developer Mode / HTTP (Hidden textarea trick)
    const textArea = document.createElement('textarea');
    textArea.value = shareUrl;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert('✅ Link copied to clipboard! Share it anywhere.');
      } else {
        // 4. Ultimate Fallback: Just show the link to copy manually
        prompt('Copy this link to share:', shareUrl);
      }
    } catch (err) {
      prompt('Copy this link to share:', shareUrl);
    }

    document.body.removeChild(textArea);
  };
 
 if (!tool) {
    return (
      <div className={styles.container}>
        <h2>Tool not found!</h2>
        <button className={styles.btn} onClick={() => navigate('/tools')}>Back to Tools</button>
      </div>
    );
  }

  const sensitiveCategories = ['Image & Design', 'PDF Tools', 'Social Media Tools'];
  const showPrivacyBanner = sensitiveCategories.includes(tool.category);

  const registryItem = toolsRegistry[toolId];
  const ToolComponent = registryItem ? registryItem.Tool : null;
  const InfoComponent = registryItem ? registryItem.Info : null;

  const Recommendations = toolsRegistry.Recommendations;
  const ToolFeedback = toolsRegistry.ToolFeedback;
  const Comments = toolsRegistry.Comments;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.bigIcon}>{tool.icon}</span>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{tool.name}</h1>
          {/* NEW: Share Button */}
          <button className={styles.shareBtn} onClick={handleShare} title="Share this tool">
            📤 Share
          </button>
        </div>
        <p className={styles.desc}>{tool.desc}</p>
      </div>
      
      {showPrivacyBanner && isToolActive && <PrivacyBanner onClear={handleClearData} />}

      {isLoggedIn && !sensitiveCategories.includes(tool.category) && (
        <div className={styles.saveBtnContainer}>
          <button className={styles.saveBtn} onClick={() => setShowSaveModal(true)}>
            💾 Save Result to Workspace
          </button>
        </div>
      )}

      <div 
        className={`liquid-glass ${styles.toolWorkspace}`}
        onClick={handleWorkspaceInteraction}
        onChange={handleWorkspaceInteraction}
        onDrop={handleWorkspaceDrop}
      >
        <Suspense fallback={<LoadingFallback />}>
          {ToolComponent ? <ToolComponent key={resetKey} /> : (
            <div className={styles.placeholder}>                                      <h2>Workspace Coming Soon!</h2>
              <p>This is where the actual interactive tool for {tool.name} will live.</p>
            </div>                                                                )}
        </Suspense>                                                           </div>
                                                                              
      <button className={styles.btn} onClick={() => navigate('/tools')}>
        ← Back to all tools                                                   </button>                                                         
      <Suspense fallback={<LoadingFallback />}>                                 {InfoComponent && <InfoComponent />}
      </Suspense>
                                                                              
      {/* Related Tools (AI Recommendations) */}
      <Suspense fallback={null}>
        <Recommendations currentToolId={tool.id} />
      </Suspense>

      {/* Reviews Section */}
      <Suspense fallback={null}>
        <ToolFeedback toolId={tool.id} />                                     
      </Suspense>                                                       
      {/* Comments Section */}
      <Suspense fallback={null}>
        <Comments toolId={tool.id} />
      </Suspense>

      {showSaveModal && (
        <SaveSnippet tool={tool} onClose={() => setShowSaveModal(false)} />
      )}
    </div>
  );
};                                                                      
export default ToolDetail;
