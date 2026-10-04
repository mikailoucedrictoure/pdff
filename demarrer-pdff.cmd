@echo off
title pdffusion
cd /d "%~dp0"
if not exist node_modules (
  echo Installation des dependances...
  call npm.cmd install
)
echo Demarrage de pdffusion sur http://localhost:3000 ...
start "" http://localhost:3000
call npm.cmd run dev
pause
