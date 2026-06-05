// ---------------------------------------------------------------------------
// SIMOSphere AI SDK — TypeScript type definitions
// ---------------------------------------------------------------------------

/** Options passed to the SIMOSphereClient constructor. */
export interface ClientOptions {
  /** API key obtained from https://app.simosphereai.com */
  apiKey: string;
  /** Base URL of the SIMOSphere AI gateway. Defaults to production. */
  baseUrl?: string;
  /** Request timeout in milliseconds. Defaults to 30 000. */
  timeoutMs?: number;
}

// -- Chat Completions -------------------------------------------------------

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionParams {
  /** Model identifier. Pass `"auto"` to let the router decide. */
  model?: string;
  /** Conversation messages. */
  messages: ChatMessage[];
  /** Sampling temperature (0-2). */
  temperature?: number;
  /** Maximum tokens to generate. */
  max_tokens?: number;
  /** Whether to stream the response. Currently unsupported in the SDK. */
  stream?: boolean;
}

export interface ChatCompletionChoice {
  index: number;
  message: ChatMessage;
  finish_reason: string;
}

export interface ChatCompletionUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface ChatCompletionResponse {
  id: string;
  object: 'chat.completion';
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage: ChatCompletionUsage;
}

// -- Models -----------------------------------------------------------------

export interface ModelEntry {
  id: string;
  object: 'model';
  owned_by: string;
  created?: number;
}

export interface ModelsResponse {
  object: 'list';
  data: ModelEntry[];
}

// -- Health -----------------------------------------------------------------

export interface HealthResponse {
  status: string;
  version?: string;
  uptime?: number;
}

// -- Errors -----------------------------------------------------------------

export class SIMOSphereError extends Error {
  public readonly status: number;
  public readonly code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = 'SIMOSphereError';
    this.status = status;
    this.code = code;
  }
}
