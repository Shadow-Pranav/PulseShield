$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

& (Join-Path $root "Start-MySql.ps1")
& (Join-Path $root "Init-Database.ps1")
& (Join-Path $root "Start-ML.ps1")
& (Join-Path $root "Start-Backend.ps1")

Write-Host "Stack startup commands finished."
Write-Host "Frontend and backend: http://127.0.0.1:5000"
Write-Host "ML API: http://127.0.0.1:5001/predict"
