<div align="center">

# @simosphere/sdk

**Official TypeScript SDK for the SIMOSphere AI platform -- European AI orchestration, hosted in Germany.**

[![npm](https://img.shields.io/npm/v/@simosphere/sdk)](https://www.npmjs.com/package/@simosphere/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[English](#english) | [Deutsch](#deutsch)

</div>

---

## English

### Overview

`@simosphere/sdk` is the official TypeScript SDK for [SIMOSphere AI](https://simosphereai.com) -- the European AI orchestration gateway by [SIMO GmbH](https://simo-online.com). It provides a type-safe, ergonomic interface for chat completions, model listing, and health monitoring through a single, OpenAI-compatible API.

All inference runs on EU-hosted infrastructure with full GDPR compliance.

### Installation

```bash
npm install @simosphere/sdk
```

### Quick Start

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

### Configuration

| Option      | Type     | Default                          | Description                       |
| ----------- | -------- | -------------------------------- | --------------------------------- |
| `apiKey`    | `string` | --                               | API key from app.simosphereai.com |
| `baseUrl`   | `string` | `https://api.simosphereai.com`   | Gateway base URL                  |
| `timeoutMs` | `number` | `30000`                          | Request timeout in milliseconds   |

### Convenience Helpers

```typescript
import { createChat, listModels } from '@simosphere/sdk';

// Functional style
const chat = createChat({ apiKey: '...' });
const res = await chat({ messages: [{ role: 'user', content: 'Hi' }] });

const models = await listModels({ apiKey: '...' });
```

### Error Handling

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

### Links

- **Platform:** [simosphereai.com](https://simosphereai.com)
- **API Documentation:** [simosphereai.com/de/developers](https://simosphereai.com/de/developers)
- **OpenAPI Spec:** [simosphereai.com/openapi.json](https://simosphereai.com/openapi.json)
- **MCP Server:** [mcp.simosphereai.com](https://mcp.simosphereai.com)
- **Status:** [simosphereai.com/api/status](https://simosphereai.com/api/status)

---

## Deutsch

### Ueberblick

`@simosphere/sdk` ist das offizielle TypeScript SDK fuer [SIMOSphere AI](https://simosphereai.com) -- das europaeische KI-Orchestrierungs-Gateway von [SIMO GmbH](https://simo-online.com). Es bietet eine typsichere, komfortable Schnittstelle fuer Chat-Completions, Modellabfragen und Health-Monitoring ueber eine einheitliche, OpenAI-kompatible API.

Saemtliche Inferenz laeuft auf EU-Infrastruktur mit vollstaendiger DSGVO-Konformitaet.

### Installation

```bash
npm install @simosphere/sdk
```

### Schnelleinstieg

```typescript
import { SIMOSphereClient } from '@simosphere/sdk';

const client = new SIMOSphereClient({
  apiKey: process.env.SIMOSPHERE_API_KEY!,
});

// Chat-Completion (OpenAI-kompatibel)
const response = await client.chat({
  messages: [{ role: 'user', content: 'Hallo von SIMOSphere!' }],
});
console.log(response.choices[0].message.content);

// Verfuegbare Modelle auflisten
const models = await client.models();
console.log(models.data.map((m) => m.id));

// Health-Check (keine Authentifizierung noetig)
const health = await client.health();
console.log(health.status);
```

### Konfiguration

| Option      | Typ      | Standard                         | Beschreibung                         |
| ----------- | -------- | -------------------------------- | ------------------------------------ |
| `apiKey`    | `string` | --                               | API-Schluessel von app.simosphereai.com |
| `baseUrl`   | `string` | `https://api.simosphereai.com`   | Basis-URL des Gateways               |
| `timeoutMs` | `number` | `30000`                          | Anfrage-Timeout in Millisekunden     |

### Funktionale Hilfsfunktionen

```typescript
import { createChat, listModels } from '@simosphere/sdk';

// Funktionaler Stil
const chat = createChat({ apiKey: '...' });
const res = await chat({ messages: [{ role: 'user', content: 'Hi' }] });

const models = await listModels({ apiKey: '...' });
```

### Fehlerbehandlung

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

### Weitergehende Informationen

- **Plattform:** [simosphereai.com](https://simosphereai.com)
- **API-Dokumentation:** [simosphereai.com/de/developers](https://simosphereai.com/de/developers)
- **OpenAPI-Spezifikation:** [simosphereai.com/openapi.json](https://simosphereai.com/openapi.json)
- **MCP-Server:** [mcp.simosphereai.com](https://mcp.simosphereai.com)
- **Status:** [simosphereai.com/api/status](https://simosphereai.com/api/status)

---

## License / Lizenz

MIT -- Engineered at SIMO GmbH · Aschaffenburg, Germany
