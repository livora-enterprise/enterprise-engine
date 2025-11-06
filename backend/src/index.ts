import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
    phase: 'phase-0',
  });
});

// API Status
app.get('/api/status', (req, res) => {
  res.json({
    service: 'Livora Enterprise Engine Backend',
    status: 'initializing',
    requestId: uuidv4(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Event Ingestion Endpoint (Placeholder for Phase 1)
app.post('/api/v1/events/ingest', (req, res) => {
  const { events, apiKey } = req.body;

  if (!apiKey) {
    return res.status(401).json({ error: 'Missing API Key' });
  }

  if (!Array.isArray(events) || events.length === 0) {
    return res.status(400).json({ error: 'Invalid events payload' });
  }

  // TODO: Implement event validation and Kinesis stream writing in Phase 1
  res.json({
    success: true,
    eventCount: events.length,
    requestId: uuidv4(),
    message: 'Events queued for processing (Phase 1)',
  });
});

// Error Handler
app.use(
  (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      requestId: uuidv4(),
      timestamp: new Date().toISOString(),
    });
  }
);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Livora Backend initialized on port ${PORT}`);
  console.log(`📍 Phase: 0 (Foundation)`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

export default app;