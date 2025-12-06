# 🚀 Guía Rápida - Sistema de Servicios

## 📍 Ubicación de Archivos Importantes

### **Frontend (Angular)**
```
servicios-app/src/app/
├── components/
│   ├── auth/
│   │   ├── auth.component.ts          ← Login/Registro
│   │   ├── auth.component.html        ← Template login
│   │   └── auth.component.scss        ← Estilos login
│   │
│   ├── servicios/
│   │   ├── servicios.component.ts     ← Lista de servicios
│   │   ├── servicios.component.html   ← Template servicios
│   │   └── servicios.component.scss   ← Estilos servicios
│   │
│   └── mis-servicios/
│       ├── mis-servicios.component.ts  ← Panel proveedor
│       ├── mis-servicios.component.html
│       └── mis-servicios.component.scss
│
└── services/
    ├── auth.service.ts                 ← Autenticación
    └── servicios.service.ts            ← CRUD servicios
```

### **Backend (PHP)**
```
backend/
├── api/
│   ├── auth/
│   │   ├── login.php                   ← Endpoint login
│   │   └── register.php                ← Endpoint registro
│   │
│   ├── servicios/
│   │   ├── read.php                    ← Listar servicios
│   │   └── create.php                  ← Crear servicio
│   │
│   ├── categorias/
│   │   └── read.php                    ← Listar categorías
│   │
│   └── contrataciones/
│       └── create.php                  ← Contratar servicio
│
└── config/
    └── database.php                    ← Conexión BD
```

---

## 🔍 Dónde Modificar Cada Cosa

### **Cambiar Colores**
📁 **Archivo:** `servicios-app/src/app/components/servicios/servicios.component.scss`
📍 **Líneas:** 8-10 (header), 150-155 (botones)

```scss
// Cambiar gradiente principal
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

---

### **Cambiar Imágenes por Defecto**
📁 **Archivo:** `servicios-app/src/app/components/servicios/servicios.component.ts`
📍 **Método:** `getDefaultImage()` (línea ~230)

```typescript
'Limpieza': 'TU_URL_AQUI',
```

---

### **Agregar Nueva Categoría**
📁 **Archivo:** phpMyAdmin o SQL
📍 **Tabla:** `categorias`

```sql
INSERT INTO categorias (nombre, descripcion, icono) 
VALUES ('Tu Categoría', 'Descripción', 'icono_material');
```

---

### **Modificar Validaciones de Login**
📁 **Archivo:** `servicios-app/src/app/components/auth/auth.component.ts`
📍 **Método:** `onLogin()` (línea ~60)

```typescript
if (!this.loginData.email || !this.loginData.password) {
  // Agregar más validaciones aquí
}
```

---

### **Cambiar Textos de la Interfaz**
📁 **Archivos:** `*.component.html`
📍 **Buscar:** El texto que quieres cambiar

Ejemplo:
```html
<h1>Servicios Disponibles</h1>  ← Cambiar aquí
```

---

### **Modificar Conexión a Base de Datos**
📁 **Archivo:** `backend/config/database.php`
📍 **Líneas:** 10-13

```php
private $host = "localhost";      // Cambiar si es necesario
private $db_name = "servicios_db"; // Nombre de tu BD
private $username = "root";        // Tu usuario MySQL
private $password = "";            // Tu contraseña MySQL
```

---

## 🎨 Personalización Rápida

### **Cambiar Logo/Título**
📁 `servicios.component.html` (línea 6)
```html
<h1>
  <i class="material-icons">home_repair_service</i>
  TU TÍTULO AQUÍ
