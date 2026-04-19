@echo off
cd /d d:\E_Commerce
if exist venv\Scripts\python.exe (
  venv\Scripts\python.exe app.py
) else (
  python app.py
)
pause
