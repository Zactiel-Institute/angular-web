@echo off
echo ========================================
echo   Instalando Dependencias
echo ========================================
echo.
cd servicios-app
echo Instalando paquetes de npm...
echo Esto puede tomar varios minutos...
echo.
npm install
echo.
echo ========================================
echo   Instalacion completada!
echo ========================================
echo.
echo Ahora puedes ejecutar: iniciar-app.bat
echo.
pause
