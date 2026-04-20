import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { getTerminalPortfolio } from './src/terminalTemplate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
    console.log(`New contact form submission from ${name} (${email}): ${message}`);
    res.json({ success: true, message: 'Message received! We will get back to you soon.' });
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
