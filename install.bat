@echo off
mkdir "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\widgets"
attrib +h "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\widgets" /s /d
xcopy src\widgets.bat "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\widgets"
xcopy src\widgets.vbs "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\"
npm install -g
