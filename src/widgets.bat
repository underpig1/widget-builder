@echo off
for /d %%i in ("widgets\*") do (cd "%%i" & cmd /c execute.bat)
