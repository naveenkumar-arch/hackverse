@echo off
echo ===================================================
echo   PUSHING KERNEL OVERRIDERS REBRANDED CODE TO GITHUB
echo ===================================================
cd /d "%~dp0"
git add .
git commit -m "Rebrand project to Kernel Overriders, remove student auth, and support up to 6 team members registration"
git push origin main
echo ===================================================
echo   SUCCESSFULLY PUSHED! Vercel is auto-building now...
echo ===================================================
pause
