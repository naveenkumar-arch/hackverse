@echo off
echo ===================================================
echo     DEPLOYING KERNEL OVERRIDERS TO GITHUB ^& VERCEL
echo ===================================================
cd /d "%~dp0"
git add .
git commit -m "Deploy Kernel Overriders Platform"
git push origin main
echo ===================================================
echo   Pushed to GitHub! Deploying via Vercel CLI...
echo ===================================================
npx -y vercel --prod --yes --name kernel-overriders
pause
