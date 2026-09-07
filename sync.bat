@echo off
echo ===================================================
echo  QK Tool Hub (qktoolhub.com) GitHub Auto Sync
echo ===================================================
cd /d %~dp0

REM Set default Git user identity for commits
git config user.email "ionic2001@users.noreply.github.com"
git config user.name "ionic2001"

if not exist .git (
    echo [.git folder missing - Auto Initializing Git...]
    git init
    git branch -M main
    git remote add origin https://github.com/ionic2001/qktoolhub.git
)

git add .
set "msg=Update QK Tool Hub"
set /p "user_input=Enter commit message (Press Enter for default): "
if not "%user_input%"=="" set "msg=%user_input%"

git commit -m "%msg%"
git push -u origin main

echo ===================================================
echo  GitHub Upload Completed Successfully!
echo ===================================================
pause
