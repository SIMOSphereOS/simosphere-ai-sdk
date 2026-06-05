"use strict";
// ---------------------------------------------------------------------------
// SIMOSphere AI SDK — HTTP client
// ---------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIMOSphereClient = void 0;
const types_1 = require("./types");
const DEFAULT_BASE_URL = 'https://api.simosphereai.com';
const DEFAULT_TIMEOUT_MS = 30_000;
/**
 * Low-level HTTP client for the SIMOSphere AI gateway.
 *
 * Handles authentication, timeouts, and error mapping so that
 * higher-level modules (`chat`, `models`) can stay thin.
 */
class SIMOSphereClient {
    apiKey;
    baseUrl;
    timeoutMs;
    constructor(options) {
        if (!options.apiKey) {
            throw new types_1.SIMOSphereError('apiKey is required — obtain one at https://app.simosphereai.com', 0, 'MISSING_API_KEY');
        }
        this.apiKey = options.apiKey;
        this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
        this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    }
    // -- Public API -----------------------------------------------------------
    /** Create a chat completion (OpenAI-compatible `/v1/chat/completions`). */
    async chat(params) {
        return this.post('/v1/chat/completions', {
            model: params.model ?? 'auto',
            messages: params.messages,
            ...(params.temperature !== undefined && { temperature: params.temperature }),
            ...(params.max_tokens !== undefined && { max_tokens: params.max_tokens }),
        });
    }
    /** List available models (`/v1/models`). */
    async models() {
        return this.get('/v1/models');
    }
    /** Gateway health check (`/health`). No authentication required. */
    async health() {
        return this.get('/health', false);
    }
    // -- Internal helpers -----------------------------------------------------
    async get(path, auth = true) {
        return this.request('GET', path, undefined, auth);
    }
    async post(path, body) {
        return this.request('POST', path, body, true);
    }
    async request(method, path, body, auth) {
        const url = `${this.baseUrl}${path}`;
        const headers = {
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
                }
                catch {
                    // plain text error — keep as-is
                }
                throw new types_1.SIMOSphereError(message, res.status, code);
            }
            return (await res.json());
        }
        catch (err) {
            if (err instanceof types_1.SIMOSphereError)
                throw err;
            if (err instanceof DOMException && err.name === 'AbortError') {
                throw new types_1.SIMOSphereError(`Request to ${path} timed out after ${this.timeoutMs}ms`, 0, 'TIMEOUT');
            }
            throw new types_1.SIMOSphereError(`Network error: ${err.message}`, 0, 'NETWORK_ERROR');
        }
        finally {
            clearTimeout(timer);
        }
    }
}
exports.SIMOSphereClient = SIMOSphereClient;
//# sourceMappingURL=client.js.map