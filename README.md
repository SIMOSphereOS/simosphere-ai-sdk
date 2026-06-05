# @simosphere/sdk

Official TypeScript SDK for the **SIMOSphere AI** platform -- the European AI orchestration gateway by SIMO GmbH.

## Installation

```bash
npm install @simosphere/sdk
```

## Quick start

```typescript
import { SIMOSphereClient } from '@simosphere/sdk';

const client = new SIMOSphereClient({
  apiKey: process.env.SIMOSPHERE_API_KEY!,
});

// Chat completion (OpenAI-compatible)
const response = await client.chat({
  messages: [{ role: 'user', content: 'Hello from SIMOSphere!' }],
});
console.log(response.choices[0].message.content);

// List available models
const models = await client.models();
console.log(models.data.map((m) => m.id));

// Health check (no auth required)
const health = await client.health();
console.log(health.status);
```

## Configuration

| Option      | Type     | Default                             | Description                      |
| ----------- | -------- | ----------------------------------- | -------------------------------- |
| `apiKey`    | `string` | --                                  | API key from app.simosphereai.com |
| `baseUrl`   | `string` | `https://api.simosphereai.com`      | Gateway base URL                 |
| `timeoutMs` | `number` | `30000`                             | Request timeout in milliseconds  |

## Convenience helpers

```typescript
import { createChat, listModels } from '@simosphere/sdk';

// Functional style
const chat = createChat({ apiKey: '...' });
const res = await chat({ messages: [{ role: 'user', content: 'Hi' }] });

const models = await listModels({ apiKey: '...' });
```

## Error handling

```typescript
import { SIMOSphereClient, SIMOSphereError } from '@simosphere/sdk';

try {
  const res = await client.chat({ messages: [{ role: 'user', content: 'Test' }] });
} catch (err) {
  if (err instanceof SIMOSphereError) {
    console.error(`[${err.code}] ${err.message} (HTTP ${err.status})`);
  }
}
```

## Links

- Platform: https://simosphereai.com
- API docs: https://simosphereai.com/de/developers
- OpenAPI spec: https://simosphereai.com/openapi.json
- MCP server: https://mcp.simosphereai.com
- Status: https://simosphereai.com/api/status

## License

MIT -- SIMO GmbH, Aschaffenburg, Germany
