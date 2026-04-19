$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $root "backend"

Write-Host "Starting backend on http://127.0.0.1:5000..."
Start-Process -FilePath "npm.cmd" -ArgumentList "start" -WorkingDirectory $backendDir | Out-Null
