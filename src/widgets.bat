@echo off
for /d %%i in ("widgets\*") do ("wscript %%i\execute.vbs")
