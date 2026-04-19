@echo off
cd /d d:\E_Commerce
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-NetTCPConnection -LocalPort 5000,5001,3306 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { try { Stop-Process -Id $_ -Force -ErrorAction Stop } catch {} }"
pause
