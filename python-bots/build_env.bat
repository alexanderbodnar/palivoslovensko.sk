@echo off

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% NEQ 0 (
    echo Python is not installed. Please install Python first.
    exit /b 1
)

REM Create the virtual environment in the .env directory
python -m venv .env

REM Activate the virtual environment
if exist ".env\Scripts\activate.bat" (
    call .env\Scripts\activate.bat
) else (
    echo Failed to create the virtual environment.
    exit /b 1
)

REM Go back to the directory where the batch script is located
cd /d "%~dp0"

REM Navigate to the directory containing requirements.txt
cd /d "src"

REM Install the requirements
if exist "requirements.txt" (
    pip install -r requirements.txt
) else (
    echo requirements.txt not found.
    exit /b 1
)

echo Virtual environment is set up and dependencies are installed. You can close the window now...

REM Keep the command prompt open
cmd