# ✅ Checklist de Instalación y Verificación

## 📋 Pre-requisitos

- [ ] XAMPP instalado
- [ ] Node.js instalado (v18+)
- [ ] Angular CLI instalado (`npm install -g @angular/cli`)
- [ ] Navegador web moderno (Chrome, Firefox, Edge)

---

## 🔧 Paso 1: Configurar XAMPP

- [ ] Abrir XAMPP Control Panel
- [ ] Iniciar Apache (botón Start - debe aparecer en verde)
- [ ] Iniciar MySQL (botón Start - debe aparecer en verde)
- [ ] Verificar que no haya errores en los logs

**Verificación:**
```
✓ Apache corriendo en puerto 80
✓ MySQL corriendo en puerto 3306
```

---

## 🗄️ Paso 2: Crear Base de Datos

- [ ] Abrir navegador
- [ ] Ir a: `http://localhost/phpmyadmin`
- [ ] Hacer clic en pestaña "SQL"
- [ ] Abrir archivo: `backend/database/schema.sql`
- [ ] Copiar TODO el contenido
- [ ] Pegar en el área de texto de phpMyAdmin
- [ ] Hacer clic en "Continuar"
- [ ] Verificar mensaje de éxito

**Verificación:**
- [ ] Base de datos `servicios_db` creada
- [ ] Tabla `usuarios` existe (4 registros)
- [ ] Tabla `servicios` existe (4 registros)
- [ ] Tabla `categorias` existe (10 registros)
- [ ] Tabla `contrataciones` existe
- [ ] Tabla `valoraciones` existe

---

## 📁 Paso 3: Verificar Estructura de Archivos

### Backend
- [ ] `backend/config/database.php` existe
- [ ] `backend/api/auth/login.php` existe
- [ ] `backend/api/auth/register.php` existe
- [ ] `backend/api/servicios/read.php` existe
- [ ] `backend/api/servicios/create.php` existe
- [ ] `backend/api/categorias/read.php` existe
- [ ] `backend/api/contrataciones/create.php` existe

### Frontend
- [ ] `servicios-app/src/app/components/auth/` existe
- [ ] `servicios-app/src/app/components/servicios/` existe
- [ ] `servicios-app/src/app/components/mis-servicios/` existe
- [ ] `servicios-app/src/app/services/auth.service.ts` existe
- [ ] `servicios-app/src/app/services/servicios.service.ts` existe

---

## 🚀 Paso 4: Instalar Dependencias

- [ ] Abrir terminal/CMD
- [ ] Navegar a: `cd c:\xampp\htdocs\Frameworks\Angular\servicios-app`
- [ ] Ejecutar: `npm install`
- [ ] Esperar a que termine (puede tomar varios minutos)
- [ ] Verificar que no haya errores críticos

**Verificación:**
```
✓ node_modules/ creado
✓ package-lock.json actualizado
✓ Sin errores de instalación
```

---

## ▶️ Paso 5: Iniciar Aplicación

### Opción A: Usando archivo batch
- [ ] Hacer doble clic en `iniciar-app.bat`
- [ ] Esperar a que compile
- [ ] El navegador se abrirá automáticamente

### Opción B: Manual
- [ ] Abrir terminal en: `servicios-app/`
- [ ] Ejecutar: `ng serve --open`
- [ ] Esperar mensaje: "Compiled successfully"
- [ ] Abrir navegador en: `http://localhost:4200`

**Verificación:**
```
✓ Servidor corriendo en puerto 4200
✓ Compilación exitosa
✓ Sin errores en consola
```

---

## 🧪 Paso 6: Probar Funcionalidades

### Test 1: Página de Login
- [ ] La página carga correctamente
- [ ] Se ven los campos de email y contraseña
- [ ] El botón "Registrarse" funciona
- [ ] Las animaciones se ven suaves

### Test 2: Registro de Usuario
- [ ] Hacer clic en "Regístrate"
- [ ] Completar formulario:
  - [ ] Nombre: "Usuario Test"
  - [ ] Email: "test@test.com"
  - [ ] Teléfono: "555-9999"
  - [ ] Rol: "Cliente"
  - [ ] Contraseña: "123456"
  - [ ] Confirmar: "123456"
- [ ] Hacer clic en "Registrarse"
- [ ] Verificar mensaje de éxito
- [ ] Volver a login automáticamente

### Test 3: Login
- [ ] Usar credenciales de prueba:
  - Email: `maria@example.com`
  - Password: `123456`
- [ ] Hacer clic en "Iniciar Sesión"
- [ ] Redirige a página de servicios

### Test 4: Ver Servicios (Cliente)
- [ ] Se cargan los servicios
- [ ] Se ven las tarjetas con información
- [ ] Los filtros de categoría funcionan
- [ ] La búsqueda funciona
- [ ] Se puede hacer clic en "Contratar"

