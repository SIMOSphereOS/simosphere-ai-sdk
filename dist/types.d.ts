/** Options passed to the SIMOSphereClient constructor. */
export interface ClientOptions {
    /** API key obtained from https://app.simosphereai.com */
    apiKey: string;
    /** Base URL of the SIMOSphere AI gateway. Defaults to production. */
    baseUrl?: string;
    /** Request timeout in milliseconds. Defaults to 30 000. */
    timeoutMs?: number;
}
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
export interface HealthResponse {
    status: string;
    version?: string;
    uptime?: number;
}
export declare class SIMOSphereError extends Error {
    readonly status: number;
    readonly code: string;
    constructor(message: string, status: number, code: string);
}
//# sourceMappingURL=types.d.ts.map