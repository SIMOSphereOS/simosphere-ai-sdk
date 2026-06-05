"use strict";
// ---------------------------------------------------------------------------
// @simosphere/sdk — Official SIMOSphere AI SDK
// European AI orchestration platform
// ---------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIMOSphereError = exports.listModels = exports.createChat = exports.SIMOSphereClient = void 0;
// Core client
var client_1 = require("./client");
Object.defineProperty(exports, "SIMOSphereClient", { enumerable: true, get: function () { return client_1.SIMOSphereClient; } });
// Convenience helpers
var chat_1 = require("./chat");
Object.defineProperty(exports, "createChat", { enumerable: true, get: function () { return chat_1.createChat; } });
var models_1 = require("./models");
Object.defineProperty(exports, "listModels", { enumerable: true, get: function () { return models_1.listModels; } });
var types_1 = require("./types");
Object.defineProperty(exports, "SIMOSphereError", { enumerable: true, get: function () { return types_1.SIMOSphereError; } });
//# sourceMappingURL=index.js.map