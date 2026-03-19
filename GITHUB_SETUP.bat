@echo off
REM Saint of the Day - GitHub Setup Script
REM This script pushes your website to GitHub and enables GitHub Pages

echo.
echo ================================
echo  Saint of the Day - GitHub Setup
echo ================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed.
    echo Please download and install Git from: https://git-scm.com/download/win
    echo Then run this script again.
    pause
    exit /b 1
)

REM Configure git with user info
git config --global user.name "KJSHIJI"
git config --global user.email "your-email@example.com"

REM Initialize git repository
echo [1/5] Initializing git repository...
cd /d "c:\Users\LE311XA\Documents\saintofthedaywebsite"
git init

REM Add all files
echo [2/5] Adding files to git...
git add .

REM Create initial commit
echo [3/5] Creating initial commit...
git commit -m "Initial commit - Saint of the Day website"

REM Add remote origin
echo [4/5] Adding GitHub remote...
git remote add origin https://github.com/KJSHIJI/saintofthedaywebsite.git

REM Push to GitHub
echo [5/5] Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ================================
echo     SUCCESS! ✅
echo ================================
echo.
echo Your website is being uploaded to GitHub...
echo 
echo Next steps:
echo 1. Go to: https://github.com/KJSHIJI/saintofthedaywebsite
echo 2. Click Settings (top right)
echo 3. Click "Pages" (left sidebar)
echo 4. Under "Branch" select "main"
echo 5. Click "Save"
echo.
echo Your website will be live at:
echo https://kjshiji.github.io/saintofthedaywebsite
echo.
echo It may take 1-2 minutes to become available.
echo.
pause
