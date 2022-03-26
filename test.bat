REM initialize tests
npm install -g
npm start

REM test CLI
widgets init example-widgets\clock
cd example-widgets\clock
widgets init
widgets build
widgets publish
cd ../dist
widgets install
widgets list
widgets uninstall clock

REM test meta
cmd /c "%appdata%\Microsoft\Windows\Start Menu\Programs\Startup\widgets.vbs"
cmd /c "%appdata%\Microsoft\Windows\Start Menu\Programs\Startup\widgets\widgets.bat"
