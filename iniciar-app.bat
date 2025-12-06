@echo off
echo ========================================
echo   Sistema de Contratacion de Servicios
echo ========================================
echo.
echo Iniciando servidor de desarrollo...
echo.
cd servicios-app
start cmd /k "ng serve --open"
echo.
echo La aplicacion se abrira automaticamente en tu navegador
echo URL: http://localhost:4200
echo.
echo Presiona Ctrl+C en la ventana del servidor para detenerlo
echo.
pause
