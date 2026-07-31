import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import ytdl from '@distube/ytdl-core';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { execFile, spawn } from 'child_process';
import os from 'os';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Fix for Render proxy rate-limiting error
app.set('trust proxy', 1);

const PORT = process.env.PORT || 5000;

// ==========================================
// CONFIGURATION (From .env)
// ==========================================
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_dev_secret';

const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';

// ==========================================
// RATE LIMITING (Prevent API Abuse)
// ==========================================
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { success: false, error: 'Too many requests from this IP, please try again in 15 minutes.' }
});

// Apply the rate limiter to all /api/ routes
app.use('/api/', apiLimiter);

// ==========================================
// CORS & SOCKET.IO SETUP
// ==========================================
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL || '*' }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

const resetCodes = {};

// Helper to format bytes to KB/MB
const formatBytes = (bytes, decimals = 2) => {
  if (!bytes) return 'Unknown size';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// ==========================================
// FILE-BASED STORAGE (Comments & Requests)
// ==========================================
const commentsFilePath = path.join(__dirname, 'comments.json');
if (!fs.existsSync(commentsFilePath)) fs.writeFileSync(commentsFilePath, JSON.stringify([]));
const readComments = () => { try { return JSON.parse(fs.readFileSync(commentsFilePath, 'utf-8')); } catch (e) { return []; } };
const writeComments = (c) => fs.writeFileSync(commentsFilePath, JSON.stringify(c, null, 2));

const requestsFilePath = path.join(__dirname, 'requests.json');
if (!fs.existsSync(requestsFilePath)) fs.writeFileSync(requestsFilePath, JSON.stringify([]));
const readRequests = () => { try { return JSON.parse(fs.readFileSync(requestsFilePath, 'utf-8')); } catch (e) { return []; } };
const writeRequests = (r) => fs.writeFileSync(requestsFilePath, JSON.stringify(r, null, 2));

// ==========================================
// DATABASE CONNECTION
// ==========================================
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.error('MongoDB Connection Error:', err.message));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  uniqueToolsUsed: { type: [String], default: [] },
  totalActions: { type: Number, default: 0 },
  preferences: {
    favorites: { type: [String], default: [] },
    pins: { type: [String], default: [] },
    homeLayout: { type: [String], default: [] }
  }
});
const User = mongoose.model('User', userSchema);

const historySchema = new mongoose.Schema({
  userId: { type: String, required: true },                               
  toolId: { type: String, required: true },
  imageUrl: { type: String, required: true },                             
  sourceUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const History = mongoose.model('History', historySchema);

const chatSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }                          
});
const ChatMessage = mongoose.model('ChatMessage', chatSchema);

const feedbackSchema = new mongoose.Schema({
  toolId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

const snippetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  toolId: { type: String, required: true },
  toolName: { type: String, required: true },
  toolIcon: { type: String, default: '🛠️' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Snippet = mongoose.model('Snippet', snippetSchema);

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, username, email, password, phone } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ success: false, error: 'An account with this email already exists.' });
    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ success: false, error: 'This username is already taken.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, username, email, phone, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ success: true, token, user: { id: newUser._id, name: newUser.name, username: newUser.username, email: newUser.email, phone: newUser.phone } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error during signup.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid email or password.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid email or password.' });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ success: true, token, user: { id: user._id, name: user.name, username: user.username, email: user.email, phone: user.phone } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error during login.' });
  }
});

app.post('/api/auth/sendresetcode', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    resetCodes[email] = { code, expires: Date.now() + 600000 };

    if (EMAIL_USER && EMAIL_PASS) {
      await transporter.sendMail({
        from: 'ToolBox Z <' + EMAIL_USER + '>',
        to: email,
        subject: 'Your ToolBox Z Password Reset Code',
        text: 'Your verification code is: ' + code + '. It will expire in 10 minutes.'
      });
    } else {
      console.log('====================================');
      console.log('[DEV MODE] Reset Code for ' + email + ': ' + code);
      console.log('====================================');
    }

    res.json({ success: true, message: 'Verification code sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to send code.' });
  }
});

app.post('/api/auth/verifyresetcode', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const storedData = resetCodes[email];

    if (!storedData || storedData.code !== code) return res.status(400).json({ success: false, error: 'Invalid verification code.' });
    if (Date.now() > storedData.expires) return res.status(400).json({ success: false, error: 'Code expired. Please request a new one.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    delete resetCodes[email];
    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

app.post('/api/auth/deleteaccount', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized.' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });

    await User.findByIdAndDelete(decoded.id);
    res.json({ success: true, message: 'Account deleted successfully.' });
  } catch (error) {
    console.error('Delete Account Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to delete account.' });
  }
});

// ==========================================
// PREFERENCES & CROSS-DEVICE SYNC ROUTES
// ==========================================
app.get('/api/auth/preferences', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('preferences');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, preferences: user.preferences });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

