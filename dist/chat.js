"use strict";
// ---------------------------------------------------------------------------
// SIMOSphere AI SDK — Chat completions convenience helpers
// ---------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChat = createChat;
const client_1 = require("./client");
/**
 * Thin convenience wrapper that delegates to `SIMOSphereClient.chat()`.
 *
 * Use this when you want a standalone function instead of a method call:
 *
 * ```ts
 * import { createChat } from '@simosphere/sdk';
 *
 * const chat = createChat({ apiKey: process.env.SIMOSPHERE_API_KEY! });
 * const res  = await chat({ messages: [{ role: 'user', content: 'Hello' }] });
 * ```
 */
function createChat(clientOrOpts) {
    const client = clientOrOpts instanceof client_1.SIMOSphereClient
        ? clientOrOpts
        : new client_1.SIMOSphereClient(clientOrOpts);
    return async (params) => {
        return client.chat(params);
    };
}
//# sourceMappingURL=chat.js.map