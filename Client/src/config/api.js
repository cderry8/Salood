/**
 * Backend API base (includes `/api` prefix).
 * - Dev: defaults to `/api` so Vite can proxy to the Express server (see vite.config.js).
 * - Prod / custom: set VITE_API_URL, e.g. https://api.example.com/api
 */
const trimmed = import.meta.env.VITE_API_URL?.trim()

export const API_BASE_URL =
  (trimmed && trimmed.replace(/\/$/, '')) ||
  (import.meta.env.DEV ? '/api' : 'http://localhost:5000/api')
