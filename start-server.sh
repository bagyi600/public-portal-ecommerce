#!/bin/bash
echo "Starting Public Portal E-commerce Platform..."
echo "=============================================="

# Kill any existing Next.js processes
pkill -f "next" 2>/dev/null
pkill -f "node.*dev" 2>/dev/null
sleep 2

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start Next.js development server
echo "Starting Next.js development server..."
echo "Server will be available at:"
echo "- IPv4: http://187.77.136.251:3000"
echo "- IPv6: http://[2a02:4780:5e:48de::1]:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start server
HOST=0.0.0.0 PORT=3000 npm run dev
