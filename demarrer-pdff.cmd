@echo off
title pdff
cd /d "%~dp0"
if not exist node_modules (
  echo Installation des dependances...
  call npm.cmd install
)
echo Demarrage de pdff sur http://localhost:3000 ...
start "" http://localhost:3000
call npm.cmd run dev
pause
