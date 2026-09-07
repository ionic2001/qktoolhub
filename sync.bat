@echo off
cd /d "%~dp0"
git add -A
if errorlevel 1 goto failed
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Update QK Tool Hub"
  if errorlevel 1 goto failed
)
git push -u origin main
if errorlevel 1 goto failed
echo GitHub upload completed successfully.
pause
exit /b 0
:failed
echo GitHub upload failed. Please check the error above.
pause
exit /b 1
