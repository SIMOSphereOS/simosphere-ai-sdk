# AGENTS.md -- SIMOSphere AI

Instructions for AI coding agents working with the SIMOSphere AI platform.

## API Access
- Base URL: https://api.simosphereai.com
- Auth: Bearer token (API key from https://app.simosphereai.com)
- OpenAPI Spec: https://simosphereai.com/openapi.json

## SDK
- npm: `npm install @simosphere/sdk`
- Import: `import { SIMOSphereClient } from '@simosphere/sdk'`

## MCP Server
- URL: https://mcp.simosphereai.com
- Transport: Streamable HTTP
- Auth: Bearer token

## Quick Start
```typescript
import { SIMOSphereClient } from '@simosphere/sdk';

const client = new SIMOSphereClient({ apiKey: process.env.SIMOSPHERE_API_KEY! });
const response = await client.chat({
  messages: [{ role: 'user', content: 'Summarize this document' }],
});
console.log(response.choices[0].message.content);
```

## CLI
```bash
npm install -g @simosphere/cli
export SIMOSPHERE_API_KEY="sk-..."

simosphere health              # Gateway health check
simosphere models              # List available models
simosphere chat "Hello"        # Chat completion
simosphere ask "What is X?"    # NLWeb query
```

## Resources
- Docs: https://simosphereai.com/de/developers
- llms.txt: https://simosphereai.com/llms.txt
- Status: https://simosphereai.com/api/status
