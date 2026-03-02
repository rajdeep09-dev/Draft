#!/bin/bash

# Build Verification Script for Draft Next.js Project
# This script verifies the project is ready for deployment

set -e

echo "======================================"
echo "Draft Next.js Build Verification"
echo "======================================"
echo ""

# Check Node.js version
echo "1. Checking Node.js version..."
node --version
npm --version
echo ""

# Check dependencies
echo "2. Installing dependencies..."
npm install
echo ""

# Run TypeScript check
echo "3. Checking TypeScript..."
npx tsc --noEmit
echo ""

# Run ESLint
echo "4. Running ESLint..."
npm run lint
echo ""

# Build project
echo "5. Building Next.js project..."
npm run build
echo ""

# Verify build output
echo "6. Verifying build output..."
if [ -d ".next" ]; then
    echo "✓ .next directory created successfully"
    if [ -d ".next/static" ]; then
        echo "✓ Static files compiled"
    fi
else
    echo "✗ Build failed - .next directory not found"
    exit 1
fi
echo ""

# List generated files
echo "7. Build artifacts:"
du -sh .next/
echo ""

echo "======================================"
echo "Build verification complete!"
echo "======================================"
echo ""
echo "Project is ready for deployment."
echo "Next steps:"
echo "  1. Deploy to Vercel: vercel deploy"
echo "  2. Or push to GitHub for automatic deployment"
echo ""
