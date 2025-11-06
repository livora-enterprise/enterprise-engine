@echo off
REM Livora Enterprise Engine - Setup Script (Windows)
REM Run this script to set up the development environment

setlocal enabledelayedexpansion

echo.
echo 🚀 Livora Enterprise Engine - Setup Script
echo ===========================================
echo.

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Node.js not found
    echo Install Node.js v20+ from https://nodejs.org/
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ !NODE_VERSION!

REM Check npm
echo Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ✗ npm not found
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ !NPM_VERSION!

REM Check Docker
echo Checking Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Docker not found
    echo Install Docker from https://docker.com/
    exit /b 1
)
for /f "tokens=*" %%i in ('docker --version') do set DOCKER_VERSION=%%i
echo ✓ !DOCKER_VERSION!

REM Check Docker Compose
echo Checking Docker Compose...
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Docker Compose not found
    exit /b 1
)
for /f "tokens=*" %%i in ('docker-compose --version') do set COMPOSE_VERSION=%%i
echo ✓ !COMPOSE_VERSION!

echo.
echo Installing dependencies...
call npm install --workspaces

echo.
echo Building workspaces...
call npm run build --workspaces

echo.
echo ✓ Setup complete!
echo.
echo Next steps:
echo   1. Start services:         docker-compose up
echo   2. Backend ^(new terminal^): npm run dev -w @livora/backend
echo   3. Frontend ^(new terminal^): npm run dev -w @livora/frontend
echo.
echo Then visit:
echo   - Backend:  http://localhost:3000/health
echo   - Frontend: http://localhost:5173
echo.