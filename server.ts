import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { getTerminalPortfolio } from './src/terminalTemplate.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Middlewares
  app.use(helmet({
    contentSecurityPolicy: false // Disabled for Vite HMR and inline styles in dev
  }));
  app.use(cors());
  app.use(express.json({ limit: '10kb' })); // Limit body size to prevent payload DOS

  // Rate Limiting to prevent brute-force and API abuse
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  const chatLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 chat messages per minute to prevent AI API abuse
    message: 'You are sending messages too fast. Please slow down.',
  });

  // Apply rate limiter to API routes
  app.use('/api/', apiLimiter);

  // Terminal/SSH detection middleware for curl
  app.use((req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    if (userAgent.toLowerCase().includes('curl') || req.query.cli === 'true') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.send(getTerminalPortfolio());
    }
    next();
  });

  // API Routes
  app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Basic Input Validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    
    // Sanitization: Escape basic HTML to prevent XSS if this was rendered elsewhere
    const sanitize = (str: string) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    console.log(`New contact form submission from ${sanitize(name)} (${sanitize(email)}): ${sanitize(message)}`);
    res.json({ success: true, message: 'Message received! We will get back to you soon.' });
  });

  // Secure Backend Chat Endpoint (Moves Gemini API key off the client)
  app.post('/api/chat', chatLimiter, async (req, res) => {
    try {
      const { history, input, systemInstruction } = req.body;

      if (!input || typeof input !== 'string') {
        return res.status(400).json({ error: "Invalid input" });
      }

      if (!process.env.GEMINI_API_KEY) {
        console.error("Missing GEMINI_API_KEY environment variable.");
        return res.status(500).json({ error: "AI service is currently unavailable. Please try again later." });
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...(history || []),
          { role: 'user', parts: [{ text: input.substring(0, 500) }] } // Cap input length
        ],
        config: { systemInstruction }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Backend Gemini Error:", error);
      res.status(500).json({ error: "I encountered a connection issue. Please allow me a moment to recover." });
    }
  });

  let vite: any;
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom', // Use custom to handle index.html ourselves
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
  }

  // Handle all other requests by serving index.html
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template: string;
      if (process.env.NODE_ENV !== 'production') {
        // Read index.html from root
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        // Apply Vite HTML transforms
        template = await vite.transformIndexHtml(url, template);
      } else {
        // Read index.html from dist
        template = fs.readFileSync(path.resolve(__dirname, 'dist', 'index.html'), 'utf-8');
      }
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
