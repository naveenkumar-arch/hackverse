@echo off
echo ===================================================
echo 🚀 Kernel Overriders - Push to GitHub (naveenkumar-arch)
echo ===================================================
echo.

git init
git add .
git commit -m "Initial commit: Production Kernel Overriders Platform"
git branch -M main

git remote remove origin 2>nul
git remote add origin https://github.com/naveenkumar-arch/hackverse.git

echo.
echo Pushing code to https://github.com/naveenkumar-arch/hackverse.git ...
git push -u origin main --force

echo.
echo ===================================================
echo 🎉 Code successfully pushed to your GitHub!
echo ===================================================
pause
