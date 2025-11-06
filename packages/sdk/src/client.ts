import axios, { AxiosInstance } from 'axios';
import { v4 as uuidv4 } from 'uuid';

export interface LivoraEvent {
  type: string;
  entityId: string;
  data: Record<string, any>;
  timestamp?: number;
  customerId?: string;
}

export interface LivoraConfig {
  apiKey: string;
  baseURL: string;
  timeout?: number;
  retries?: number;
  environment?: 'dev' | 'staging' | 'production';
}

export class LivoraClient {
  private httpClient: AxiosInstance;
  private apiKey: string;
  private baseURL: string;
  private eventBuffer: LivoraEvent[] = [];
  private bufferSize: number = 100;
  private flushInterval: NodeJS.Timer | null = null;

  constructor(config: LivoraConfig) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL;

    this.httpClient = axios.create({
      baseURL: this.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'livora-sdk/0.1.0',
      },
    });

    // Start auto-flush timer
    this.flushInterval = setInterval(() => this.flush(), 5000);
  }

  /**
   * Track an event
   */
  public track(event: LivoraEvent): void {
    const enrichedEvent = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      requestId: uuidv4(),
    };

    this.eventBuffer.push(enrichedEvent);

    // Flush if buffer reaches threshold
    if (this.eventBuffer.length >= this.bufferSize) {
      this.flush();
    }
  }

  /**
   * Track multiple events
   */
  public trackBatch(events: LivoraEvent[]): void {
    events.forEach((event) => this.track(event));
  }

  /**
   * Flush buffered events
   */
  public async flush(): Promise<void> {
    if (this.eventBuffer.length === 0) {
      return;
    }

    const eventsToSend = [...this.eventBuffer];
    this.eventBuffer = [];

    try {
      await this.httpClient.post('/api/v1/events/ingest', {
        events: eventsToSend,
        apiKey: this.apiKey,
      });

      console.log(`✅ Flushed ${eventsToSend.length} events to Livora`);
    } catch (error) {
      console.error('❌ Failed to flush events:', error);
      // Re-add events to buffer for retry
      this.eventBuffer = [...eventsToSend, ...this.eventBuffer];
    }
  }

  /**
   * Shutdown client
   */
  public async shutdown(): Promise<void> {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    await this.flush();
  }

  /**
   * Health check
   */
  public async healthCheck(): Promise<boolean> {
    try {
      const response = await this.httpClient.get('/health');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

export default LivoraClient;