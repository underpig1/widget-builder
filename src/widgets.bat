@echo off
for /d %%i in (*) do (cd "%%i" & cmd /c execute.bat)
