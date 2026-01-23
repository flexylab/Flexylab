import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './jwt';

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 1000);
}

export function createErrorResponse(error: any, status: number = 500) {
  console.error('API Error:', error);
  return NextResponse.json(
    {
      error: process.env.NODE_ENV === 'production' 
        ? 'An error occurred' 
        : error.message || 'Unknown error'
    },
    { status }
  );
}
