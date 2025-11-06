#!/bin/bash

# Livora Enterprise Engine - Setup Script
# Run this script to set up the development environment

set -e

echo "🚀 Livora Enterprise Engine - Setup Script"
echo "==========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js... "
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found${NC}"
    echo "Install Node.js v20+ from https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✓${NC} $NODE_VERSION"

# Check npm
echo -n "Checking npm... "
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓${NC} $NPM_VERSION"

# Check Docker
echo -n "Checking Docker... "
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker not found${NC}"
    echo "Install Docker from https://docker.com/"
    exit 1
fi
DOCKER_VERSION=$(docker --version)
echo -e "${GREEN}✓${NC} $DOCKER_VERSION"

# Check Docker Compose
echo -n "Checking Docker Compose... "
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗ Docker Compose not found${NC}"
    exit 1
fi
COMPOSE_VERSION=$(docker-compose --version)
echo -e "${GREEN}✓${NC} $COMPOSE_VERSION"

echo ""
echo "Installing dependencies..."
npm install --workspaces

echo ""
echo "Building workspaces..."
npm run build --workspaces

echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Start services:       docker-compose up"
echo "  2. Backend (new terminal): npm run dev -w @livora/backend"
echo "  3. Frontend (new terminal): npm run dev -w @livora/frontend"
echo ""
echo "Then visit:"
echo "  - Backend:  http://localhost:3000/health"
echo "  - Frontend: http://localhost:5173"
echo ""