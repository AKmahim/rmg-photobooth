@echo off
cd /d "%~dp0"

:: Run Flask app
cd bg-remover
start cmd /k "python app.py"

:: Run React app with Vite
cd ..\photobooth
start cmd /k "npm run dev"

:: Open React app in the browser
timeout /t 5 >nul
start http://localhost:5173

:: Optional - Close the command prompt windows after a delay
:: timeout /t 5 >nul
:: taskkill /f /im cmd.exe
