import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import {
  fetchLivePreplyReviews,
  PREPLY_TUTOR_ID,
  type PreplyReviewsResponse,
} from './src/utils/preplyReviews.ts';
import { handler as sendEmailHandler } from './netlify/functions/send-email.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const CACHE_TTL_MS = 15 * 60 * 1000;

let cachedPreply: { data: PreplyReviewsResponse; expiresAt: number } | null = null;

async function startServer() {
  const app = express();
  app.use(express.json());

  const handlePreplyReviews = async (req: express.Request, res: express.Response) => {
    try {
      const tutorId =
        typeof req.query.tutorId === 'string' && /^\d+$/.test(req.query.tutorId)
          ? req.query.tutorId
          : PREPLY_TUTOR_ID;
      const forceRefresh = req.query.refresh === '1';

      if (
        !forceRefresh &&
        tutorId === PREPLY_TUTOR_ID &&
        cachedPreply &&
        Date.now() < cachedPreply.expiresAt
      ) {
        res.setHeader('Cache-Control', 'public, max-age=300');
        return res.json(cachedPreply.data);
      }

      const data = await fetchLivePreplyReviews(tutorId);
      if (tutorId === PREPLY_TUTOR_ID) {
        cachedPreply = { data, expiresAt: Date.now() + CACHE_TTL_MS };
      }

      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.json(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch Preply reviews';
      console.error('[server] /api/preply-reviews error:', message);
      if (cachedPreply) {
        return res.json(cachedPreply.data);
      }
      return res.status(502).json({ error: message });
    }
  };

  app.get('/api/preply-reviews', handlePreplyReviews);
  app.get('/.netlify/functions/preply-reviews', handlePreplyReviews);

  const handleSendEmail = async (req: express.Request, res: express.Response) => {
    const result = await sendEmailHandler({
      httpMethod: req.method,
      body: JSON.stringify(req.body ?? {}),
    });
    res.status(result.statusCode);
    for (const [k, v] of Object.entries(result.headers)) {
      res.setHeader(k, v);
    }
    return res.send(result.body);
  };

  app.post('/api/send-email', handleSendEmail);
  app.post('/.netlify/functions/send-email', handleSendEmail);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`spanishconmeli server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
