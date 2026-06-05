// ---------------------------------------------------------------------------
// SIMOSphere AI SDK — HTTP client
// ---------------------------------------------------------------------------

import type {
  ClientOptions,
  ChatCompletionParams,
  ChatCompletionResponse,
  ModelsResponse,
  HealthResponse,
} from './types';
import { SIMOSphereError } from './types';

const DEFAULT_BASE_URL = 'https://api.simosphereai.com';
const DEFAULT_TIMEOUT_MS = 30_000;

/**
 * Low-level HTTP client for the SIMOSphere AI gateway.
 *
 * Handles authentication, timeouts, and error mapping so that
 * higher-level modules (`chat`, `models`) can stay thin.
 */
export class SIMOSphereClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(options: ClientOptions) {
    if (!options.apiKey) {
      throw new SIMOSphereError(
        'apiKey is required — obtain one at https://app.simosphereai.com',
        0,
        'MISSING_API_KEY',
      );
    }
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  }

  // -- Public API -----------------------------------------------------------

  /** Create a chat completion (OpenAI-compatible `/v1/chat/completions`). */
  async chat(params: ChatCompletionParams): Promise<ChatCompletionResponse> {
    return this.post<ChatCompletionResponse>('/v1/chat/completions', {
      model: params.model ?? 'auto',
      messages: params.messages,
      ...(params.temperature !== undefined && { temperature: params.temperature }),
      ...(params.max_tokens !== undefined && { max_tokens: params.max_tokens }),
    });
  }

  /** List available models (`/v1/models`). */
  async models(): Promise<ModelsResponse> {
    return this.get<ModelsResponse>('/v1/models');
  }

  /** Gateway health check (`/health`). No authentication required. */
  async health(): Promise<HealthResponse> {
    return this.get<HealthResponse>('/health', false);
  }

  // -- Internal helpers -----------------------------------------------------

  private async get<T>(path: string, auth = true): Promise<T> {
    return this.request<T>('GET', path, undefined, auth);
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>('POST', path, body, true);
  }

  private async request<T>(
    method: string,
    path: string,
    body: unknown | undefined,
    auth: boolean,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };
    if (auth) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    if (body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        let code = 'API_ERROR';
        let message = text;
        try {
          const parsed = JSON.parse(text);
          code = parsed.code ?? code;
          message = parsed.error ?? parsed.message ?? message;
        } catch {
          // plain text error — keep as-is
        }
        throw new SIMOSphereError(message, res.status, code);
      }

      return (await res.json()) as T;
    } catch (err) {
      if (err instanceof SIMOSphereError) throw err;
      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new SIMOSphereError(
          `Request to ${path} timed out after ${this.timeoutMs}ms`,
          0,
          'TIMEOUT',
        );
      }
      throw new SIMOSphereError(
        `Network error: ${(err as Error).message}`,
        0,
        'NETWORK_ERROR',
      );
    } finally {
      clearTimeout(timer);
    }
  }
}
