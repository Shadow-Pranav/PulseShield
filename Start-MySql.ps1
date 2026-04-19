$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$mysqlBin = Join-Path $root "mysql-local\mysql-8.4.8-winx64\bin"
$configPath = Join-Path $root "mysql-local\dev-my.ini"
$dataDir = Join-Path $root "mysql-local\dev-data"
$mysqld = Join-Path $mysqlBin "mysqld.exe"

if (-not (Test-Path $dataDir)) {
    Write-Host "Initializing project-local MySQL data directory..."
    & $mysqld "--defaults-file=$configPath" --initialize-insecure --console
}

Write-Host "Starting project-local MySQL on 127.0.0.1:3307..."
Start-Process -FilePath $mysqld -ArgumentList @("--defaults-file=$configPath") -WindowStyle Minimized | Out-Null
Start-Sleep -Seconds 3
Write-Host "MySQL startup command issued."
