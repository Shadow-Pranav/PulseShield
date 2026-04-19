$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$venvPython = Join-Path $root "venv\Scripts\python.exe"
$python = if (Test-Path $venvPython) { $venvPython } else { "python" }

Write-Host "Starting Flask ML service on 127.0.0.1:5001..."
Start-Process -FilePath $python -ArgumentList "app.py" -WorkingDirectory $root | Out-Null
