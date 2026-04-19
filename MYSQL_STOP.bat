@echo off
cd /d d:\E_Commerce
d:\E_Commerce\mysql-local\mysql-8.4.8-winx64\bin\mysqladmin.exe --protocol=tcp -h 127.0.0.1 -P 3306 -u root shutdown
pause