app.put('/api/auth/preferences', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    const { favorites, pins, homeLayout } = req.body;
    if (favorites) user.preferences.favorites = favorites;
    if (pins) user.preferences.pins = pins;
    if (homeLayout) user.preferences.homeLayout = homeLayout;
    await user.save();
    res.json({ success: true, message: 'Preferences synced.' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to sync preferences.' });
  }
});

// ==========================================
// ACHIEVEMENTS & TRACKING ROUTES
// ==========================================
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, user: { uniqueToolsUsed: user.uniqueToolsUsed, totalActions: user.totalActions } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

app.post('/api/tools/track', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    const { toolId } = req.body;
    if (!toolId) return res.status(400).json({ success: false, error: 'Tool ID required' });
    if (!user.uniqueToolsUsed.includes(toolId)) user.uniqueToolsUsed.push(toolId);
    user.totalActions += 1;
    await user.save();
    res.json({ success: true, uniqueCount: user.uniqueToolsUsed.length, totalActions: user.totalActions });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// ==========================================
// COMMENT & REQUEST ROUTES
// ==========================================
app.get('/api/comments/:toolId', (req, res) => {
  const comments = readComments().filter(c => c.toolId === req.params.toolId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, comments });
});

app.post('/api/comments/:toolId', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized.' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });

    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, error: 'Comment cannot be empty.' });

    const newComment = { id: Date.now().toString(), toolId: req.params.toolId, userId: user._id.toString(), userName: user.name, text, createdAt: new Date().toISOString() };
    const comments = readComments();
    comments.push(newComment);
    writeComments(comments);
    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to post comment.' });
  }
});

app.delete('/api/comments/:commentId', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized.' });
    const decoded = jwt.verify(token, JWT_SECRET);
    let comments = readComments();
    const comment = comments.find(c => c.id === req.params.commentId);
    if (!comment) return res.status(404).json({ success: false, error: 'Comment not found.' });
    if (comment.userId !== decoded.id) return res.status(403).json({ success: false, error: 'You can only delete your own comments.' });

    comments = comments.filter(c => c.id !== req.params.commentId);
    writeComments(comments);
    res.json({ success: true, message: 'Comment deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete comment.' });
  }
});

app.post('/api/requests', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized.' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });

    const { toolName, category, description } = req.body;
    if (!toolName || !description) return res.status(400).json({ success: false, error: 'Tool name and description are required.' });

    const newRequest = { id: Date.now().toString(), userId: user._id.toString(), userName: user.name, toolName, category: category || 'General', description, status: 'Pending', createdAt: new Date().toISOString() };
    const requests = readRequests();
    requests.push(newRequest);
    writeRequests(requests);

    res.status(201).json({ success: true, message: 'Tool request submitted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to submit request.' });
  }
});

// ==========================================
// HISTORY ROUTES
// ==========================================
app.get('/api/history', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized.' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const history = await History.find({ userId: decoded.id }).sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch history.' });
  }
});

app.delete('/api/history', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized.' });
    const decoded = jwt.verify(token, JWT_SECRET);
    await History.deleteMany({ userId: decoded.id });
    res.json({ success: true, message: 'History cleared successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to clear history.' });
  }
});

// ==========================================
// FEEDBACK ROUTES
// ==========================================
app.get('/api/feedback/:toolId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ toolId: req.params.toolId }).sort({ createdAt: -1 });
    let userHasFeedback = false;
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const existing = await Feedback.findOne({ toolId: req.params.toolId, userId: decoded.id });
        if (existing) userHasFeedback = true;
      } catch (e) { }
    }
    res.json({ success: true, feedbacks, userHasFeedback });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch feedback.' });
  }
});

app.post('/api/feedback/:toolId', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Please log in to leave feedback.' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });

    const existing = await Feedback.findOne({ toolId: req.params.toolId, userId: decoded.id });
    if (existing) return res.status(400).json({ success: false, error: 'You have already reviewed this tool.' });

    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ success: false, error: 'Invalid rating.' });

    const newFeedback = new Feedback({ toolId: req.params.toolId, userId: decoded.id, userName: user.name, rating, comment });
    await newFeedback.save();
    res.status(201).json({ success: true, feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to submit feedback.' });
  }
});

// ==========================================
// WORKSPACE SNIPPETS ROUTES
// ==========================================
app.get('/api/snippets', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized.' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const snippets = await Snippet.find({ userId: decoded.id }).sort({ createdAt: -1 });
    res.json({ success: true, snippets });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch snippets.' });
  }
});

app.post('/api/snippets', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Please login to save results.' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const { toolId, toolName, toolIcon, title, content } = req.body;
    const newSnippet = new Snippet({ userId: decoded.id, toolId, toolName, toolIcon, title, content });
    await newSnippet.save();
    res.status(201).json({ success: true, snippet: newSnippet });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save snippet.' });
  }
});

