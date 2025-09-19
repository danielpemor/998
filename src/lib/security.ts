// src/lib/security.ts
import { z } from 'zod';

// Rate limiting usando Upstash Redis (gratuito para Netlify)
export class RateLimiter {
  private static instances = new Map<string, RateLimiter>();
  
  constructor(
    private readonly limit: number,
    private readonly window: number // en segundos
  ) {}

  static getInstance(key: string, limit: number, window: number): RateLimiter {
    const instanceKey = `${key}-${limit}-${window}`;
    if (!this.instances.has(instanceKey)) {
      this.instances.set(instanceKey, new RateLimiter(limit, window));
    }
    return this.instances.get(instanceKey)!;
  }

  async check(identifier: string): Promise<boolean> {
    // Implementar con Redis o memoria local para desarrollo
    return true; // Simplified for now
  }
}

// Validación de inputs
export const productSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive().max(10),
  size: z.string().optional(),
  color: z.string().optional(),
});

export const checkoutSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/),
  address: z.object({
    street: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    zip: z.string().min(4),
    country: z.string().length(2),
  }),
});

// Sanitización HTML
export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// CSRF Token
export function generateCSRFToken(): string {
  return crypto.randomUUID();
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken;
}