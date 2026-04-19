$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$mysql = Join-Path $root "mysql-local\mysql-8.4.8-winx64\bin\mysql.exe"
$sqlFile = Join-Path $root "database\init.sql"

Write-Host "Applying database schema to 127.0.0.1:3307..."
Get-Content -Raw $sqlFile | & $mysql --protocol=tcp -h 127.0.0.1 -P 3307 -u root
Write-Host "Database schema applied."
