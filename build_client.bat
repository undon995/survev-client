@echo off
SETLOCAL
echo ==========================================
echo   Survev.io Client - Windows Build Script
echo ==========================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install it from: https://nodejs.org/
    pause
    exit /b
)

echo [1/3] Installing build dependencies...
call npm install

echo.
echo [2/3] Building the Uncapped FPS EXE...
call npm run build-win

echo.
if %errorlevel% equ 0 (
    echo [3/3] SUCCESS!
    echo Your client is ready in the "dist" folder:
    dir /b dist\*.exe
) else (
    echo [ERROR] Build failed. Please check the messages above.
)

echo.
echo Press any key to exit...
pause >nul
