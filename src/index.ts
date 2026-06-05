// ---------------------------------------------------------------------------
// @simosphere/sdk — Official SIMOSphere AI SDK
// European AI orchestration platform
// ---------------------------------------------------------------------------

// Core client
export { SIMOSphereClient } from './client';

// Convenience helpers
export { createChat } from './chat';
export { listModels } from './models';

// Types (re-export everything so consumers can import from the top level)
export type {
  ClientOptions,
  ChatMessage,
  ChatCompletionParams,
  ChatCompletionChoice,
  ChatCompletionUsage,
  ChatCompletionResponse,
  ModelEntry,
  ModelsResponse,
  HealthResponse,
} from './types';

export { SIMOSphereError } from './types';
