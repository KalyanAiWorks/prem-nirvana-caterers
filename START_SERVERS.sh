#!/bin/bash

# Start servers script for Foodtales Site
# This starts both the Vite dev server and Express upload server

echo "🚀 Starting Foodtales Site Servers..."
echo ""

# Create menu-images directory if it doesn't exist
mkdir -p public/menu-images
mkdir -p data

echo "📦 Installing dependencies if needed..."
npm install

echo ""
echo "==============================================="
echo "🎨 Starting Vite Dev Server (Port 5174)..."
echo "==============================================="
echo "Frontend URL: http://localhost:5174"
echo "Admin URL:   http://localhost:5174/admin"
echo ""

# Start Vite in the background
npm run dev &
VITE_PID=$!

# Wait a moment for Vite to start
sleep 2

echo "==============================================="
echo "🔧 Starting Express Upload Server (Port 3001)..."
echo "==============================================="
echo "API URL: http://localhost:3001"
echo ""

# Start Express server
node server.js &
EXPRESS_PID=$!

echo ""
echo "==============================================="
echo "✅ Both servers are running!"
echo "==============================================="
echo ""
echo "Vite Server PID: $VITE_PID"
echo "Express Server PID: $EXPRESS_PID"
echo ""
echo "To stop the servers, press Ctrl+C or run:"
echo "  kill $VITE_PID $EXPRESS_PID"
echo ""

# Wait for both processes
wait
