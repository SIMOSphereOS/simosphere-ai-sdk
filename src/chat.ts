// ---------------------------------------------------------------------------
// SIMOSphere AI SDK — Chat completions convenience helpers
// ---------------------------------------------------------------------------

import { SIMOSphereClient } from './client';
import type { ChatCompletionParams, ChatCompletionResponse } from './types';

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
export function createChat(clientOrOpts: SIMOSphereClient | { apiKey: string; baseUrl?: string }) {
  const client =
    clientOrOpts instanceof SIMOSphereClient
      ? clientOrOpts
      : new SIMOSphereClient(clientOrOpts);

  return async (params: ChatCompletionParams): Promise<ChatCompletionResponse> => {
    return client.chat(params);
  };
}
