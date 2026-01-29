#!/bin/bash
# Railway build verification script

echo "Node version:"
node --version

echo ""
echo "NPM version:"
npm --version

echo ""
echo "Environment variables check:"
if [ -z "$RESEND_API_KEY" ]; then
  echo "❌ RESEND_API_KEY is missing"
else
  echo "✅ RESEND_API_KEY is set"
fi

if [ -z "$MONGODB_URI" ]; then
  echo "❌ MONGODB_URI is missing"
else
  echo "✅ MONGODB_URI is set"
fi

if [ -z "$JWT_SECRET" ]; then
  echo "❌ JWT_SECRET is missing"
else
  echo "✅ JWT_SECRET is set"
fi

echo ""
echo "Building Next.js application..."
npm run build
