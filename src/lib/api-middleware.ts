import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, TokenPayload } from './jwt';
import { RateLimiter } from 'next-rate-limit';

// Rate limiter configuration
const limiter = new RateLimiter({
  interval: 60 * 1000, // 1 minute
  maxRequests: 30, // 30 requests per minute
});

export async function withRateLimit(request: NextRequest, handler: Function) {
  try {
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    // Rate limiting would be applied here (simplified for demo)
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
