import { SIMOSphereClient } from './client';
import type { ModelsResponse } from './types';
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
export declare function listModels(clientOrOpts: SIMOSphereClient | {
    apiKey: string;
    baseUrl?: string;
}): Promise<ModelsResponse>;
//# sourceMappingURL=models.d.ts.map