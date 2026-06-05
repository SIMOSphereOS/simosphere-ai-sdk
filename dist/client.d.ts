import type { ClientOptions, ChatCompletionParams, ChatCompletionResponse, ModelsResponse, HealthResponse } from './types';
/**
 * Low-level HTTP client for the SIMOSphere AI gateway.
 *
 * Handles authentication, timeouts, and error mapping so that
 * higher-level modules (`chat`, `models`) can stay thin.
 */
export declare class SIMOSphereClient {
    private readonly apiKey;
    private readonly baseUrl;
    private readonly timeoutMs;
    constructor(options: ClientOptions);
    /** Create a chat completion (OpenAI-compatible `/v1/chat/completions`). */
    chat(params: ChatCompletionParams): Promise<ChatCompletionResponse>;
    /** List available models (`/v1/models`). */
    models(): Promise<ModelsResponse>;
    /** Gateway health check (`/health`). No authentication required. */
    health(): Promise<HealthResponse>;
    private get;
    private post;
    private request;
}
//# sourceMappingURL=client.d.ts.map