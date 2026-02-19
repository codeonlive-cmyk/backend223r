#!/bin/bash

echo "========================================"
echo "VLE Backend Setup Script"
echo "========================================"
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "[OK] .env file already exists"
else
    echo "[SETUP] Creating .env file from .env.example..."
    cp .env.example .env
    echo "[OK] .env file created successfully"
    echo ""
    echo "IMPORTANT: The .env file contains AWS RDS credentials."
    echo "You can use it as-is to connect to the shared database."
fi

echo ""
echo "[SETUP] Installing dependencies..."
npm install

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Start the backend: npm run dev"
echo "2. The backend will connect to AWS RDS automatically"
echo ""
echo "If you see connection errors:"
echo "- Check your internet connection"
echo "- Verify .env file exists"
echo "- Make sure credentials match .env.example"
echo ""
