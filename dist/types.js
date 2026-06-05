"use strict";
// ---------------------------------------------------------------------------
// SIMOSphere AI SDK — TypeScript type definitions
// ---------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIMOSphereError = void 0;
// -- Errors -----------------------------------------------------------------
class SIMOSphereError extends Error {
    status;
    code;
    constructor(message, status, code) {
        super(message);
        this.name = 'SIMOSphereError';
        this.status = status;
        this.code = code;
    }
}
exports.SIMOSphereError = SIMOSphereError;
//# sourceMappingURL=types.js.map