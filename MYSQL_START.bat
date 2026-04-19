@echo off
cd /d d:\E_Commerce
if not exist mysql-local\data (
  mkdir mysql-local\data
)
start "MySQL Local" /min d:\E_Commerce\mysql-local\mysql-8.4.8-winx64\bin\mysqld.exe --defaults-file=d:\E_Commerce\mysql-local\my.ini --console
echo MySQL local server starting on 127.0.0.1:3306
pause