### Test 5: Contratar Servicio
- [ ] Hacer clic en "Contratar" en cualquier servicio
- [ ] Se abre el modal
- [ ] Seleccionar fecha futura
- [ ] Escribir mensaje
- [ ] Hacer clic en "Confirmar Contratación"
- [ ] Ver mensaje de éxito

### Test 6: Proveedor - Mis Servicios
- [ ] Cerrar sesión
- [ ] Login como proveedor:
  - Email: `juan@example.com`
  - Password: `123456`
- [ ] Hacer clic en "Mis Servicios"
- [ ] Ver servicios del proveedor
- [ ] Hacer clic en "Nuevo Servicio"

### Test 7: Crear Servicio
- [ ] Completar formulario:
  - [ ] Título: "Servicio de Prueba"
  - [ ] Categoría: Seleccionar una
  - [ ] Descripción: Texto descriptivo
  - [ ] Precio: 100
  - [ ] Tipo: "Por servicio"
  - [ ] Ubicación: "Ciudad Test"
- [ ] Hacer clic en "Crear Servicio"
- [ ] Ver mensaje de éxito
- [ ] El servicio aparece en la lista

---

## 🔍 Paso 7: Verificar API Backend

### Test API Manual
Abrir en navegador o Postman:

- [ ] `http://localhost/Frameworks/Angular/backend/api/categorias/read.php`
  - Debe retornar JSON con categorías
  
- [ ] `http://localhost/Frameworks/Angular/backend/api/servicios/read.php`
  - Debe retornar JSON con servicios

**Verificación:**
```
✓ Respuestas en formato JSON
✓ Sin errores de PHP
✓ CORS headers presentes
```

---

## 🎨 Paso 8: Verificar Diseño

- [ ] Los colores son gradientes púrpura/violeta
- [ ] Los iconos de Material Icons se ven correctamente
- [ ] Las animaciones funcionan suavemente
- [ ] El diseño es responsive (probar en móvil)
- [ ] Las sombras y efectos hover funcionan
- [ ] Los modales se centran correctamente

---

## 📱 Paso 9: Prueba Responsive

- [ ] Abrir DevTools (F12)
- [ ] Activar modo responsive
- [ ] Probar en diferentes tamaños:
  - [ ] 320px (móvil pequeño)
  - [ ] 768px (tablet)
  - [ ] 1024px (laptop)
  - [ ] 1920px (desktop)
- [ ] Verificar que todo se adapta correctamente

---

## 🐛 Paso 10: Verificar Consola

### Consola del Navegador (F12)
- [ ] Sin errores en rojo
- [ ] Sin warnings críticos
- [ ] Las peticiones HTTP son exitosas (200)

### Terminal de Angular
- [ ] Sin errores de compilación
- [ ] Sin warnings de TypeScript
- [ ] Compilación rápida en cambios

---

## ✅ Checklist Final

### Funcionalidades Básicas
- [ ] ✅ Registro de usuarios funciona
- [ ] ✅ Login funciona
- [ ] ✅ Logout funciona
- [ ] ✅ Ver servicios funciona
- [ ] ✅ Filtrar servicios funciona
- [ ] ✅ Buscar servicios funciona
- [ ] ✅ Contratar servicio funciona
- [ ] ✅ Crear servicio funciona
- [ ] ✅ Ver mis servicios funciona

### Diseño y UX
- [ ] ✅ Diseño atractivo
- [ ] ✅ Animaciones suaves
- [ ] ✅ Responsive
- [ ] ✅ Iconos visibles
- [ ] ✅ Colores correctos
- [ ] ✅ Tipografía legible

### Técnico
- [ ] ✅ Base de datos conectada
- [ ] ✅ API funcionando
- [ ] ✅ Sin errores en consola
- [ ] ✅ CORS configurado
- [ ] ✅ Rutas funcionando

---

## 🎉 ¡Instalación Completa!

Si todos los checks están marcados, la aplicación está funcionando correctamente.

### Próximos Pasos:
1. Explorar todas las funcionalidades
2. Crear más servicios de prueba
3. Probar diferentes escenarios
4. Personalizar según necesidades

---

## 📞 Soporte

Si algo no funciona:

1. **Revisar INSTRUCCIONES.txt** - Guía paso a paso
2. **Consultar README.md** - Documentación completa
3. **Ver RESUMEN-PROYECTO.md** - Arquitectura del sistema
4. **Verificar logs**:
   - XAMPP: Ver logs de Apache y MySQL
   - Angular: Ver terminal donde corre `ng serve`
   - Navegador: Ver consola (F12)

---

## 🔧 Comandos Útiles

```bash
# Reiniciar servidor Angular
Ctrl + C (en terminal)
ng serve

# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules
npm install

# Ver versión de Angular
ng version

# Compilar para producción
ng build --configuration production
```

---

**¡Todo listo para usar la aplicación!** 🚀
