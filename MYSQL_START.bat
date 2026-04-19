@echo off
cd /d d:\E_Commerce
if not exist mysql-local\dev-data (
  echo Initializing project-local MySQL data directory...
  d:\E_Commerce\mysql-local\mysql-8.4.8-winx64\bin\mysqld.exe --defaults-file=d:\E_Commerce\mysql-local\dev-my.ini --initialize-insecure --console
)
start "MySQL Local" /min d:\E_Commerce\mysql-local\mysql-8.4.8-winx64\bin\mysqld.exe --defaults-file=d:\E_Commerce\mysql-local\dev-my.ini --console
echo MySQL local server starting on 127.0.0.1:3307
pause
