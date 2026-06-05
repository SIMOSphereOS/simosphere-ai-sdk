"use strict";
// ---------------------------------------------------------------------------
// SIMOSphere AI SDK — Model listing convenience helpers
// ---------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.listModels = listModels;
const client_1 = require("./client");
/**
 * Standalone function to list available models.
 *
 * ```ts
 * import { listModels } from '@simosphere/sdk';
 *
 * const models = await listModels({ apiKey: process.env.SIMOSPHERE_API_KEY! });
 * console.log(models.data.map(m => m.id));
 * ```
 */
async function listModels(clientOrOpts) {
    const client = clientOrOpts instanceof client_1.SIMOSphereClient
        ? clientOrOpts
        : new client_1.SIMOSphereClient(clientOrOpts);
    return client.models();
}
//# sourceMappingURL=models.js.map