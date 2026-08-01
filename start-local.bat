@echo off
echo ===================================================
echo 🚀 Kernel Overriders - Start Local Development Server
echo ===================================================
echo.

if not exist node_modules (
    echo Installing dependencies for root monorepo...
    npm install
)

if not exist client\node_modules (
    echo Installing dependencies for frontend client...
    cd client && npm install && cd ..
)

if not exist server\node_modules (
    echo Installing dependencies for backend server...
    cd server && npm install && cd ..
)

echo.
echo Starting both Frontend (Vite: http://localhost:5173) and Backend (Express: http://localhost:5000)...
echo.
npm run dev
