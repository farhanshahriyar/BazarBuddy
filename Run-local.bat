@echo off
setlocal

:: Step 1: Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed!
    echo Redirecting to the installation page...
    start https://bazarbuddy.netlify.app/
    exit /b
)

:: Step 2: Detect the current script directory
set "CURRENT_DIR=%~dp0"
cd /d "%CURRENT_DIR%"

echo ===============================
echo   Starting Bazar Buddy Version 0.9 Software...
echo ===============================

:: Step 3: Start the dev server in a new terminal
start cmd /k "npm run dev"

:: Step 4: Wait a few seconds for the dev server to boot
timeout /t 5 >nul

:: Step 5: Open default browser at localhost
start http://localhost:8080

echo Project should now be running at http://localhost:8080
pause
