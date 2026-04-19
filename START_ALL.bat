@echo off
cd /d d:\E_Commerce
start "PulseShield MySQL" cmd /k call d:\E_Commerce\MYSQL_START.bat
start "PulseShield ML" cmd /k call d:\E_Commerce\ML_START.bat
start "PulseShield Backend" cmd /k "cd /d d:\E_Commerce\backend && npm start"