</h1>
```

### **Cambiar Icono de Categoría**
📁 Base de datos → tabla `categorias` → campo `icono`
🔗 Buscar iconos en: https://fonts.google.com/icons

### **Agregar Campo al Formulario**
1. **HTML:** Agregar input en el template
2. **TypeScript:** Agregar propiedad al objeto de datos
3. **PHP:** Agregar campo en el INSERT
4. **BD:** Agregar columna a la tabla

---

## 🐛 Solución de Problemas Rápida

### **Servicios no se muestran**
✅ **Solución:**
1. Abrir consola (F12)
2. Verificar que diga "Servicios recibidos: Array(4)"
3. Si no aparecen, agregar en `servicios.component.ts`:
```typescript
this.cdr.detectChanges();  // Después de cargar servicios
```

### **Error CORS**
✅ **Solución:**
Verificar que TODOS los archivos PHP tengan al inicio:
```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
```

### **Error 401 en Login**
✅ **Solución:**
1. Verificar que la contraseña en BD esté hasheada
2. Ejecutar: `backend/fix-passwords.php`

### **Imágenes no cargan**
✅ **Solución:**
Verificar URL en:
- Base de datos (campo `imagen`)
- Función `getDefaultImage()` en `servicios.component.ts`

---

## 📝 Comandos Útiles

### **Iniciar Aplicación**
```bash
# Opción 1: Archivo batch
iniciar-sin-ssr.bat

# Opción 2: Manual
cd servicios-app
ng serve
```

### **Reiniciar con Cambios**
```bash
# Detener: Ctrl+C
# Iniciar de nuevo:
ng serve
```

### **Ver Logs en Tiempo Real**
- **Frontend:** Terminal donde corre `ng serve`
- **Backend:** Consola del navegador (F12)

---

## 🔑 Datos de Acceso Rápido

### **Base de Datos**
- **URL:** http://localhost/phpmyadmin
- **Usuario:** root
- **Contraseña:** (vacío)
- **Base de datos:** servicios_db

### **Usuarios de Prueba**
| Email | Password | Rol |
|-------|----------|-----|
| juan@example.com | 123456 | Proveedor |
| carlos@example.com | 123456 | Proveedor |
| maria@example.com | 123456 | Cliente |
| ana@example.com | 123456 | Cliente |

### **URLs Importantes**
- **Aplicación:** http://localhost:4200
- **phpMyAdmin:** http://localhost/phpmyadmin
- **API Backend:** http://localhost/Frameworks/Angular/backend/api

---

## 📊 Estructura de Datos Rápida

### **Usuario**
```typescript
{
  id: number
  nombre: string
  email: string
  rol: 'cliente' | 'proveedor'
  telefono: string
}
```

### **Servicio**
```typescript
{
  id: number
  titulo: string
  descripcion: string
  precio: number
  tipo_precio: 'hora' | 'servicio' | 'dia'
  ubicacion: string
  imagen: string
  proveedor: {...}
  categoria: {...}
}
```

---

## 🎯 Flujos Principales

### **Login**
```
Usuario → AuthComponent → AuthService → PHP → BD → Respuesta → localStorage → Redirect
```

### **Ver Servicios**
```
ServiciosComponent → ServiciosService → PHP → BD → JSON → Angular → Render
```

### **Crear Servicio**
```
Modal → Formulario → Validación → ServiciosService → PHP → BD → Confirmación
```

### **Contratar**
```
Click → Modal → Formulario → POST → PHP → BD → Alert → Cerrar Modal
```

---

## 💡 Tips Rápidos

1. **Siempre verifica la consola (F12)** para ver errores
2. **Usa `console.log()`** para debuggear
3. **Recarga con Ctrl+Shift+R** para limpiar caché
4. **Verifica que XAMPP esté corriendo** antes de probar
5. **Los cambios en PHP son inmediatos**, no necesitas reiniciar
6. **Los cambios en Angular requieren recompilación** (automática con `ng serve`)

---

## 📚 Documentación Completa

Para más detalles, consulta:
- **DOCUMENTACION-CODIGO.md** - Documentación técnica completa
- **README.md** - Guía de instalación y uso
- **INSTRUCCIONES.txt** - Pasos de instalación
- **GUIA-IMAGENES.md** - Cómo modificar imágenes

---

**¡Guía rápida lista!** ⚡

Para cualquier duda, busca en los archivos de documentación o revisa los comentarios en el código.
