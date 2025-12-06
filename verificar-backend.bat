@echo off
echo ========================================
echo   VERIFICACION DEL BACKEND
echo ========================================
echo.
echo Verificando si Apache esta corriendo...
echo.
tasklist /FI "IMAGENAME eq httpd.exe" 2>NUL | find /I /N "httpd.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] Apache esta corriendo
) else (
    echo [ERROR] Apache NO esta corriendo
    echo.
    echo SOLUCION: Abre XAMPP Control Panel y inicia Apache
)
echo.
echo Verificando si MySQL esta corriendo...
echo.
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] MySQL esta corriendo
) else (
    echo [ERROR] MySQL NO esta corriendo
    echo.
    echo SOLUCION: Abre XAMPP Control Panel y inicia MySQL
)
echo.
echo ========================================
echo   Probando conexion al backend...
echo ========================================
echo.
echo Abriendo navegador para probar el backend...
start http://localhost/Frameworks/Angular/backend/api/categorias/read.php
echo.
echo Si ves un JSON con categorias, el backend funciona!
echo Si ves un error, revisa los pasos anteriores.
echo.
pause
