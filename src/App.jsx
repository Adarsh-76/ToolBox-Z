import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Workspace from './pages/Workspace';
import Favorites from './pages/Favorites';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import ToolDetail from './pages/ToolDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import MyDownloads from './pages/MyDownloads';
import GlobalChat from './pages/GlobalChat';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import FloatingDice from './components/FloatingDice';
import FloatingAssistant from './components/FloatingAssistant';
import FeedbackWidget from './components/FeedbackWidget';
import BackToTop from './components/BackToTop';
import './index.css';
import './styles/Themes.css';
import MissionControl from './pages/MissionControl';
import Labs from './pages/Labs';
import MyCustomTools from './pages/MyCustomTools';
import Workflows from './pages/Workflows';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function AnimatedRoutes() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const pathParts = location.pathname.split('/');
  const toolId = pathParts.length === 3 ? pathParts[2] : null;

  const getToolTheme = (id) => {
    switch (id) {
      case 'flatten-pdf': return 'theme-flatten-pdf';
      case 'html-to-pdf': return 'theme-html-pdf';
      case 'pdf-signer': return 'theme-pdf-signer';
      case 'word-counter': return 'theme-blue';
      case 'password-gen': return 'theme-green';
      case 'color-picker': return 'theme-violet';
      case 'json-formatter': return 'theme-cyber';
      case 'base64-encode': return 'theme-base64-sec';
      case 'css-generator': return 'theme-mint';
      case 'pdf-generator': return 'theme-pdf';
      case 'pdf-to-word': return 'theme-pdf-word';
      case 'images-to-pdf': return 'theme-img-pdf';
      case 'word-to-pdf': return 'theme-word-pdf';
      case 'excel-to-pdf': return 'theme-excel-pdf';
      case 'pdf-to-excel': return 'theme-pdf-excel';
      case 'pptx-to-pdf': return 'theme-pptx-pdf';
      case 'pdf-to-pptx': return 'theme-pdf-pptx';
      case 'merge-pdf': return 'theme-pdf-merge';
      case 'pdf-to-csv': return 'theme-pdf-csv';
      case 'ip-lookup': return 'theme-ip-lookup';
      case 'compare-pdf': return 'theme-compare-pdf';
      case 'split-pdf': return 'theme-pdf-split';
      case 'compress-pdf': return 'theme-compress-pdf';
      case 'rotate-pdf': return 'theme-rotate-pdf';
      case 'pdf-to-text': return 'theme-doc-blue';
      case 'rearrange-pdf': return 'theme-rearrange-pdf';
      case 'add-pages-pdf': return 'theme-add-pages-pdf';
      case 'twitter-thread': return 'theme-twitter-thread';
      case 'pdf-watermark': return 'theme-pdf-watermark';
      case 'epub-pdf-converter': return 'theme-ebook';
      case 'pdf-security': return 'theme-pdf-security';
      case 'fancy-text': return 'theme-fancy-text';
      case 'reddit-downloader': return 'theme-reddit';
      case 'youtube-banner': return 'theme-yt-banner';
      case 'fuel-prices': return 'theme-fuel';
      case 'silver-price': return 'theme-silver';
      case 'plagiarism-checker': return 'theme-plagiarism';
      case 'emi-calculator': return 'theme-emi';
      case 'lorem-ipsum': return 'theme-lorem';
      case 'bmi-calculator': return 'theme-bmi';
      case 'password-checker': return 'theme-password-checker';
      case 'world-clock': return 'theme-world-clock';
      case 'percentage-calculator': return 'theme-percentage';
      case 'age-calculator': return 'theme-age-calculator';
      case 'currency-converter': return 'theme-currency';
      case 'barcode-generator': return 'theme-barcode';
      case 'gold-price': return 'theme-gold';
      case 'emoji-mixer': return 'theme-emoji-mixer';
      case 'media-enhancer': return 'theme-enhancer';
      case 'image-to-text': return 'theme-ocr';
      case 'image-describer': return 'theme-ai';
      case 'palette-generator': return 'theme-forest';
      case 'markdown-previewer': return 'theme-markdown';
      case 'qr-generator': return 'theme-qr';
      case 'case-converter': return 'theme-sunset';
      case 'image-converter': return 'theme-pastel';
      case 'image-resizer': return 'theme-resize';
      case 'json-to-ts': return 'theme-ts-blue';
      case 'image-compressor': return 'theme-green-compress';
      case 'gif-maker': return 'theme-gif';
      case 'image-cropper': return 'theme-blue';
      case 'background-remover': return 'theme-remover';
      case 'image-rotator': return 'theme-rotate';
      case 'watermark-adder': return 'theme-watermark';
      case 'brightness-adjuster': return 'theme-brightness';
      case 'metadata-viewer': return 'theme-metadata';
      case 'scientific-calculator': return 'theme-slate-blue';
      case 'image-blur': return 'theme-blur';
      case 'uuid-generator': return 'theme-uuid';
      case 'speech-tool': return 'theme-speech';
      case 'image-sharpener': return 'theme-sharpen';
      case 'icon-converter': return 'theme-ico';
      case 'photo-collage-maker': return 'theme-collage';
      case 'pomodoro-timer': return 'theme-pomodoro';
      case 'social-resizer': return 'theme-purple-slate';
      case 'youtube-thumbnail': return 'theme-youtube';
      case 'instagram-downloader': return 'theme-insta';
      case 'twitter-downloader': return 'theme-twitter-dl';
      case 'facebook-downloader': return 'theme-facebook';
      case 'tiktok-downloader': return 'theme-tiktok';
      case 'youtube-tags-extractor': return 'theme-yt-tags';
      case 'http-headers': return 'theme-http';
      case 'image-to-jpg': return 'theme-img-jpg';
      case 'hashtag-generator': return 'theme-hashtag';
      case 'emoji-keyboard': return 'theme-emoji';
      case 'twitter-counter': return 'theme-twitter-counter';
      case 'ig-story-maker': return 'theme-ig-story';
      case 'fb-cover-resizer': return 'theme-fb-cover';
      case 'li-scheduler': return 'theme-li-scheduler';
      case 'social-post-generator': return 'theme-post-gen';
      case 'tool-comparison': return 'theme-compare';
      case 'pinterest-downloader': return 'theme-pinterest';
      case 'social-analytics': return 'theme-analytics';
      case 'youtube-downloader': return 'theme-youtube';
      case 'dailymotion-downloader': return 'theme-dailymotion';
      case 'cricket-scores': return 'theme-cricket';
      case 'api-response-viewer': return 'theme-api-viewer';
      case 'hash-generator': return 'theme-hash';
      case 'meta-tag-generator': return 'theme-meta-tag';
      case 'text-to-handwriting': return 'theme-handwriting';
      case 'fake-data-generator': return 'theme-fake-data';
      case 'wifi-qr-generator': return 'theme-wifi';
      case 'contrast-checker': return 'theme-contrast';
      case 'exif-remover': return 'theme-exif';
      case 'regex-tester': return 'theme-regex';
      case 'color-palette-extractor': return 'theme-palette-extractor';
      case 'hearing-test': return 'theme-hearing';
      case 'json-csv-converter': return 'theme-json-csv';
      case 'invoice-generator': return 'theme-invoice';
      case '2048-game': return 'theme-game';
      case 'usage-heatmap': return 'theme-heatmap';
      case 'legal-doc-generator': return 'theme-legal';
      case 'utm-builder': return 'theme-utm';
      case 'image-color-picker': return 'theme-eyedropper';
      case 'gradient-text': return 'theme-blue-gradient';
      case 'box-shadow-generator': return 'theme-green-gradient';
      case 'css-button-generator': return 'theme-pastel-pink';
      case 'glass-generator': return 'theme-lavender';
      case 'css-grid-generator': return 'theme-grid';
      case 'bezier-curve': return 'theme-bezier';
      case 'pulse-generator': return 'theme-pulse';
      default: return 'theme-navy';
    }
  };

  const currentToolTheme = getToolTheme(toolId);

  useEffect(() => {
    const isToolDetailPage = location.pathname.startsWith('/tools/');

    if (isToolDetailPage) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />

      {isLoading && <Loader />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <Layout themeClass="theme-navy">
              <Home />
            </Layout>
          } />
           <Route path="/mission-control" element={
            <Layout themeClass="theme-mission-control">
              <MissionControl />
            </Layout>
          } />
          <Route path="/tools" element={
            <Layout themeClass="theme-tools-green">
              <Tools />
            </Layout>
          } />
           <Route path="/labs" element={
            <Layout themeClass="theme-navy">
              <Labs />
            </Layout>
          } />

          <Route path="/workspace" element={
            <Layout themeClass="theme-tools-green">
              <Workspace />
            </Layout>
          } />
          <Route path="/workflows" element={
            <Layout themeClass="theme-navy">
              <Workflows />
            </Layout>
          } />
           <Route path="/my-tools" element={
            <Layout themeClass="theme-navy">
              <MyCustomTools />
            </Layout>
          } />
          <Route path="/favorites" element={
            <Layout themeClass="theme-tools-green">
              <Favorites />
            </Layout>
          } />
          <Route path="/my-downloads" element={
            <Layout themeClass="theme-downloads">
              <MyDownloads />
            </Layout>
          } />
          <Route path="/chat" element={
            <Layout themeClass="theme-chat">
              <GlobalChat />
            </Layout>
          } />
          <Route path="/auth" element={
            <Layout themeClass="theme-navy">
              <Auth />
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout themeClass="theme-navy">
              <Settings />                                                          </Layout>
          } />
          <Route path="/tools/:toolId" element={
            <Layout themeClass={currentToolTheme}>
              <ToolDetail />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout themeClass="theme-navy">
              <About />
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout themeClass="theme-navy">
              <Contact />
            </Layout>
          } />
                <Route path="/privacy-policy" element={
            <Layout themeClass="theme-navy">
              <PrivacyPolicy />
            </Layout>
          } />
          <Route path="/terms-of-service" element={
            <Layout themeClass="theme-navy">
              <TermsOfService />
            </Layout>
          } />
          <Route path="*" element={
            <Layout themeClass="theme-navy">                                          <NotFound />
            </Layout>
          } />
        </Routes>
      </AnimatePresence>
    </>
  );
}
function App() {
  return (
    <Router>
      <div className="app-container">
        <AnimatedRoutes />
        
        {/* Wrap floating buttons in theme-navy so they have colors/CSS variables */}
        <div className="theme-navy">
          <FloatingDice />
          <FloatingAssistant />
          <FeedbackWidget />
          <BackToTop />
        </div>
        
      </div>
    </Router>
  );
}

export default App;
