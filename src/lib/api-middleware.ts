import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, TokenPayload } from './jwt';

// Simple in-memory rate limiter
const requestMap = new Map<string, { count: number; resetTime: number }>();

export async function withRateLimit(request: NextRequest, handler: Function) {
  try {
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const ONE_MINUTE = 60 * 1000;
    const MAX_REQUESTS = 30;

    // Get or create rate limit entry
    let entry = requestMap.get(clientIp);
    
    if (!entry || now > entry.resetTime) {
      entry = { count: 0, resetTime: now + ONE_MINUTE };
      requestMap.set(clientIp, entry);
    }

    // Check if exceeded limit
    if (entry.count >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // Increment counter
    entry.count++;

    return await handler(request);
  } catch (error) {
    console.error('Rate limit error:', error);
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
}

export async function withAuth(request: NextRequest, handler: Function) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Pass user info to handler
    (request as any).user = payload;
    return await handler(request);
  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

export function withValidation(schema: any, handler: Function) {
  return async (request: NextRequest) => {
    try {
      const body = await request.json();
      const validated = schema.parse(body);
      return await handler(request, validated);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.errors?.[0]?.message || 'Validation failed' },
        { status: 400 }
      );
    }
  };
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000); // Limit length
}

export function createErrorResponse(error: any, status: number = 500) {
  console.error('API Error:', error);
  return NextResponse.json(
    {
      error: process.env.NODE_ENV === 'production' 
        ? 'An error occurred' 
        : error.message
    },
    { status }
  );
}