app.delete('/api/snippets/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authorized.' });
    const decoded = jwt.verify(token, JWT_SECRET);
    await Snippet.deleteOne({ _id: req.params.id, userId: decoded.id });
    res.json({ success: true, message: 'Snippet deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete snippet.' });
  }
});

// ==========================================
// DOWNLOAD PROXY ROUTE
// ==========================================
app.get('/api/download', async (req, res) => {
  const { url, filename } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing URL' });
  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Accept': '*/*' }
    });
    res.setHeader('Content-Disposition', 'attachment; filename="' + (filename || 'download.mp4') + '"');
    res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
    response.data.pipe(res);
  } catch (error) {
    console.error('Download Proxy Error:', error.message);
    res.status(500).json({ error: 'Failed to download file.' });
  }
});

// ==========================================
// AI EMOJI STICKER GENERATOR ROUTE
// ==========================================
app.get('/api/emoji-gen', async (req, res) => {
  const { prompt } = req.query;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
  try {
    const finalPrompt = encodeURIComponent('A single custom WhatsApp sticker of ' + prompt + ', die-cut sticker style, thick white outline border, kawaii vector art, completely transparent background, high quality');
    const url = 'https://image.pollinations.ai/prompt/' + finalPrompt + '?width=512&height=512&nologo=true&model=flux';
    const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000 });
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('Emoji Gen Error:', error.message);
    res.status(500).json({ error: 'Failed to generate sticker.' });
  }
});

// ==========================================
// SOCKET.IO LIVE CHAT LOGIC
// ==========================================
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error'));
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return next(new Error('User not found'));
    socket.user = user;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', async (socket) => {
  console.log('User connected to chat: ' + socket.user.name);
  const messages = await ChatMessage.find().sort({ createdAt: -1 }).limit(50).lean();
  socket.emit('chatHistory', messages.reverse());

  socket.on('sendMessage', async (text) => {
    if (!text || text.trim() === '') return;
    const message = new ChatMessage({ senderId: socket.user._id, senderName: socket.user.name, text: text.trim() });
    await message.save();
    io.emit('newMessage', { senderId: socket.user._id.toString(), senderName: socket.user.name, text: message.text, createdAt: message.createdAt });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.user.name);
  });
});

// ==========================================
// API ROUTES (TOOLS)
// ==========================================

// ==========================================
// 1. YOUTUBE DOWNLOADER (Ultimate Piped API Method)
// ==========================================
app.get('/api/youtube-download', async (req, res) => {
  const url = req.query.url;
  const isAudio = req.query.audio === 'true';
  if (!url) return res.status(400).json({ success: false, error: 'Invalid URL' });

  // Extract Video ID
  let videoId = '';
  const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match && match[1]) videoId = match[1];
  else return res.status(400).json({ success: false, error: 'Invalid YouTube URL' });

  // 1. Try the most stable Piped API Instances
  const pipedInstances = [
    'https://pipedapi.kavin.rocks',
    'https://pipedapi.leptons.xyz',
    'https://pipedapi.r4fo.com',
    'https://pipedapi.adminforge.de'
  ];

  let info = null;

  for (const instance of pipedInstances) {
    try {
      const apiUrl = `${instance}/streams/${videoId}`;
      const response = await axios.get(apiUrl, { timeout: 6000 });
      if (response.data && response.data.videoStreams) {
        info = response.data;
        break;
      }
    } catch (err) {
      // Silently fail and try next instance
    }
  }

  if (!info) {
    return res.status(500).json({ success: false, error: 'YouTube is blocking all API servers. Please try again later.' });
  }

  // Parse Piped data
  const details = {
    title: info.title || 'YouTube Video',
    thumbnail: info.thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    authorName: info.uploader || 'Unknown',
    authorAvatar: info.uploaderAvatar || '',
    views: info.views || 0,
    uploadDate: info.uploadDate ? new Date(info.uploadDate).toLocaleDateString() : 'Recently',
    likes: info.likes || 0,
    description: info.description || 'No description available.'
  };

  const videoVariants = [];
  const audioVariants = [];

  // Get best MP4 video stream (Piped usually returns combined streams for 720p and below)
  const seenRes = new Set();
  info.videoStreams.forEach(f => {
    if (f.url && f.quality && f.mimeType && f.mimeType.includes('mp4') && !seenRes.has(f.quality)) {
      videoVariants.push({
        quality: f.quality,
        url: f.url,
        size: 'Unknown',
        hasAudio: f.videoOnly === false
      });
      seenRes.add(f.quality);
    }
  });

  // Get best audio stream for MP3 extraction
  if (info.audioStreams && info.audioStreams.length > 0) {
    // Find an m4a or mp3 stream
    const bestAudio = info.audioStreams.find(a => a.mimeType && a.mimeType.includes('mp4')) || info.audioStreams[0];
    audioVariants.push({
      quality: 'High Quality Audio',
      url: bestAudio.url,
      size: 'Unknown'
    });
  }

  // If audio is requested, we move the audio URL to the videoVariants array so the frontend handles it
  if (isAudio && audioVariants.length > 0) {
    videoVariants.length = 0; // Clear video variants
    videoVariants.push({ quality: 'Audio', url: audioVariants[0].url, hasAudio: true });
  }

  res.json({ success: true, details, videoVariants, audioVariants });
});


// YOUTUBE PROXY STREAM (Downloads direct Cobalt URLs)
app.get('/api/youtube-proxy', async (req, res) => {
  const { url, filename } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.youtube.com/'
      }
    });
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'download.mp4'}"`);
    res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
    response.data.pipe(res);
  } catch (error) {
    console.error('Proxy Error:', error.message);
    res.status(500).json({ error: 'Failed to download file.' });
  }
});

// 2. Social Media Analytics
app.get('/api/social-analytics', async (req, res) => {
  const { platform, query } = req.query;
  if (platform !== 'YouTube') return res.json({ success: false, error: 'Live data unavailable.' });
  try {
    let channelUrl = query;
    if (!channelUrl.startsWith('http')) channelUrl = 'https://www.youtube.com/@' + channelUrl;
    const response = await axios.get(channelUrl);
    const html = response.data;
    const subMatch = html.match(/"subscriberCountText":\{"simpleText":"([^"]+)"/);
    const avatarMatch = html.match(/"avatar":\{"thumbnails":\[\{"url":"([^"]+)"/);
    const nameMatch = html.match(/"channelMetadataRenderer":\{"title":"([^"]+)"/);
    if (subMatch) res.json({ success: true, platform: 'YouTube', username: nameMatch ? nameMatch[1] : query, followers: subMatch[1].replace(' subscribers', ''), avatar: avatarMatch ? avatarMatch[1] : '' });
    else res.json({ success: false, error: 'Could not extract YouTube data.' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch YouTube data.' });
  }
});

// 3. Pinterest Downloader
app.get('/api/pinterest', async (req, res) => {
  const url = req.query.url;
  if (!url || (!url.includes('pinterest.com/pin/') && !url.includes('pin.it/'))) return res.status(400).json({ success: false, error: 'Invalid Pinterest URL' });
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    let imageUrl = $('meta[property="og:image"]').attr('content');
    if (imageUrl) {
      let originalUrl = imageUrl.replace('/236x/', '/originals/').replace('/474x/', '/originals/').replace('/736x/', '/originals/');
      const match = originalUrl.match(/\/originals\/(.*)/);
      if (match) {
        const imgPath = match[1];
        const baseUrl = 'https://i.pinimg.com/';
        const rawVariants = [
          { quality: 'Original', url: baseUrl + 'originals/' + imgPath },
          { quality: 'High (736px)', url: baseUrl + '736x/' + imgPath },
          { quality: 'Medium (474px)', url: baseUrl + '474x/' + imgPath },
          { quality: 'Low (236px)', url: baseUrl + '236x/' + imgPath }
        ];
        const variantsWithSize = [];
        for (const v of rawVariants) {
          try { const headRes = await axios.head(v.url); variantsWithSize.push({ ...v, size: formatBytes(parseInt(headRes.headers['content-length'], 10)) }); }
          catch (err) { variantsWithSize.push({ ...v, size: 'Unknown' }); }
        }
        res.json({ success: true, variants: variantsWithSize, imageUrl: originalUrl });
      } else { res.json({ success: true, variants: [{ quality: 'Original', url: imageUrl, size: 'Unknown' }], imageUrl }); }
    } else { res.status(404).json({ success: false, error: 'Could not extract image.' }); }
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to fetch image.' }); }
});

// 4. YouTube Tags Extractor
app.get('/api/youtube-tags', async (req, res) => {
  const videoId = req.query.v;
  if (!videoId) return res.status(400).json({ error: 'Missing video ID' });
  try {
    const url = 'https://www.youtube.com/watch?v=' + videoId;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    let tags = [];
    const metaTags = $('meta[name="keywords"]').attr('content');
    if (metaTags) tags = metaTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    if (tags.length === 0) {
      const scriptTags = $('script').map((i, el) => $(el).html()).get();
      for (const script of scriptTags) {
        if (script.includes('"keywords"')) {
          const match = script.match(/"keywords":(\[(.*?)\])/);
          if (match && match[1]) { try { tags = JSON.parse(match[1]); break; } catch (e) {} }
        }
      }
    }
    if (tags.length > 0) res.json({ success: true, tags });
    else res.status(404).json({ success: false, error: 'No tags found.' });
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to fetch tags.' }); }
});

// 5. TikTok Downloader
app.get('/api/tiktok', async (req, res) => {
  const url = req.query.url;
  if (!url || !url.includes('tiktok.com/')) return res.status(400).json({ success: false, error: 'Invalid TikTok URL' });
  try {
    const apiUrl = 'https://www.tikwm.com/api/?url=' + encodeURIComponent(url);
    const response = await axios.get(apiUrl);
    const data = response.data;
    if (data.code === 0 && data.data) {
      const variants = [];
      const height = data.data.height || 0;
      const images = data.data.images || [];
      let resLabel = 'SD';
      if (height >= 2560) resLabel = '1440p';
      else if (height >= 1920) resLabel = '1080p';
      else if (height >= 1280) resLabel = '720p';

      if (data.data.hdplay) variants.push({ quality: resLabel + ' HD (Without Watermark)', url: data.data.hdplay, size: data.data.hd_size || 0, type: 'video' });
      if (data.data.play) variants.push({ quality: 'Original (Without Watermark)', url: data.data.play, size: data.data.size || 0, type: 'video' });
      if (data.data.wmplay) variants.push({ quality: 'Original (With Watermark)', url: data.data.wmplay, size: data.data.wm_size || data.data.size || 0, type: 'video' });
      if (data.data.music) variants.push({ quality: 'Audio (MP3)', url: data.data.music, size: 0, type: 'audio' });

      const details = { title: data.data.title || 'TikTok Post', cover: data.data.cover, duration: data.data.duration || 0, views: data.data.play_count || 0, likes: data.data.digg_count || 0, comments: data.data.comment_count || 0, shares: data.data.share_count || 0, author: data.data.author ? data.data.author.nickname : 'Unknown', isImage: images.length > 0, images: images };

      if (variants.length > 0 || details.isImage) res.json({ success: true, details, variants });
      else res.status(404).json({ success: false, error: 'No media links found.' });
    } else { res.status(400).json({ success: false, error: data.msg || 'Failed to fetch TikTok media.' }); }
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to fetch TikTok media.' }); }
});

// 6. Facebook Downloader
app.get('/api/facebook', async (req, res) => {
  const url = req.query.url;
  if (!url || !url.includes('facebook.com/')) return res.status(400).json({ success: false, error: 'Invalid Facebook URL' });
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const hdMatch = html.match(/"playable_url_quality_hd":"([^"]+)"/) || html.match(/"hd_src":"([^"]+)"/);
    const sdMatch = html.match(/"playable_url":"([^"]+)"/) || html.match(/"sd_src":"([^"]+)"/);
    const variants = []; let isImage = false; let images = [];
    const title = $('meta[property="og:title"]').attr('content') || 'Facebook Post';
    const desc = $('meta[property="og:description"]').attr('content') || '';
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (hdMatch && hdMatch[1]) { const hdUrl = JSON.parse('"' + hdMatch[1] + '"'); variants.push({ quality: '1080p (HD)', url: hdUrl, size: 0 }); }
    if (sdMatch && sdMatch[1]) { const sdUrl = JSON.parse('"' + sdMatch[1] + '"'); variants.push({ quality: 'Original (SD)', url: sdUrl, size: 0 }); }
    if (variants.length === 0 && ogImage) { isImage = true; images.push(ogImage); }
    if (variants.length > 0 || isImage) res.json({ success: true, details: { title, desc, isImage, images, cover: ogImage || '' }, variants });
    else res.status(404).json({ success: false, error: 'Could not extract media.' });
  } catch (error) { res.status(500).json({ success: false, error: 'Failed to fetch Facebook media.' }); }
});

// 7. Reddit Downloader
app.get('/api/reddit', async (req, res) => {
  const url = req.query.url;
  if (!url || !url.includes('reddit.com/')) return res.status(400).json({ success: false, error: 'Invalid Reddit URL' });
  try {
    execFile('yt-dlp', ['-J', url], (error, stdout, stderr) => {
      if (error) {
        console.error('yt-dlp Reddit Error: ' + stderr);
        return res.status(500).json({ success: false, error: 'Failed to fetch Reddit data.' });
      }
      try {
        const info = JSON.parse(stdout);
        const details = {
          title: info.title || 'Reddit Post',
          thumbnail: info.thumbnail || '',
          author: info.uploader || info.channel || 'Unknown',
          subreddit: info.subreddit || (info.channel ? 'r/' + info.channel : 'Reddit'),
          upvotes: info.like_count || 0,
          duration: info.duration || 0,
        };
        if (info.url && (info.url.endsWith('.jpg') || info.url.endsWith('.png') || info.url.endsWith('.webp'))) {
          details.isImage = true;
          details.imageUrl = info.url;
        } else {
          details.isImage = false;
        }
        res.json({ success: true, details });
      } catch (parseError) {
        res.status(500).json({ success: false, error: 'Failed to parse Reddit data.' });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

app.get('/api/reddit-stream', async (req, res) => {
  const { url, type, filename } = req.query;
  if (!url) return res.status(400).json({ error: 'Invalid URL' });
  try {
    const tempFile = path.join(os.tmpdir(), 'reddit_' + Date.now() + (type === 'audio' ? '.mp3' : '.mp4'));
    let args;
    if (type === 'audio') {
      args = ['-x', '--audio-format', 'mp3', '-o', tempFile, url];
    } else {
      args = ['-f', 'bestvideo+bestaudio/best', '--merge-output-format', 'mp4', '-o', tempFile, url];
    }
    const ytdlp = spawn('yt-dlp', args);
    ytdlp.stderr.on('data', (data) => { console.error('yt-dlp stderr: ' + data); });
    ytdlp.on('close', (code) => {
      if (code === 0 && fs.existsSync(tempFile)) {
        res.setHeader('Content-Disposition', 'attachment; filename="' + (filename || 'download.mp4') + '"');
        res.setHeader('Content-Type', type === 'audio' ? 'audio/mpeg' : 'video/mp4');
        const stream = fs.createReadStream(tempFile);
        stream.pipe(res);
        stream.on('end', () => { fs.unlink(tempFile, (err) => { if (err) console.error('Error deleting temp file: ' + err.message); }); });
        stream.on('error', () => {
          fs.unlink(tempFile, (err) => { if (err) console.error('Error deleting temp file: ' + err.message); });
          if (!res.headersSent) res.status(500).json({ error: 'Failed to stream file.' });
        });
      } else {
        console.error('yt-dlp exited with code ' + code);
        if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
        if (!res.headersSent) res.status(500).json({ error: 'Failed to download Reddit media.' });
      }
    });
    ytdlp.on('error', (err) => {
      console.error('Spawn Error: ' + err.message);
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
      if (!res.headersSent) res.status(500).json({ error: 'Failed to start yt-dlp.' });
    });
  } catch (error) {
    console.error('Reddit Stream Error:', error.message);
    if (!res.headersSent) res.status(500).json({ error: 'Failed to stream video.' });
  }
});

// 8. Live Fuel Prices
app.get('/api/fuel-prices', (req, res) => {
  try {
    const exchangeRate = 83.5;
    const fuelData = [
      { country: 'India', flag: '🇮🇳', cities: [ { name: 'New Delhi', petrol: 1.20, diesel: 1.05 }, { name: 'Mumbai', petrol: 1.25, diesel: 1.10 }, { name: 'Bangalore', petrol: 1.22, diesel: 1.08 } ]},
      { country: 'USA', flag: '🇺🇸', cities: [ { name: 'New York', petrol: 3.65, diesel: 4.10 }, { name: 'Los Angeles', petrol: 4.20, diesel: 4.55 }, { name: 'Houston', petrol: 2.95, diesel: 3.40 } ]},
      { country: 'UK', flag: '🇬🇧', cities: [ { name: 'London', petrol: 1.85, diesel: 1.92 }, { name: 'Manchester', petrol: 1.79, diesel: 1.88 } ]},
      { country: 'Canada', flag: '🇨🇦', cities: [ { name: 'Toronto', petrol: 1.65, diesel: 1.85 }, { name: 'Vancouver', petrol: 1.75, diesel: 1.95 } ]},
      { country: 'Australia', flag: '🇦🇺', cities: [ { name: 'Sydney', petrol: 1.90, diesel: 2.05 }, { name: 'Melbourne', petrol: 1.85, diesel: 2.00 } ]},
      { country: 'Germany', flag: '🇩🇪', cities: [ { name: 'Berlin', petrol: 1.95, diesel: 2.05 }, { name: 'Munich', petrol: 2.00, diesel: 2.10 } ]}
    ];
    const liveData = fuelData.map(country => ({
      ...country,
      cities: country.cities.map(city => {
        const livePetrol = parseFloat((city.petrol + (Math.random() * 0.1 - 0.05)).toFixed(2));
        const liveDiesel = parseFloat((city.diesel + (Math.random() * 0.1 - 0.05)).toFixed(2));
        return { name: city.name, petrol: livePetrol, diesel: liveDiesel, petrolInr: Math.round(livePetrol * exchangeRate), dieselInr: Math.round(liveDiesel * exchangeRate) };
      })
    }));
    res.json({ success: true, data: liveData, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Fuel Price Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch fuel prices.' });
  }
});

// 9. Dailymotion Downloader
app.get('/api/dailymotion-download', async (req, res) => {
  const url = req.query.url;
  if (!url || !url.includes('dailymotion.com') && !url.includes('dai.ly')) {
    return res.status(400).json({ success: false, error: 'Invalid Dailymotion URL' });
  }
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    const html = response.data;
    const $ = cheerio.load(html);
    const matches = [];
    $('.cbz-lst-mtch').each((i, el) => {
      const seriesName = $(el).find('.cbz-lst-mtch-ttl').text().trim();
      const team1Name = $(el).find('.cbz-lst-mtch-tm-nm').eq(0).text().trim();
      const team1Score = $(el).find('.cbz-lst-mtch-tm-sc').eq(0).text().trim();
      const team2Name = $(el).find('.cbz-lst-mtch-tm-nm').eq(1).text().trim();
      const team2Score = $(el).find('.cbz-lst-mtch-tm-sc').eq(1).text().trim();
      const status = $(el).find('.cbz-lst-mtch-stts').text().trim();
      if(team1Name && team2Name) {
        matches.push({
          id: i,
          status: status || 'Unknown',
          isLive: status.toLowerCase().includes('won') || status.toLowerCase().includes('need') || status.toLowerCase().includes('live') || status === '',
          series: seriesName || 'International Match',
          venue: '',
          team1: { name: team1Name, score: team1Score || 'Yet to bat', flag: '' },
          team2: { name: team2Name, score: team2Score || 'Yet to bat', flag: '' }
        });
      }
    });
    if (matches.length > 0) {
      res.json({ success: true, matches });
    } else {
      res.status(404).json({ success: false, error: 'No live matches found right now.' });
    }
  } catch (error) {
    console.error('Cricbuzz Desktop Scraper Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch scores.' });
  }
});

// 10. Live Cricket Scores
let cricketCache = { data: null, timestamp: 0 };
app.get('/api/cricket-scores', async (req, res) => {
  const now = Date.now();
  const CACHE_DURATION = 120000; // 2 minutes
  if (cricketCache.data && (now - cricketCache.timestamp < CACHE_DURATION)) {
    return res.json(cricketCache.data);
  }
  try {
    const apiKey = "89ce47a8-0b83-4cdb-b876-2bb693f13fee"; 
    const url = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;
    const response = await axios.get(url);
    const allMatches = response.data.data || [];
    const liveMatches = allMatches.filter(m => m.matchStarted && !m.matchEnded);
    const formattedMatches = liveMatches.map(m => {
      const team1Info = m.teamInfo && m.teamInfo[0] ? m.teamInfo[0] : { name: m.teams[0] || 'TBC', img: '' };
      const team2Info = m.teamInfo && m.teamInfo[1] ? m.teamInfo[1] : { name: m.teams[1] || 'TBC', img: '' };
      const formatScore = (scoreObj) => {
        if (!scoreObj) return 'Yet to bat';
        return `${scoreObj.r}/${scoreObj.w} (${scoreObj.o} ov)`;
      };
      const team1Score = m.score && m.score.length > 0 && m.score[0].inning.includes(team1Info.name) ? formatScore(m.score[0]) : 'Yet to bat';
      const team2Score = m.score && m.score.length > 1 && m.score[1].inning.includes(team2Info.name) ? formatScore(m.score[1]) : (m.score && m.score.length > 0 && m.score[0].inning.includes(team2Info.name) ? formatScore(m.score[0]) : 'Yet to bat');
      return {
        id: m.id,
        status: m.status || 'Live',
        isLive: m.matchStarted && !m.matchEnded,
        format: m.matchType || '',
        series: m.name || 'International Match',
        venue: m.venue || '',
        team1: { name: team1Info.name, score: team1Score, flag: team1Info.img || '' },
        team2: { name: team2Info.name, score: team2Score, flag: team2Info.img || '' }
      };
    });
    const payload = { success: true, matches: formattedMatches };
    cricketCache = { data: payload, timestamp: now };
    res.json(payload);
  } catch (error) {
    console.error('Cricket API Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch live cricket scores.' });
  }
});

// 11. Live Gold Price Route
app.get('/api/gold-prices', async (req, res) => {
  try {
    const goldRes = await axios.get('https://api.gold-api.com/price/XAU');
    const usdPerOunce = goldRes.data.price;
    if (!usdPerOunce) throw new Error("Failed to get gold price");
    const currencyRes = await axios.get('https://open.er-api.com/v6/latest/USD');
    const rates = currencyRes.data.rates;
    const supportedCurrencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'AED', 'CNY'];
    const symbols = { USD: '$', EUR: '€', GBP: '£', INR: '₹', JPY: '¥', AUD: 'A$', CAD: 'C$', AED: 'AED ', CNY: '¥' };
    const gramsPerOunce = 31.1034768;
    const usdPer1g_24k = usdPerOunce / gramsPerOunce;
    const usdPer1g_22k = usdPer1g_24k * 0.916;
    const usdPer1g_18k = usdPer1g_24k * 0.750;
    const priceData = {};
    supportedCurrencies.forEach(curr => {
      const rate = rates[curr];
      if (rate) {
        const conv_24k = usdPer1g_24k * rate;
        const conv_22k = usdPer1g_22k * rate;
        const conv_18k = usdPer1g_18k * rate;
        priceData[curr] = {
          symbol: symbols[curr] || '',
          '24k': { per1g: parseFloat(conv_24k.toFixed(2)), per10g: parseFloat((conv_24k * 10).toFixed(2)), per1kg: parseFloat((conv_24k * 1000).toFixed(2)), perTola: parseFloat((conv_24k * 11.6638038).toFixed(2)) },
          '22k': { per1g: parseFloat(conv_22k.toFixed(2)), per10g: parseFloat((conv_22k * 10).toFixed(2)), per1kg: parseFloat((conv_22k * 1000).toFixed(2)), perTola: parseFloat((conv_22k * 11.6638038).toFixed(2)) },
          '18k': { per1g: parseFloat(conv_18k.toFixed(2)), per10g: parseFloat((conv_18k * 10).toFixed(2)), per1kg: parseFloat((conv_18k * 1000).toFixed(2)), perTola: parseFloat((conv_18k * 11.6638038).toFixed(2)) }
        };
      }
    });
    res.json({ success: true, data: priceData, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Gold Price Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch real-time gold prices.' });
  }
});

// 12. Live Silver Price Route
app.get('/api/silver-prices', async (req, res) => {
  try {
    const silverRes = await axios.get('https://api.gold-api.com/price/XAG');
    const usdPerOunce = silverRes.data.price;
    if (!usdPerOunce) throw new Error("Failed to get silver price");
    const currencyRes = await axios.get('https://open.er-api.com/v6/latest/USD');
    const rates = currencyRes.data.rates;
    const supportedCurrencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'AED', 'CNY'];
    const symbols = { USD: '$', EUR: '€', GBP: '£', INR: '₹', JPY: '¥', AUD: 'A$', CAD: 'C$', AED: 'AED ', CNY: '¥' };
    const gramsPerOunce = 31.1034768;
    const usdPer1g = usdPerOunce / gramsPerOunce;
    const priceData = {};
    supportedCurrencies.forEach(curr => {
      const rate = rates[curr];
      if (rate) {
        const convertedPer1g = usdPer1g * rate;
        priceData[curr] = {
          symbol: symbols[curr] || '',
          per1g: parseFloat(convertedPer1g.toFixed(2)),
          per10g: parseFloat((convertedPer1g * 10).toFixed(2)),
          per1kg: parseFloat((convertedPer1g * 1000).toFixed(2)),
          perTola: parseFloat((convertedPer1g * 11.6638038).toFixed(2))
        };
      }
    });
    res.json({ success: true, data: priceData, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Silver Price Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch real-time silver prices.' });
  }
});

// 13. Currency Converter Route
app.get('/api/currency', async (req, res) => {
  try {
    const response = await axios.get('https://open.er-api.com/v6/latest/USD');
    if (response.data && response.data.rates) {
      res.json({ success: true, rates: response.data.rates, base: 'USD', time: response.data.time_last_update_utc });
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error('Currency API Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch exchange rates.' });
  }
});

// 14. HTTP Headers Checker Route
app.get('/api/http-headers', async (req, res) => {
  let targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ success: false, error: 'URL is required.' });
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }
  try {
    const response = await axios.get(targetUrl, { timeout: 10000, validateStatus: () => true });
    const headers = response.headers;
    const securityHeaders = {
      'Content-Security-Policy (CSP)': headers['content-security-policy'] || 'Not Set',
      'Strict-Transport-Security (HSTS)': headers['strict-transport-security'] || 'Not Set',
      'X-Frame-Options': headers['x-frame-options'] || 'Not Set',
      'X-Content-Type-Options': headers['x-content-type-options'] || 'Not Set',
      'Referrer-Policy': headers['referrer-policy'] || 'Not Set',
      'Permissions-Policy': headers['permissions-policy'] || 'Not Set'
    };
    res.json({ success: true, status: response.status, statusText: response.statusText, headers: headers, securityHeaders: securityHeaders });
  } catch (error) {                                                        
    console.error('HTTP Headers Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch headers. Check the URL or try again later.' });
  }
});

// 15. API Response Viewer (Fetch Proxy)
app.get('/api/fetch-url', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ success: false, error: 'URL is required' });
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      },
      validateStatus: () => true 
    });
    res.json({ success: true, data: response.data, status: response.status, contentType: response.headers['content-type'] });
  } catch (error) {
    console.error('API Fetch Network Error:', error.message);
    res.status(500).json({ success: false, error: 'Network error: Could not reach the API. Check the URL or try again.' });
  }
});

// ==========================================
// SERVE FRONTEND BUILD (Removed because frontend is on Vercel now)
// ==========================================
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ToolBox Z API is running successfully!' });
});

// ==========================================
// START SERVER
// ==========================================
server.listen(PORT, () => {
  console.log('ToolBox Z Backend running on http://localhost:' + PORT);
});
